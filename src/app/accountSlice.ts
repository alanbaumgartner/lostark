import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit'

import {Account, createAccount} from "../data/AccountModel";
import {Task, TaskUpdate} from "../data/TaskModel";
import {Character, createCharacter} from "../data/CharacterModel";

function getTaskList(account: Account): Task[] {
    return account.accountWeeklies.concat(account.accountDailies).concat(account.characters.flatMap(c => c.dailies.concat(c.weeklies)))
}

function findCharacter(list: Character[], name: string) {
    return list.find(char => char.name === name)
}

function findTask(account: Account, name: string) {
    return getTaskList(account).find(task => task.name === name)
}

export const accountSlice = createSlice({
    name: 'account',
    initialState: createAccount(),
    reducers: {
        addCharacter: (state: Draft<Account>, action: PayloadAction<string>) => {
            let char = findCharacter(state.characters, action.payload)
            if (char === undefined) {
                state.characters.push(createCharacter(action.payload))
            }
            return state
        },
        update: (state: Draft<Account>, action: PayloadAction<TaskUpdate>) => {
            let task = findTask(state, action.payload.task.name)
            if (task !== undefined) {
                action.payload.update(task)
            }
            return state
        },
    }
})

export const {
    addCharacter,
    update,
} = accountSlice.actions

export default accountSlice.reducer