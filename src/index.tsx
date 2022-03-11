import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import {Provider} from 'react-redux'
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./app/store";

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
