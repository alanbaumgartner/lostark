import * as React from 'react';
import {Typography} from '@mui/material';
import {Character} from "../data/CharacterModel";
import {Task} from "../data/TaskModel";
import TaskComponent from "./TaskComponent";
import Box from "@mui/material/Box";

export default function CharacterComponent(character: Character) {

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
                p: 1,
                m: 1,
                // bgcolor: 'white',
                borderRadius: 1,
            }}
        >
            <Typography>{character.name}</Typography>
            {character.weeklies.map((task: Task, _: any) => (
                TaskComponent(task, character.name)
            ))}
            {character.dailies.map((task: Task, _: any) => (
                TaskComponent(task, character.name)
            ))}
        </Box>
    );
}
