import {generateDailyAccountData, generateWeeklyAccountData, Task} from "./TaskModel";
import {Character} from "./CharacterModel";

export interface Account {
    accountDailies: Task[],
    accountWeeklies: Task[],
    characters: Character[],
    exchangeRate: number
}

export function createAccount(): Account {
    return {accountDailies: generateDailyAccountData(), accountWeeklies: generateWeeklyAccountData(), characters: [], exchangeRate: 1000}
}