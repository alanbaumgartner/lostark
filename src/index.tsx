import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import {Provider} from 'react-redux'
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./app/store";
import {createTheme, ThemeProvider} from "@mui/material";
import {BrowserRouter} from "react-router-dom";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#c9497b',
        },
        secondary: {
            main: '#49c996',
        },
    },
});

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ThemeProvider>
        </PersistGate>
    </Provider>,
    document.querySelector('#root'),
);
