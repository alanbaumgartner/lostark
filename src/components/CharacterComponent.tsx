import * as React from 'react';
import {Avatar, Card, CardActions, CardHeader, Grid, Typography} from '@mui/material';
import {Character, loaClassMap} from "../data/CharacterModel";
import {Task} from "../data/TaskModel";
import TaskComponent from "./TaskComponent";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useDispatch} from "react-redux";
import {removeCharacter} from "../app/accountSlice";
import Divider from "@mui/material/Divider";

export default function CharacterComponent(character: Character) {
    const dispatch = useDispatch()
    return (
        <Box sx={{height: '100%', width: '25%', px: 2}}>
            <Card>
                <CardHeader
                    sx={{ bgcolor: 'background.blue'}}
                    avatar={
                        <Avatar src={loaClassMap.get(character.loaClass)} aria-label="class"/>
                    }
                    action={
                        <IconButton onClick={() => dispatch(removeCharacter(character))}>
                            <DeleteForeverIcon/>
                        </IconButton>
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
