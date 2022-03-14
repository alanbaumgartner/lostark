import * as React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../app/store";
import {Task} from "../data/TaskModel";
import Box from "@mui/material/Box";
import {Card, CardActions, CardContent, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import TaskListComponent from "./TaskListComponent";

export default function Dailies() {

    const theme = useTheme()

    const accountDailies: Task[] = useSelector((state: RootState) => state.persistedReducer.accountDailies)

    return (
        <Box sx={{px: 2}}>
            <Card sx={{width: 'auto', height: '100%'}}>
                <CardContent sx={{background: theme.palette.primary.main}}>
                    <Typography variant={"h5"} sx={{
                        textAlign: "center"
                    }}>
                        Roster Dailies
                    </Typography>
                </CardContent>
                <CardActions>
                    {TaskListComponent(accountDailies)}
                </CardActions>
            </Card>
        </Box>
    );
}
