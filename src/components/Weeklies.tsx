import * as React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../app/store";
import {Task} from "../data/TaskModel";
import TaskComponent from "./TaskComponent";
import Box from "@mui/material/Box";

export default function Weeklies() {

    const accountWeeklies: Task[] = useSelector((state: RootState) => state.persistedReducer.accountWeeklies)

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
            }}
        >
            {accountWeeklies.map((task: Task, _: any) => (
                TaskComponent(task)
            ))}
        </Box>
    );
}
