import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const AUTH_TOKEN_KEY = 'authToken';
const AUTH_TOKEN_VALUE = 'aGFtYW5vdmljaDpURVNUX1BBU1NXT1JE';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3, 0, 3),
  },
}));

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const classes = useStyles();
  const [file, setFile] = useState<any>();

  useEffect(() => {
    localStorage.setItem(AUTH_TOKEN_KEY, AUTH_TOKEN_VALUE);
  }, []);

  const onFileChange = (e: any) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    setFile(files.item(0));
  };

  const removeFile = () => {
    setFile('');
  };

  const uploadFile = async () => {
    const response = await axios({
      method: 'GET',
      url,
      params: {
        name: encodeURIComponent(file.name),
      },
      headers: {
        Authorization: `Basic ${localStorage.getItem(AUTH_TOKEN_KEY) || AUTH_TOKEN_KEY}`,
      },
    });
    await fetch(response.data, {
      method: 'PUT',
      body: file,
    });
    setFile('');
  };

  return (
    <div className={classes.content}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </div>
  );
}
