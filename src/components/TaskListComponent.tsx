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
        return task.currentCount
    }).reduce((partialSum, a) => partialSum + a, 0);

    const total = tasks.map(task => {
        return task.requiredCount
    }).reduce((partialSum, a) => partialSum + a, 0);


    const progress = (current / total) * 100
    const color = () => {
        if (progress >= 85) {
            return "green"
        } else if (progress >= 50) {
            return "yellow"
        } else {
            return "red"
        }
    }

    if (name !== undefined) {
        return (
            <React.Fragment>
                <ListItem button onClick={() => setOpen(!open)}>
                    <ListItemText primary={name}/>
                    <Typography variant="body2" color={color()}>{`${Math.round(
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