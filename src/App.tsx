import * as React from 'react';
import {useState} from 'react';
import {CSSObject, styled, Theme, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Account from "./components/Account";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {createCharacter, enumToMap, loaClasses, Server} from "./data/CharacterModel";
import {useDispatch} from "react-redux";
import {addCharacter} from "./app/accountSlice";
import {FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent} from "@mui/material";
import {Link, Route, Routes} from "react-router-dom";
import MarisShop from "./pages/maris/MarisShop";
import {ShoppingCart} from "@mui/icons-material";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        zIndex: theme.zIndex.drawer + 1,
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function App() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [name, setName] = useState("")
    const [server, setServer] = useState(Server.NA_EAST)
    const [itemLevel, setItemLevel] = useState(0)
    const [loaClass, setLoaClass] = useState("Berserker")
    const [createCharacterOpen, setCreateCharacterOpen] = useState(false);

    const dispatch = useDispatch()

    const handleCreate = () => {
        setCreateCharacterOpen(false)
        dispatch(addCharacter(createCharacter(name, server, loaClass, itemLevel)))
    }

    const handleClickOpen = () => {
        setCreateCharacterOpen(true);
    };

    const handleClose = () => {
        setCreateCharacterOpen(false);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Lost Ark Tools
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    <ListItemButton
                        key="Create Character"
                        onClick={handleClickOpen}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <AddCircleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Create Character" sx={{opacity: open ? 1 : 0}}/>
                    </ListItemButton>
                </List>
                <Divider/>
                <List>
                    <ListItemButton
                        component={Link}
                        to={'/'}
                        key={'home'}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Home'} sx={{opacity: open ? 1 : 0}}/>
                    </ListItemButton>
                    <ListItemButton
                        component={Link}
                        to={'/maris'}
                        key={'maris'}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <ShoppingCart/>
                        </ListItemIcon>
                        <ListItemText primary={'Mari\'s Shop'} sx={{opacity: open ? 1 : 0}}/>
                    </ListItemButton>
                </List>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <DrawerHeader/>

                <Dialog open={createCharacterOpen} onClose={handleClose}>
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
                        <TextField
                            onChange={event => setItemLevel(parseFloat(event.target.value))}
                            autoFocus
                            margin="dense"
                            id="level"
                            label="Item Level"
                            type="name"
                            fullWidth
                            variant="standard"
                        />
                        <FormControl sx={{m: 1, minWidth: 120}}>
                            <InputLabel>Class</InputLabel>
                            <Select
                                value={loaClass}
                                onChange={(event: SelectChangeEvent<any>) => setLoaClass(event.target.value)}
                                input={<OutlinedInput label="Class"/>}
                            >
                                {loaClasses.map(k => (<MenuItem value={k}>{k}</MenuItem>))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{m: 1, minWidth: 120}}>
                            <InputLabel>Server</InputLabel>
                            <Select
                                value={server}
                                onChange={(event: SelectChangeEvent<any>) => setServer(event.target.value)}
                                input={<OutlinedInput label="Server"/>}
                            >
                                {Array.from(enumToMap(Server).entries()).map(m => ({key: m[0], value: m[1]})).map(k => (
                                    <MenuItem value={k.key}>{k.value}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleCreate}>Create</Button>
                    </DialogActions>
                </Dialog>
                <Routes>
                    <Route path="/" element={<Account/>}/>
                    <Route path="/maris" element={<MarisShop/>}/>
                </Routes>
            </Box>
        </Box>
    );
}
