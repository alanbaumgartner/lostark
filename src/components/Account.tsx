import * as React from 'react';
import {Stack} from '@mui/material';
import Dailies from "./Dailies";
import Weeklies from "./Weeklies";
import {useSelector} from "react-redux";
import {RootState} from "../app/store";
import CharacterComponent from "./CharacterComponent";
import {Character} from "../data/CharacterModel";


export default function Account() {

    const characters: Character[] = useSelector((state: RootState) => state.persistedReducer.characters)

    return (
        <Stack direction="row">
            <Dailies/>
            <Weeklies/>
            {characters.map((char: Character, _: any) => (
                <CharacterComponent name={char.name} server={char.server} weeklies={char.weeklies}
                                    dailies={char.dailies}/>
            ))}
        </Stack>
    );
}
