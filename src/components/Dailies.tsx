import * as React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../app/store";
import {Task} from "../data/TaskModel";
import TaskComponent from "./TaskComponent";
import Box from "@mui/material/Box";
import {Card, CardActions, CardContent, Grid, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";

export default function Dailies() {

    const theme = useTheme()

    const accountDailies: Task[] = useSelector((state: RootState) => state.persistedReducer.accountDailies)

    return (
        <Box sx={{ height: '100%', width: '25%', px: 2}}>
            <Card sx={{width: 'auto', height: '100%'}}>
                <CardContent sx={{background: theme.palette.primary.main}}>
                    <Typography variant={"h5"} sx={{
                        textAlign: "center"
                    }}>
                        Roster Dailies
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                        {accountDailies.map((task: Task, _: any) => (
                            TaskComponent(task)
                        ))}
                    </Grid>
                </CardActions>
            </Card>
        </Box>
    );
}
