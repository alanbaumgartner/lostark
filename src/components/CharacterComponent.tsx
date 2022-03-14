import * as React from 'react';
import {useState} from 'react';
import {
    Avatar,
    Card,
    CardActions,
    CardHeader,
    ListItemIcon,
    Menu,
    MenuItem,
    Stack,
    Tooltip,
    Typography
} from '@mui/material';
import {Character, loaClassMap} from "../data/CharacterModel";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useDispatch} from "react-redux";
import {removeCharacter} from "../app/accountSlice";
import Divider from "@mui/material/Divider";
import {AccountBox, Settings} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";
import TaskListComponent from "./TaskListComponent";
import UpdateCharacterDialog from "./UpdateCharacterDialog";

// function AbyssWeeklies() {
//
//     const [open, setOpen] = React.useState(true);
//
//     const handleClick = () => {
//         setOpen(!open);
//     };
//
//     return (
//         <Collapse in={open} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//                 <ListItemButton sx={{ pl: 4 }}>
//                     <ListItemIcon>
//                         <StarBorder />
//                     </ListItemIcon>
//                     <ListItemText primary="Starred" />
//                 </ListItemButton>
//             </List>
//         </Collapse>
//     );
// }

function CharacterMenu(character: Character) {

    const dispatch = useDispatch()

    const [updateDialogOpen, setUpdateDialogOpen] = useState(false)

    const handleDialogClose = () => {
        setUpdateDialogOpen(false)
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <UpdateCharacterDialog character={character} open={updateDialogOpen} onClose={handleDialogClose}/>
            <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                <Tooltip title="Character Settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ml: 2}}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Settings fontSize="small"/>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="character-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <MenuItem onClick={() => setUpdateDialogOpen(true)}>
                    <ListItemIcon>
                        <AccountBox/>
                    </ListItemIcon>
                    Edit
                </MenuItem>
                <MenuItem onClick={() => dispatch(removeCharacter(character))}>
                    <ListItemIcon>
                        <DeleteForeverIcon/>
                    </ListItemIcon>
                    Delete
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}

export default function CharacterComponent(character: Character) {

    const theme = useTheme()

    return (
        <Box sx={{height: '100%', width: '25%', px: 2}}>
            <Card>
                <CardHeader
                    sx={{
                        background: theme.palette.primary.main
                    }}
                    avatar={
                        <Avatar sx={{width: 64, height: 64}} src={loaClassMap.get(character.loaClass)}
                                aria-label="class"/>
                    }
                    action={
                        CharacterMenu(character)
                    }
                    title={
                        <Typography variant={"h5"}>
                            {character.name}
                        </Typography>
                    }
                    subheader={
                        <Typography variant={"body1"}>
                            Item Level: {character.itemLevel}
                        </Typography>
                    }
                />
                <Divider/>
                <CardActions>
                    <Stack sx={{width: "100%"}}>
                        <Typography>Dailies</Typography>
                        {TaskListComponent(character.dailies, character.name)}
                        <Divider/>
                        <Typography>Weeklies</Typography>
                        {TaskListComponent(character.weeklies, character.name)}
                    </Stack>
                </CardActions>
            </Card>
        </Box>
    );
}
