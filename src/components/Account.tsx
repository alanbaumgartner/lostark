import * as React from 'react';
import {Button, Checkbox, FormControlLabel, Stack, TextField, Typography} from '@mui/material';
import Dailies from "./Dailies";
import Weeklies from "./Weeklies";
import {useDispatch, useSelector} from "react-redux";
import {
    addCharacter,
    updateAccountWeekly,
    updateCharacterDaily,
    updateCharacterWeekly
} from "../app/accountSlice";
import {RootState} from "../app/store";
import CharacterComponent from "./Character";
import {Character} from "../data/CharacterModel";


export default function Account() {

    const characters: Character[] = useSelector((state: RootState) => state.persistedReducer.characters)
    const dispatch = useDispatch()

    return (
        <Stack direction="row">
            <Button onClick={() => dispatch(addCharacter("Testing"))}>
                New Acc
            </Button>

            <Dailies/>
            <Weeklies/>
            {characters.map((char: Character, _: any) => (
                <CharacterComponent name={char.name} weeklies={char.weeklies} dailies={char.dailies}/>
            ))}
        </Stack>
    );
}
