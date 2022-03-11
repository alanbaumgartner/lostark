import * as React from 'react';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {AccountCircle} from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {addCharacter} from "../app/accountSlice";
import {Server} from "../data/CharacterModel";

function appBarLabel(label: string) {

    const [name, setName] = useState("")
    const [server, setServer] = useState(Server.na_east)
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch()

    const handleCreate = () => {
        setOpen(false)
        dispatch(addCharacter([name, server]))
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                <MenuIcon/>
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
                {label}
            </Typography>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClickOpen}
                color="inherit"
            >
                <AccountCircle/>
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create a Character</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={event => setName(event.target.value)}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Character Name"
                        type="name"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogActions>
            </Dialog>
        </Toolbar>
    );
}

export default function ResponsiveAppBar() {
    return (
        <Stack spacing={2} sx={{flexGrow: 1}}>
            <AppBar position="static" color="primary">
                {appBarLabel('default')}
            </AppBar>
        </Stack>
    );
}