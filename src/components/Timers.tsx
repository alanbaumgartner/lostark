import Box from "@mui/material/Box";
import {Card, CardActions, CardContent, Stack, Typography} from "@mui/material";
import * as React from "react";
import {useTheme} from "@mui/material/styles";
import moment from "moment";
import {getNextDailyReset, getNextWeeklyReset} from "../data/TimeUtility";


export default function Timers() {

    const theme = useTheme()

    return (
        <Box sx={{px: 2}}>
            <Card sx={{height: '100%'}}>
                <CardContent sx={{background: theme.palette.primary.main}}>
                    <Typography variant={"h5"} sx={{
                        textAlign: "center"
                    }}>
                        Reset Timers
                    </Typography>
                </CardContent>
                <CardActions>
                    <Stack sx={{width: "100%"}} direction={"row"}>
                        <Typography sx={{marginLeft: 2, width: "50%"}}>
                            Daily: {moment.duration(getNextDailyReset().diff(moment().utc())).humanize()}
                        </Typography>
                        <Typography sx={{width: "50%"}}>
                            Weekly: {moment.duration(getNextWeeklyReset().diff(moment().utc())).humanize()}
                        </Typography>
                    </Stack>
                </CardActions>
            </Card>
        </Box>
    );
}