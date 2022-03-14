import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import {Typography} from "@mui/material";
import {Character, createCharacter} from "../data/CharacterModel";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import * as React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {updateCharacter} from "../app/accountSlice";

interface UpdateCharacterDialogProps {
    character: Character;
    open: boolean;
    onClose: () => void;
}

export default function UpdateCharacterDialog(props: UpdateCharacterDialogProps) {

    const [itemLevel, setItemLevel] = useState(0)

    const {onClose, open} = props;

    const handleClose = () => {
        onClose();
    };

    const dispatch = useDispatch()

    const handleCreate = () => {
        onClose()
        dispatch(updateCharacter(createCharacter(props.character.name, props.character.server, props.character.loaClass, itemLevel)))
    }
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update {props.character.name}</DialogTitle>
            <DialogContent>
                <Typography>{props.character.name}</Typography>
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleCreate}>Update</Button>
            </DialogActions>
        </Dialog>
    );
}