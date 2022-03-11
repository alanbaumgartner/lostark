import * as React from 'react';
import {Badge, Checkbox, FormControlLabel, Icon, Stack, Typography} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import {Task} from "../data/TaskModel";
import TaskComponent from "./TaskComponent";

export default function Weeklies() {

    const accountWeeklies: Task[] = useSelector((state: RootState) => state.persistedReducer.accountWeeklies)
    const dispatch = useDispatch()

    return (
        <div>
            <Stack>
                <Badge badgeContent={4} color="error">
                    <Typography>Nice</Typography>
                </Badge>
                {accountWeeklies.map((task: Task, _: any) => (
                    TaskComponent(task, false)
                ))}
            </Stack>
        </div>
    );
}
