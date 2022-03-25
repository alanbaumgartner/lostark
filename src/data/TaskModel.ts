import {Character} from "./CharacterModel";

export interface TaskUpdate {
    task: Task,
    character?: string,

    update(task: Task): void;
}

export interface Task {
    name: string,
    currentCount: number,
    requiredCount: number,
}

export interface CharacterTask extends Task {
    requiredItemLevel: number
}

export function canDo(task: CharacterTask, character: Character) {
    return task.requiredItemLevel <= character.itemLevel
}

export function getTaskProgress(task: Task) {
    return task.currentCount / task.requiredCount
}

export function isTaskDone(task: Task) {
    return getTaskProgress(task) === 1
}

export function createTask(name: string, count: number = 1): Task {
    return {
        name: name,
        currentCount: 0,
        requiredCount: count
    }
}

export function createCharacterTask(name: string, count: number = 1, requiredItemLevel: number = 0): CharacterTask {
    return {
        name: name,
        currentCount: 0,
        requiredCount: count,
        requiredItemLevel: requiredItemLevel
    }
}

export const generateDailyAccountData = () => {
    return [
        createTask("Adventure Island"),
        createTask("Field Boss"),
        createTask("Chaos Gate"),
        createTask("Grand Prix Race"),
        createTask("Affinity Song", 6),
        createTask("Affinity Emote", 6),
    ];
};

export const generateDailyCharacterData = () => {
    return [
        createCharacterTask("Una's Task Daily", 3),
        createCharacterTask("Chaos Dungeon", 2),
        createCharacterTask("Guardian Raid", 2),
        createCharacterTask("Kalthertz Slaves", 5),
        createCharacterTask("Guardian Event"),
        createCharacterTask("Guild Donation"),
        createCharacterTask("Guild Research Support"),
    ];
};

export const generateWeeklyAccountData = () => {
    return [
        createTask("Ghostship"),
        createTask("Grand Prix Shop"),
        createTask("Guardian Event Shop"),
        createTask("Trial of the Abyss", 2),
    ];
};

export const generateWeeklyCharacterData = () => {
    return [
        createCharacterTask("Una's Task Weekly", 3),
        createCharacterTask("Guardian Weekly", 3),
        createCharacterTask("Abyss - Demon Beast Canyon", 1, 340),
        createCharacterTask("Abyss - Necromancer's Origin", 1, 340),
        createCharacterTask("Abyss - Hall of the Twisted Warlord", 1, 460),
        createCharacterTask("Abyss - Hildebrandt Palace", 1, 460),
        createCharacterTask("Abyss - Road of Lament", 1, 840),
        createCharacterTask("Abyss - Forge of Fallen Pride", 1, 840),
        createCharacterTask("Abyss - Sea of Indolence", 1, 960),
        createCharacterTask("Abyss - Tranquil Karkosa", 1, 960),
        createCharacterTask("Abyss - Alaric's Sanctuary", 1, 960),
        createCharacterTask("Abyss - Aira's Oculus", 1, 1325),
        createCharacterTask("Abyss - Oreha Preveza", 1, 1340),
        createCharacterTask("Abyss Raid - Argos", 1, 1370),
        createCharacterTask("Sylmael Bloodstone Exchange"),
        createCharacterTask("Pirate Vendor"),
        createCharacterTask("Chaos Dungeon Vendor"),
    ];
};