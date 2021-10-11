import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'components/App/App';
import { store } from 'store/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import deepPurple from '@material-ui/core/colors/deepPurple';

const STATUS_ERROR_CODES = [401, 401, 403];

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[700],
    },
    secondary: {
      main: purple[600],
    },
  },
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (STATUS_ERROR_CODES.includes(error?.response?.status)) {
      alert(error.response.data.message || error.response.data.Message);
    }

    return Promise.reject(error?.response ?? error);
  },
);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <Provider store={store}>
        <CssBaseline />
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
