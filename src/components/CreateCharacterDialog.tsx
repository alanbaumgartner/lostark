import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import {FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent} from "@mui/material";
import {createCharacter, enumToMap, loaClasses, Server} from "../data/CharacterModel";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import * as React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addCharacter} from "../app/accountSlice";

export interface CreateCharacterDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function CreateCharacterDialog(props: CreateCharacterDialogProps) {

    const [name, setName] = useState("")
    const [server, setServer] = useState(Server.NA_EAST)
    const [itemLevel, setItemLevel] = useState(0)
    const [loaClass, setLoaClass] = useState("Berserker")

    const {onClose, open} = props;

    const handleClose = () => {
        onClose();
    };

    const dispatch = useDispatch()

    const handleCreate = () => {
        onClose()
        dispatch(addCharacter(createCharacter(name, server, loaClass, itemLevel)))
    }
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create a Character</DialogTitle>
            <DialogContent>
                <TextField
                    onChange={event => setName(event.target.value)}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Character Name"
                    type="name"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    onChange={event => setItemLevel(parseFloat(event.target.value))}
                    autoFocus
                    margin="dense"
                    id="level"
                    label="Item Level"
                    type="name"
                    fullWidth
                    variant="standard"
                />
                <FormControl sx={{m: 1, minWidth: 120}}>
                    <InputLabel>Class</InputLabel>
                    <Select
                        value={loaClass}
                        onChange={(event: SelectChangeEvent<any>) => setLoaClass(event.target.value)}
                        input={<OutlinedInput label="Class"/>}
                    >
                        {loaClasses.map(k => (<MenuItem value={k}>{k}</MenuItem>))}
                    </Select>
                </FormControl>
                <FormControl sx={{m: 1, minWidth: 120}}>
                    <InputLabel>Server</InputLabel>
                    <Select
                        value={server}
                        onChange={(event: SelectChangeEvent<any>) => setServer(event.target.value)}
                        input={<OutlinedInput label="Server"/>}
                    >
                        {Array.from(enumToMap(Server).entries()).map(m => ({key: m[0], value: m[1]})).map(k => (
                            <MenuItem value={k.key}>{k.value}</MenuItem>))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleCreate}>Create</Button>
            </DialogActions>
        </Dialog>
    );
}