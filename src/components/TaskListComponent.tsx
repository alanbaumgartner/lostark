import {Task} from "../data/TaskModel";
import {Collapse, List, ListItem, ListItemText} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import TaskComponent from "./TaskComponent";
import {Character} from "../data/CharacterModel";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

export default function TaskListComponent(tasks: Task[], name?: string, character?: Character) {
    const [open, setOpen] = useState(false)

    if (name !== undefined) {
        return (
            <React.Fragment>
                <ListItem button onClick={() => setOpen(!open)}>
                    <ListItemText primary={name}/>
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