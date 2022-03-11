import * as React from 'react';
import {Button, ButtonGroup, Checkbox, FormControlLabel} from '@mui/material';
import {update} from "../app/accountSlice";
import {useDispatch} from "react-redux";
import {Task} from "../data/TaskModel";

function toggleTask(task: Task) {
    task.completed = !task.completed
}

function incrementTask(task: Task) {
    if (task.currentCount !== undefined) {
        task.currentCount = Math.min(task.currentCount + 1, task.requiredCount ?? task.currentCount)
    }
}

function decrementTask(task: Task) {
    if (task.currentCount !== undefined) {
        task.currentCount = Math.max(task.currentCount - 1, 0)
    }
}

export default function TaskComponent(task: Task, characterName?: string) {

    const dispatch = useDispatch()

    if (task.currentCount !== undefined && task.requiredCount !== undefined) {
        return (
            <FormControlLabel label={task.name} labelPlacement="start" key={task.name} control={
                <ButtonGroup size="small">
                    <Button onClick={() => {
                        dispatch(update({task: task, character: characterName, update: decrementTask}))
                    }}>-</Button>
                    <Button disabled>{task.currentCount}</Button>
                    <Button onClick={() => {
                        dispatch(update({task: task, character: characterName, update: incrementTask}))
                    }}>+</Button>
                </ButtonGroup>
            }/>
        );
    } else {

        return (
            <FormControlLabel label={task.name} labelPlacement="start" key={task.name}
                              control={<Checkbox onChange={(event) => {
                                  dispatch(update({task: task, character: characterName, update: toggleTask}))
                              }} checked={task.completed}/>}/>
        );
    }


}
