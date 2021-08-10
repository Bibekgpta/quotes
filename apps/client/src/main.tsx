import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { configureAppStore } from './store';
import { App } from './pages';

const store = configureAppStore();
const theme = createMuiTheme({});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
      <CssBaseline />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
