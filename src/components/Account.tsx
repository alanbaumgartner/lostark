import * as React from 'react';
import Dailies from "./Dailies";
import Weeklies from "./Weeklies";
import {useSelector} from "react-redux";
import {RootState} from "../app/store";
import CharacterComponent from "./CharacterComponent";
import {Character} from "../data/CharacterModel";
import Box from "@mui/material/Box";

export default function Account() {

    const characters: Character[] = useSelector((state: RootState) => state.persistedReducer.characters)

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
            }}
        >
            <Dailies/>
            <Weeklies/>
            {characters.map((char: Character, _: any) => (
                <CharacterComponent name={char.name} server={char.server} weeklies={char.weeklies}
                                    dailies={char.dailies} loaClass={char.loaClass} itemLevel={char.itemLevel}/>
            ))}
        </Box>
    );
}
