import * as React from 'react';
import {Checkbox, ListItem, ListItemText, Rating} from '@mui/material';
import {update} from "../app/accountSlice";
import {useDispatch} from "react-redux";
import {isTaskDone, Task} from "../data/TaskModel";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {Character} from "../data/CharacterModel";

function createTaskUpdate(amount: number) {
    return (t: Task) => {
        if (t.currentCount > amount) {
            t.currentCount = Math.max(amount, 0)
        } else {
            t.currentCount = Math.min(amount, t.requiredCount ?? t.currentCount)
        }
    }
}

export default function TaskComponent(task: Task, character?: Character) {

    const dispatch = useDispatch()

    if (task.requiredCount > 1) {
        return (
            <ListItem
                key={task.name}
                disablePadding
                secondaryAction={
                    <Rating
                        name={task.name}
                        onChange={(_, value) => {
                            dispatch(update({
                                task: task,
                                character: character?.name,
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
                }
            >
                <ListItem>
                    <ListItemText id={task.name} primary={task.name.replace("Abyss - ", "")}/>
                </ListItem>
            </ListItem>
        );
    }

    return (
        <ListItem
            key={task.name}
            secondaryAction={
                <Checkbox
                    edge="end"
                    onChange={(_) => {
                        dispatch(update({
                            task: task,
                            character: character?.name,
                            update: createTaskUpdate(1 - task.currentCount)
                        }))
                    }}
                    checked={isTaskDone(task)}
                />
            }
            disablePadding
        >
            <ListItem>
                <ListItemText id={task.name} primary={task.name.replace("Abyss - ", "")}/>
            </ListItem>
        </ListItem>
    );

}
