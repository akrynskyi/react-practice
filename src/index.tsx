import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { store } from './store';
import { muiTheme } from './constants/mui-theme';

ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={muiTheme}>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </Provider>,
  document.getElementById('root')
);
