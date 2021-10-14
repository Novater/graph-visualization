import * as React from 'react';
import './assets/css/App.css';
import GraphVisualization from './views/GraphVisualization';
import { Helmet } from 'react-helmet';
import { MuiThemeProvider, createTheme } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2B6777',
      dark: '#52AB98'
    },
    secondary: {
      light: '#FFFFFF',
      main: '#C8D8E4',
      dark: '#F2F2F2'
    },
    warning: {
      main: '#0D0D0D'
    }
  }
});

function App() {

  return (
    <MuiThemeProvider theme={theme}>
      <GraphVisualization>
      </GraphVisualization>
    </MuiThemeProvider>
  );
}

export default App;
