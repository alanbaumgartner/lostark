import * as React from 'react';
import {Stack} from '@mui/material';
import Account from "./components/Account";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

export default function App() {
    return (
        <div>
            <ResponsiveAppBar/>
            <Stack direction="row">
                <Account/>
            </Stack>
        </div>
    );
}
