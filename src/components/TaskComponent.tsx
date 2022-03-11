import * as React from 'react';
import {Badge, Checkbox, FormControlLabel} from '@mui/material';
import {
    updateAccountDaily,
    updateAccountWeekly,
    updateCharacterDaily,
    updateCharacterWeekly
} from "../app/accountSlice";
import {useDispatch} from "react-redux";
import {Character} from "../data/CharacterModel";
import {Task} from "../data/TaskModel";

export default function TaskComponent(task: Task, daily: boolean, character?: Character) {

    const dispatch = useDispatch()

    if (task.currentCount !== undefined) {
        return (
                <FormControlLabel label={task.name} labelPlacement="start" key={task.name} control={
                    <Badge badgeContent={task.currentCount} color="error">
                    <Checkbox onChange={(event) => {
                    if (daily) {
                        if (character !== undefined) {
                            dispatch(updateCharacterDaily([character.name, {name: task.name, completed: event.target.checked}]))
                        } else {
                            dispatch(updateAccountDaily({name: task.name, completed: event.target.checked}))
                        }
                    } else {
                        if (character !== undefined) {
                            dispatch(updateCharacterWeekly([character.name, {
                                name: task.name,
                                completed: event.target.checked
                            }]))
                        } else {
                            dispatch(updateAccountWeekly({name: task.name, completed: event.target.checked}))
                        }
                    }
                }
                } checked={task.completed}/>
            </Badge>
                        }/>
        );
    } else {

        return (
                <FormControlLabel label={task.name} labelPlacement="start" key={task.name} control={<Checkbox onChange={(event) => {
                    if (daily) {
                        if (character !== undefined) {
                            dispatch(updateCharacterDaily([character.name, {name: task.name, completed: event.target.checked}]))
                        } else {
                            dispatch(updateAccountDaily({name: task.name, completed: event.target.checked}))
                        }
                    } else {
                        if (character !== undefined) {
                            dispatch(updateCharacterWeekly([character.name, {
                                name: task.name,
                                completed: event.target.checked
                            }]))
                        } else {
                            dispatch(updateAccountWeekly({name: task.name, completed: event.target.checked}))
                        }
                    }
                }
                } checked={task.completed}/>}/>
        );
    }


}
