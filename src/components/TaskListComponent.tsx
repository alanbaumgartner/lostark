import {Task} from "../data/TaskModel";
import {List} from "@mui/material";
import * as React from "react";
import TaskComponent from "./TaskComponent";

export default function TaskListComponent(tasks: Task[], characterName?: string) {

    return (
        <List dense sx={{width: '100%'}}>
            {tasks.map((task: Task, _: number) => {
                return TaskComponent(task, characterName)
            })}
        </List>
    );

}