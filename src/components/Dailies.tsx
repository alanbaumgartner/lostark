import * as React from 'react';
import {Stack} from '@mui/material';
import {useSelector} from "react-redux";
import {RootState} from "../app/store";
import {Task} from "../data/TaskModel";
import TaskComponent from "./TaskComponent";

export default function Dailies() {

    const accountDailies: Task[] = useSelector((state: RootState) => state.persistedReducer.accountDailies)

    return (
        <Stack>
            {accountDailies.map((task: Task, _: any) => (
                TaskComponent(task)
            ))}
        </Stack>
    );
}
