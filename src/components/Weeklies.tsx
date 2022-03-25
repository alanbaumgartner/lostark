import * as React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../app/store";
import {Task} from "../data/TaskModel";
import Box from "@mui/material/Box";
import {Card, CardActions, CardContent, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import TaskListComponent from "./TaskListComponent";

export default function Weeklies() {

    const theme = useTheme()
    const accountWeeklies: Task[] = useSelector((state: RootState) => state.persistedReducer.account.accountWeeklies)

    return (
        <Box sx={{px: 2, marginTop: 2}}>
            <Card sx={{height: '100%'}}>
                <CardContent sx={{background: theme.palette.primary.main}}>
                    <Typography variant={"h5"} sx={{
                        textAlign: "center"
                    }}>
                        Roster Weeklies
                    </Typography>

                </CardContent>
                <CardActions>
                    {TaskListComponent(accountWeeklies)}
                </CardActions>
            </Card>
        </Box>
    );
}
