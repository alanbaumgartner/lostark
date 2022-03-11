import * as React from 'react';
import {Stack, Typography} from '@mui/material';
import {Character} from "../data/CharacterModel";
import {Task} from "../data/TaskModel";
import TaskComponent from "./TaskComponent";

export default function CharacterComponent(character: Character) {

    return (
        <Stack>
            <Typography>{character.name}</Typography>
            <Stack>
                {character.weeklies.map((task: Task, _: any) => (
                    TaskComponent(task, character.name)
                ))}
            </Stack>
            <Stack>
                {character.dailies.map((task: Task, _: any) => (
                    TaskComponent(task, character.name)
                ))}
            </Stack>
        </Stack>
    );
}
