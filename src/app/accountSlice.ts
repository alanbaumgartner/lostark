import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit'

import {Account, createAccount} from "../data/AccountModel";
import {Task} from "../data/TaskModel";
import {Character, createCharacter} from "../data/CharacterModel";

function findCharacter(list: Character[], name: string) {
    return list.find(char => char.name === name)
}

function findTask(list: Task[], name: string) {
    return list.find(task => task.name === name)
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
        updateCharacterDaily: (state: Draft<Account>, action: PayloadAction<[string, Task]>) => {
            let char = findCharacter(state.characters, action.payload[0])
            if (char !== undefined) {
                let task = findTask(char.dailies, action.payload[1].name)
                if (task !== undefined) {
                    if (task.currentCount !== undefined && task.requiredCount !== undefined) {
                        task.currentCount = Math.min(task.currentCount + 1, task.requiredCount)
                        task.completed = true
                    } else {
                        task.completed = action.payload[1].completed
                    }
                }
            }
            return state
        },
        updateCharacterWeekly: (state: Draft<Account>, action) => {
            let char = findCharacter(state.characters, action.payload[0])
            if (char !== undefined) {
                let task = findTask(char.weeklies, action.payload[1].name)
                if (task !== undefined) {
                    if (task.currentCount !== undefined && task.requiredCount !== undefined) {
                        task.currentCount = Math.min(task.currentCount + 1, task.requiredCount)
                        task.completed = true
                    } else {
                        task.completed = action.payload[1].completed
                    }
                }
            }
            return state
        },
        updateAccountDaily: (state: Draft<Account>, action: PayloadAction<Task>) => {
            let task = findTask(state.accountDailies, action.payload.name)
            if (task !== undefined) {
                if (task.currentCount !== undefined && task.requiredCount !== undefined) {
                    task.currentCount = Math.min(task.currentCount + 1, task.requiredCount)
                    task.completed = true
                } else {
                    task.completed = action.payload.completed
                }
            }
            return state
        },
        updateAccountWeekly: (state: Draft<Account>, action: PayloadAction<Task>) => {
            let task = findTask(state.accountWeeklies, action.payload.name)
            if (task !== undefined) {
                if (task.currentCount !== undefined && task.requiredCount !== undefined) {
                    task.currentCount = Math.min(task.currentCount + 1, task.requiredCount)
                    task.completed = true
                } else {
                    task.completed = action.payload.completed
                }
            }
            return state
        },
    }
})

export const {
    addCharacter,
    updateCharacterDaily,
    updateCharacterWeekly,
    updateAccountDaily,
    updateAccountWeekly
} = accountSlice.actions

export default accountSlice.reducer