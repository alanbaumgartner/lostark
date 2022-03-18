import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit'

import {Account, createAccount} from "../data/AccountModel";
import {CharacterTask, Task, TaskUpdate} from "../data/TaskModel";
import {Character} from "../data/CharacterModel";
import moment from "moment";
import {getLastDailyReset, getLastWeeklyReset} from "../data/TimeUtility";

function resetDailies(account: Account) {
    account.accountDailies.forEach(task => {
        if (task.currentCount !== undefined) {
            task.currentCount = 0
        }
        task.completed = false
    })
    account.characters.forEach(char => {
        char.dailies.forEach(task => {
            if (task.currentCount !== undefined) {
                task.currentCount = 0
            }
            task.completed = false
        })
    })
    return account
}

function resetWeeklies(account: Account) {
    account.accountWeeklies.forEach(task => {
        if (task.currentCount !== undefined) {
            task.currentCount = 0
        }
        task.completed = false
    })
    account.characters.forEach(char => {
        char.weeklies.forEach(task => {
            if (task.currentCount !== undefined) {
                task.currentCount = 0
            }
            task.completed = false
        })
    })
    return account
}

function getWeeklyCharacterTaskList(account: Account, character: string): Task[] {
    let char = findCharacter(account, character)
    let tasks: CharacterTask[] = []
    if (char !== undefined) {
        tasks = tasks.concat(char.weeklies)
    }
    return tasks
}

function getDailyCharacterTaskList(account: Account, character: string): Task[] {
    let char = findCharacter(account, character)
    let tasks: CharacterTask[] = []
    if (char !== undefined) {
        tasks = tasks.concat(char.dailies)
    }
    return tasks
}

function getDailyTaskList(account: Account): Task[] {
    return account.accountDailies.concat(account.characters.flatMap(c => c.dailies))
}

function getWeeklyTaskList(account: Account): Task[] {
    return account.accountWeeklies.concat(account.characters.flatMap(c => c.weeklies))
}

export function findCharacter(account: Account, name: string) {
    return account.characters.find(char => char.name === name)
}

function findCharacterTask(account: Account, characterName: string, name: string) {
    let task = getDailyCharacterTaskList(account, characterName).find(task => task.name === name);
    if (task !== undefined) {
        account.lastDailyUpdate = moment().toJSON()
        return task
    }
    task = getDailyCharacterTaskList(account, characterName).find(task => task.name === name)
    if (task !== undefined) {
        account.lastWeeklyUpdate = moment().toJSON()
        return task
    }

    return task
}

function findTask(account: Account, name: string) {
    let task = getDailyTaskList(account).find(task => task.name === name);
    if (task !== undefined) {
        account.lastDailyUpdate = moment().toJSON()
        return task
    }
    task = getWeeklyTaskList(account).find(task => task.name === name)
    if (task !== undefined) {
        account.lastWeeklyUpdate = moment().toJSON()
        return task
    }
    return task
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
        updateCharacter: (state: Draft<Account>, action: PayloadAction<Character>) => {
            let char = findCharacter(state, action.payload.name)
            if (char !== undefined) {
                char.itemLevel = action.payload.itemLevel
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
        checkUpdates: (state: Draft<Account>) => {
            if (moment(state.lastDailyUpdate).isBefore(getLastDailyReset())) {
                state = resetDailies(state)
                state.lastDailyUpdate = moment().toJSON()
            }
            if (moment(state.lastWeeklyUpdate).isBefore(getLastWeeklyReset())) {
                state = resetWeeklies(state)
                state.lastWeeklyUpdate = moment().toJSON()
            }
            return state
        }
    }
})

export const {
    addCharacter,
    updateCharacter,
    removeCharacter,
    updateExchangeRate,
    update,
    checkUpdates,
} = accountSlice.actions

export default accountSlice.reducer