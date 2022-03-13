import * as React from 'react';
import {Checkbox, Grid, Rating, Typography} from '@mui/material';
import {update} from "../app/accountSlice";
import {useDispatch} from "react-redux";
import {Task} from "../data/TaskModel";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function toggleTask(task: Task) {
    task.completed = !task.completed
}

function createTaskUpdate(amount: number) {
    return (t: Task) => {
        if (t.currentCount !== undefined) {
            if (t.currentCount > amount) {
                t.currentCount = Math.max(amount, 0)
            } else {
                t.currentCount = Math.min(amount, t.requiredCount ?? t.currentCount)
            }
        }
    }
}

export default function TaskComponent(task: Task, characterName?: string) {

    const dispatch = useDispatch()

    return (
        <React.Fragment>
            <Grid item xs={6}>
                <Typography>{task.name}</Typography>
            </Grid>
            <Grid item xs>
                {(task.currentCount !== undefined && task.requiredCount !== undefined) ?
                    <Rating
                        name="customized-color"
                        onChange={(_, value) => {
                            dispatch(update({
                                task: task,
                                character: characterName,
                                update: createTaskUpdate(value ?? 0)
                            }))
                        }}
                        max={task.requiredCount}
                        defaultValue={task.currentCount}
                        getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        icon={<FavoriteIcon fontSize="inherit"/>}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit"/>}
                    />
                    :
                    <Checkbox onChange={(event) => {
                        dispatch(update({task: task, character: characterName, update: toggleTask}))
                    }} checked={task.completed}/>}

            </Grid>
        </React.Fragment>
    );

}
