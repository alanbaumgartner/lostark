import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit'

import {Account, createAccount} from "../data/AccountModel";
import {Task, TaskUpdate} from "../data/TaskModel";
import {Character} from "../data/CharacterModel";

function getCharacterTaskList(account: Account, character: string): Task[] {
    let char = findCharacter(account, character)
    let tasks: Task[] = []
    if (char !== undefined) {
        tasks = tasks.concat(char.weeklies.concat(char.dailies))
    }
    return tasks.concat(account.accountWeeklies.concat(account.accountDailies))
}

function getTaskList(account: Account): Task[] {
    return account.accountWeeklies.concat(account.accountDailies).concat(account.characters.flatMap(c => c.dailies.concat(c.weeklies)))
}

function findCharacter(account: Account, name: string) {
    return account.characters.find(char => char.name === name)
}

function findCharacterTask(account: Account, characterName: string, name: string) {
    return getCharacterTaskList(account, characterName).find(task => task.name === name)
}

function findTask(account: Account, name: string) {
    return getTaskList(account).find(task => task.name === name)
}

export const accountSlice = createSlice({
    name: 'account',
    initialState: createAccount(),
    reducers: {
        addCharacter: (state: Draft<Account>, action: PayloadAction<Character>) => {
            let char = findCharacter(state, action.payload.name)
            if (char === undefined) {
                state.characters.push(action.payload)
            }
            return state
        },
        removeCharacter: (state: Draft<Account>, action: PayloadAction<Character>) => {
            if (action.payload !== undefined) {
                state.characters = state.characters.filter(c => c.name !== action.payload.name)
            }
            return state
        },
        updateExchangeRate: (state: Draft<Account>, action: PayloadAction<number>) => {
            state.exchangeRate = action.payload
            return state
        },
        update: (state: Draft<Account>, action: PayloadAction<TaskUpdate>) => {
            if (action.payload.character !== undefined) {
                let task = findCharacterTask(state, action.payload.character, action.payload.task.name)
                if (task !== undefined) {
                    action.payload.update(task)
                }
            } else {
                let task = findTask(state, action.payload.task.name)
                if (task !== undefined) {
                    action.payload.update(task)
                }
            }
            return state
        },
    }
})

export const {
    addCharacter,
    removeCharacter,
    updateExchangeRate,
    update,
} = accountSlice.actions

export default accountSlice.reducer