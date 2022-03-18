import * as React from 'react';
import Dailies from "../components/Dailies";
import Weeklies from "../components/Weeklies";
import {useSelector} from "react-redux";
import {RootState} from "../app/store";
import CharacterComponent from "../components/CharacterComponent";
import {Character} from "../data/CharacterModel";
import Box from "@mui/material/Box";
import {Grid, Stack} from "@mui/material";
import Timers from "../components/Timers";

export default function Home() {

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
            <Stack sx={{width: "20%"}}>
                <Timers/>
                <Dailies/>
                <Weeklies/>
            </Stack>
            <Box sx={{width: "80%"}}>
                <Grid container spacing={2}>
                    {characters.map((char: Character, _: number) => (
                        <CharacterComponent name={char.name} weeklies={char.weeklies}
                                            dailies={char.dailies} loaClass={char.loaClass}
                                            itemLevel={char.itemLevel}/>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
