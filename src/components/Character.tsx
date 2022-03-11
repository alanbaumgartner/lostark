import * as React from 'react';
import {Checkbox, FormControlLabel, Stack, Typography} from '@mui/material';
import { updateCharacterDaily, updateCharacterWeekly} from "../app/accountSlice";
import {useDispatch} from "react-redux";
import {Character} from "../data/CharacterModel";
import {Task} from "../data/TaskModel";
import TaskComponent from "./TaskComponent";

export default function CharacterComponent(character: Character) {

    const dispatch = useDispatch()

    return (
        <Stack>
            <Typography>{character.name}</Typography>
            <Stack>
                {character.weeklies.map((task: Task, _: any) => (
                    TaskComponent(task, false, character)
                ))}
            </Stack>
            <Stack>
                {character.dailies.map((task: Task, _: any) => (
                    TaskComponent(task, true, character)
                ))}
            </Stack>
        </Stack>
    );
}