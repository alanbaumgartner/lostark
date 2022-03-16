import {Character} from "./CharacterModel";

export interface TaskUpdate {
    task: Task,
    character?: string,

    update(task: Task): void;
}

export interface Task {
    name: string,
    completed: boolean,
    currentCount?: number,
    requiredCount?: number
}

export interface CharacterTask extends Task {
    requiredItemLevel: number
}

export function canDo(task: CharacterTask, character: Character) {
    return task.requiredItemLevel <= character.itemLevel
}

export function isTaskDone(task: Task) {
    return task.completed || (task.currentCount !== undefined && task.requiredCount !== undefined && task.currentCount >= task.requiredCount)
}

export function createTask(name: string) {
    return {name: name, completed: false}
}

export function createCountTask(name: string, count: number) {
    return {name: name, completed: false, currentCount: 0, requiredCount: count}
}

export function createCharacterTask(name: string, requiredItemLevel: number = 0): CharacterTask {
    return {name: name, completed: false, requiredItemLevel: requiredItemLevel}
}

export function createCharacterCountTask(name: string, count: number, requiredItemLevel: number = 0): CharacterTask {
    return {name: name, completed: false, currentCount: 0, requiredCount: count, requiredItemLevel: requiredItemLevel}
}

export const generateDailyAccountData = () => {
    return [
        createTask("Adventure Island"),
        createTask("Calendar Boss"),
        createTask("Chaos Gate"),
        createCountTask("Affinity Song", 6),
        createCountTask("Affinity Emote", 6),
    ];
};

export const generateDailyCharacterData = () => {
    return [
        createCharacterCountTask("Una's Task Daily", 3),
        createCharacterCountTask("Chaos Dungeon", 2),
        createCharacterCountTask("Guardian", 2),
        createCharacterCountTask("Kalthertz Slaves", 5),
        createCharacterTask("Guild Donation"),
        createCharacterTask("Guild Research Support"),
    ];
};

export const generateWeeklyAccountData = () => {
    return [
        createTask("Ghostship"),
        createCountTask("Trial of the Abyss", 2),
    ];
};

export const generateWeeklyCharacterData = () => {
    return [
        createCharacterCountTask("Una's Task Weekly", 3),
        createCharacterCountTask("Guardian Weekly", 3),
        createCharacterTask("Abyss - Demon Beast Canyon", 340),
        createCharacterTask("Abyss - Necromancer's Origin", 340),
        createCharacterTask("Abyss - Hall of the Twisted Warlord", 460),
        createCharacterTask("Abyss - Hildebrandt Palace", 460),
        createCharacterTask("Abyss - Road of Lament", 840),
        createCharacterTask("Abyss - Forge of Fallen Pride", 840),
        createCharacterTask("Abyss - Sea of Indolence", 960),
        createCharacterTask("Abyss - Tranquil Karkosa", 960),
        createCharacterTask("Abyss - Alaric's Sanctuary", 960),
        createCharacterTask("Abyss - Aira's Oculus", 1325),
        createCharacterTask("Abyss - Oreha Preveza", 1340),
        createCharacterTask("Abyss Raid - Argos", 1370),
        createCharacterTask("Sylmael Bloodstone Exchange"),
        createCharacterTask("Pirate Vendor"),
        createCharacterTask("Chaos Dungeon Vendor"),
    ];
};