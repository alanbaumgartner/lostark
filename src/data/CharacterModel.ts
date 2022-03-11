import {generateDailyCharacterData, generateWeeklyCharacterData, Task} from "./TaskModel";

export interface Character {
    name: string,
    weeklies: Task[],
    dailies: Task[]
}

export function createCharacter(name: string) {
    return { name: name, dailies: generateDailyCharacterData(), weeklies: generateWeeklyCharacterData() }
}