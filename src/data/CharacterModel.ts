import {generateDailyCharacterData, generateWeeklyCharacterData, Task} from "./TaskModel";

export enum Server {
    na_east,
    na_west,
    eu_west,
    eu_central,
    south_america
}

export interface Character {
    name: string,
    server: Server,
    weeklies: Task[],
    dailies: Task[]
}

export function createCharacter(name: string, server: Server) {
    return {name: name, server: server, dailies: generateDailyCharacterData(), weeklies: generateWeeklyCharacterData()}
}