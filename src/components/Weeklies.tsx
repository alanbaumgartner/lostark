import * as React from 'react';
import {Badge, Checkbox, FormControlLabel, Icon, Stack, Typography} from '@mui/material';
import {updateAccountWeekly} from "../app/accountSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import {Task} from "../data/TaskModel";

export default function Weeklies() {

    const accountWeeklies: Task[] = useSelector((state: RootState) => state.persistedReducer.accountWeeklies)
    const dispatch = useDispatch()

    return (
        <div>
            <Stack>
                <Badge badgeContent={4} color="error">
                    <Typography>Nice</Typography>
                </Badge>
                {accountWeeklies.map((text: Task, _: any) => (
                    <FormControlLabel key={text.name} control={<Checkbox onChange={(event) => {
                        dispatch(updateAccountWeekly({name: text.name, completed: event.target.checked}))
                    }
                    } checked={text.completed}/>} label={text.name}/>
                ))}
            </Stack>
        </div>
    );
}
