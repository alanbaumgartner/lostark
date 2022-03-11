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

export function isTaskDone(task: Task) {
    return task.completed || (task.currentCount !== undefined && task.requiredCount !== undefined && task.currentCount >= task.requiredCount)
}

export function createTask(name: string) {
    return {name: name, completed: false}
}

export function createCountTask(name: string, count: number) {
    return {name: name, completed: false, currentCount: 0, requiredCount: count}
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
        createCountTask("Una's Task Daily", 3),
        createCountTask("Chaos Dungeon", 2),
        createCountTask("Guardian", 2),
        createCountTask("Kalthertz Slaves", 5),
        createTask("Guild Donation"),
        createTask("Guild Research Support"),
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
        createCountTask("Una's Task Weekly", 3),
        createCountTask("Guardian Weekly", 3),
        createTask("Abyss - Demon Beast Canyon"),
        createTask("Abyss - Necromancer's Origin"),
        createTask("Abyss - Hall of the Twisted Warlord"),
        createTask("Abyss - Hildebrandt Palace"),
        createTask("Abyss - Road of Lament"),
        createTask("Abyss - Forge of Fallen Pride"),
        createTask("Abyss - Sea of Indolence"),
        createTask("Abyss - Tranquil Karkosa"),
        createTask("Abyss - Alaric's Sanctuary"),
        createTask("Abyss - Aira's Oculus"),
        createTask("Abyss - Oreha Preveza"),
        createTask("Abyss Raid - Argos"),
        createTask("Sylmael Bloodstone Exchange"),
        createTask("Pirate Vendor"),
        createTask("Chaos Dungeon Vendor"),
    ];
};