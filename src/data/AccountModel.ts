import {generateDailyAccountData, generateWeeklyAccountData, Task} from "./TaskModel";
import {Character} from "./CharacterModel";
import moment from "moment";

export interface Account {
    accountDailies: Task[],
    accountWeeklies: Task[],
    characters: Character[],
    exchangeRate: number,
    lastDailyUpdate: string,
    lastWeeklyUpdate: string,

}

export function createAccount(): Account {
    return {
        accountDailies: generateDailyAccountData(),
        accountWeeklies: generateWeeklyAccountData(),
        characters: [],
        exchangeRate: 1000,
        lastDailyUpdate: moment().toJSON(),
        lastWeeklyUpdate: moment().toJSON()
    }
}