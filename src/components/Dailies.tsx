import * as React from 'react';
import {Checkbox, FormControlLabel, Stack} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import {updateAccountDaily, updateAccountWeekly} from "../app/accountSlice";
import {Task} from "../data/TaskModel";

export default function Dailies() {

    const accountDailies: Task[] = useSelector((state: RootState) => state.persistedReducer.accountDailies)
    const dispatch = useDispatch()

    return (
        <div>
            <Stack>
                {accountDailies.map((text: Task, _: any) => (
                    <FormControlLabel key={text.name} control={<Checkbox onChange={(event) => {
                        dispatch(updateAccountDaily({name: text.name, completed: event.target.checked}))
                    }
                    } checked={text.completed}/>} label={text.name}/>
                ))}
            </Stack>
        </div>
    );
}
