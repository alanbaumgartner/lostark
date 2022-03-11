import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import App from './App';
import {Provider} from 'react-redux'
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./app/store";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            {/*<ThemeProvider theme={theme}>*/}
                <CssBaseline/>
                <App/>
            {/*</ThemeProvider>*/}
        </PersistGate>
    </Provider>,
    document.querySelector('#root'),
);
