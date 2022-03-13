import * as React from 'react';
import {
    Avatar,
    Card,
    CardActions,
    CardHeader,
    Grid,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
    Typography
} from '@mui/material';
import {Character, loaClassMap} from "../data/CharacterModel";
import {Task} from "../data/TaskModel";
import TaskComponent from "./TaskComponent";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useDispatch} from "react-redux";
import {removeCharacter} from "../app/accountSlice";
import Divider from "@mui/material/Divider";
import {AccountBox, Settings} from "@mui/icons-material";

function CharacterMenu(character: Character) {

    const dispatch = useDispatch()

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
                <MenuItem>
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
    return (
        <Box sx={{height: '100%', width: '25%', px: 2}}>
            <Card>
                <CardHeader
                    sx={{bgcolor: 'background.blue'}}
                    avatar={
                        <Avatar src={loaClassMap.get(character.loaClass)} aria-label="class"/>
                    }
                    action={
                        CharacterMenu(character)
                    }
                    title={character.name}
                    subheader={character.itemLevel}
                />
                <Divider/>
                <CardActions>
                    <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>

                        <Grid item sm={12}>
                            <Typography>Weeklies</Typography>
                        </Grid>
                        {character.weeklies.map((task: Task, _: any) => (
                            TaskComponent(task, character.name)
                        ))}
                        <Grid item sm={12}>
                            <Divider/>
                        </Grid>
                        <Grid item sm={12}>
                            <Typography>Dailies</Typography>
                        </Grid>
                        {character.dailies.map((task: Task, _: any) => (
                            TaskComponent(task, character.name)
                        ))}
                    </Grid>
                </CardActions>
            </Card>
        </Box>
    );
}
