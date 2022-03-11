import * as React from 'react';
import {Checkbox, FormControlLabel, Stack} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import {Task} from "../data/TaskModel";
import TaskComponent from "./TaskComponent";

export default function Dailies() {

    const accountDailies: Task[] = useSelector((state: RootState) => state.persistedReducer.accountDailies)
    const dispatch = useDispatch()

    return (
        <div>
            <Stack>
                {accountDailies.map((task: Task, _: any) => (
                    TaskComponent(task, true)
                ))}
            </Stack>
        </div>
    );
}
