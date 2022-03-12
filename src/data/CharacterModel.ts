import {generateDailyCharacterData, generateWeeklyCharacterData, Task} from "./TaskModel";

import BerserkerIcon from "../assets/class_icons/berserkerIcon.png";
import GunlancerIcon from "../assets/class_icons/gunlancerIcon.png";
import BardIcon from "../assets/class_icons/bardIcon.png";
import WardancerIcon from "../assets/class_icons/wardancerIcon.png";
import ScrapperIcon from "../assets/class_icons/scrapperIcon.png";
import SoulfistIcon from "../assets/class_icons/soulfistIcon.png";
import SharpshooterIcon from "../assets/class_icons/sharpshooterIcon.png";
import DeadeyeIcon from "../assets/class_icons/deadeyeIcon.png";
import ArtilleristIcon from "../assets/class_icons/artilleristIcon.png";
import PaladinIcon from "../assets/class_icons/paladinIcon.png";
import StrikerIcon from "../assets/class_icons/strikerIcon.png";
import SorceressIcon from "../assets/class_icons/sorceressIcon.png";
import GunslingerIcon from "../assets/class_icons/gunslingerIcon.png";
import DeathbladeIcon from "../assets/class_icons/deathbladeIcon.png";
import ShadowhunterIcon from "../assets/class_icons/shadowhunterIcon.png";

export enum Server {
    NA_EAST = "NA East",
    NA_WEST = "NA West",
    EU_WEST = "EU West",
    EU_CENTRAL = "EU Central",
    SOUTH_AMERICA = "South America"
}

export enum LoaClass {
    BERSERKER = "Berserker",
    GUNLANCER = "Gunlancer",
    BARD = "Bard",
    WARDANCER = "Wardancer",
    SCRAPPER = "Scrapper",
    SOULFIST = "Soulfist",
    SHARPSHOOTER = "Sharpshooter",
    DEADEYE = "Deadeye",
    ARTILLERIST = "Artillerist",
    PALADIN = "Paladin",
    STRIKER = "Striker",
    SORCERESS = "Sorceress",
    GUNSLINGER = "Gunslinger",
    DEATHBLADE = "Deathblade",
    SHADOWHUNTER = "Shadowhunter",
}

export function enumToMap(enumeration: any): Map<string, string | number> {
    const map = new Map<string, string | number>();
    for (let key in enumeration) {
        //TypeScript does not allow enum keys to be numeric
        if (!isNaN(Number(key))) continue;

        const val = enumeration[key] as string | number;

        //TypeScript does not allow enum value to be null or undefined
        if (val !== undefined && val !== null)
            map.set(key, val);
    }

    return map;
}

export const loaClassMap: Map<string, string> = new Map<string, string>([
    ["BERSERKER", BerserkerIcon],
    ["GUNLANCER", GunlancerIcon],
    ["BARD", BardIcon],
    ["WARDANCER", WardancerIcon],
    ["SCRAPPER", ScrapperIcon],
    ["SOULFIST", SoulfistIcon],
    ["SHARPSHOOTER", SharpshooterIcon],
    ["DEADEYE", DeadeyeIcon],
    ["ARTILLERIST", ArtilleristIcon],
    ["PALADIN", PaladinIcon],
    ["STRIKER", StrikerIcon],
    ["SORCERESS", SorceressIcon],
    ["GUNSLINGER", GunslingerIcon],
    ["DEATHBLADE", DeathbladeIcon],
    ["SHADOWHUNTER", ShadowhunterIcon],
])

export interface Character {
    name: string,
    itemLevel: number,
    loaClass: LoaClass
    server: Server,
    weeklies: Task[],
    dailies: Task[]
}

export function createCharacter(name: string, server: Server, loaClass: LoaClass, itemLevel: number) {
    return {
        name: name,
        server: server,
        dailies: generateDailyCharacterData(),
        weeklies: generateWeeklyCharacterData(),
        loaClass: loaClass,
        itemLevel: itemLevel
    }
}