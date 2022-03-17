import {Task} from "../data/TaskModel";
import {Collapse, List, ListItem, ListItemText, Typography} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import TaskComponent from "./TaskComponent";
import {Character} from "../data/CharacterModel";
import {ExpandLess, ExpandMore} from "@mui/icons-material";


export default function TaskListComponent(tasks: Task[], name?: string, character?: Character) {

    const [open, setOpen] = useState(false)

    const current = tasks.map(task => {
        if (task.currentCount !== undefined) {
            return task.currentCount
        } else {
            return task.completed ? 1 : 0
        }
    }).reduce((partialSum, a) => partialSum + a, 0);

    const total = tasks.map(task => {
        if (task.requiredCount !== undefined) {
            return task.requiredCount
        } else {
            return 1
        }
    }).reduce((partialSum, a) => partialSum + a, 0);


    const progress = (current / total) * 100

    if (name !== undefined) {
        return (
            <React.Fragment>
                <ListItem button onClick={() => setOpen(!open)}>
                    <ListItemText primary={name}/>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        progress,
                    )}%`}</Typography>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse

                    in={open}
                    timeout='auto'
                    unmountOnExit
                >
                    <List dense sx={{width: '100%'}}>
                        {tasks.map((task: Task, _: number) => {
                            return TaskComponent(task, character)
                        })}
                    </List>

                </Collapse>
            </React.Fragment>
        );
    } else {
        return (
            <List dense sx={{width: '100%'}}>
                {tasks.map((task: Task, _: number) => {
                    return TaskComponent(task, character)
                })}
            </List>
        );
    }


}