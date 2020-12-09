import React from "react";
import ReactDOM from "react-dom";
import store from './redux/store';
import { Provider } from 'react-redux';
import {
  MuiThemeProvider,
  createMuiTheme,
  CssBaseline,
  responsiveFontSizes,
  } from "@material-ui/core";
import { amber } from '@material-ui/core/colors';

import App from "./components/App";

let theme = createMuiTheme({
  palette: {
    primary: amber
  },
  root: {
    padding: 100
  }

});

theme = responsiveFontSizes(theme);  

ReactDOM.render(
    <Provider store={store}>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
    </Provider>
    , document.getElementById("app"));