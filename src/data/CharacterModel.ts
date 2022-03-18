import {CharacterTask, generateDailyCharacterData, generateWeeklyCharacterData} from "./TaskModel";

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

export const loaClasses = [
    "Berserker",
    "Gunlancer",
    "Bard",
    "Wardancer",
    "Scrapper",
    "Soulfist",
    "Sharpshooter",
    "Deadeye",
    "Artillerist",
    "Paladin",
    "Striker",
    "Sorceress",
    "Gunslinger",
    "Deathblade",
    "Shadowhunter",
];

export const servers = [
    "NA East",
    "NA West",
    "EU West",
    "EU Central",
    "South America"
];

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
    ["Berserker", BerserkerIcon],
    ["Gunlancer", GunlancerIcon],
    ["Bard", BardIcon],
    ["Wardancer", WardancerIcon],
    ["Scrapper", ScrapperIcon],
    ["Soulfist", SoulfistIcon],
    ["Sharpshooter", SharpshooterIcon],
    ["Deadeye", DeadeyeIcon],
    ["Artillerist", ArtilleristIcon],
    ["Paladin", PaladinIcon],
    ["Striker", StrikerIcon],
    ["Sorceress", SorceressIcon],
    ["Gunslinger", GunslingerIcon],
    ["Deathblade", DeathbladeIcon],
    ["Shadowhunter", ShadowhunterIcon],
])

export interface Character {
    name: string,
    itemLevel: number,
    loaClass: string
    weeklies: CharacterTask[],
    dailies: CharacterTask[]
}

export function createCharacter(name: string, loaClass: string, itemLevel: number) {
    return {
        name: name,
        dailies: generateDailyCharacterData(),
        weeklies: generateWeeklyCharacterData(),
        loaClass: loaClass,
        itemLevel: itemLevel
    }
}