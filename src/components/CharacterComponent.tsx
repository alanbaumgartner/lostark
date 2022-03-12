import * as React from 'react';
import {Card, CardContent, CardMedia, Typography} from '@mui/material';
import {Character, LoaClass, loaClassMap} from "../data/CharacterModel";
import {Task} from "../data/TaskModel";
import TaskComponent from "./TaskComponent";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useDispatch} from "react-redux";
import {removeCharacter} from "../app/accountSlice";

function CharacterHeaderComponent(character: Character) {

    const dispatch = useDispatch()

    return (
        <Card sx={{display: 'flex', width: '100%'}}>
            <CardMedia
                component="img"
                sx={{height: '100%', width: '100%'}}
                image={loaClassMap.get(character.loaClass)}
                alt={character.loaClass}
            />
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{flex: '1 0 auto'}}>
                    <Typography component="div" variant="h5">
                        {character.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {character.loaClass}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {character.itemLevel}
                    </Typography>
                    <IconButton onClick={() => dispatch(removeCharacter(character))}>
                        <DeleteForeverIcon/>
                    </IconButton>
                </CardContent>
            </Box>
        </Card>
    );
}

export default function CharacterComponent(character: Character) {

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
                p: 1,
                m: 1,
                bgcolor: 'gray',
                borderRadius: 1,
            }}
        >
            {CharacterHeaderComponent(character)}
            {character.weeklies.map((task: Task, _: any) => (
                TaskComponent(task, character.name)
            ))}
            {character.dailies.map((task: Task, _: any) => (
                TaskComponent(task, character.name)
            ))}
        </Box>
    );
}
