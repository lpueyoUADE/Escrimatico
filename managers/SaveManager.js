// managers/SaveManager.js

import DefaultSaveData from '../data/DefaultSaveData.js';

const LEVEL_ORDER = [
    { region: "noroeste", level: "flora" },
    { region: "noroeste", level: "fauna" },
    { region: "noroeste", level: "folclore" },

    { region: "cuyo", level: "flora" },
    { region: "cuyo", level: "fauna" },
    { region: "cuyo", level: "folclore" },

    { region: "pampa", level: "flora" },
    { region: "pampa", level: "fauna" },
    { region: "pampa", level: "folclore" },

    { region: "litoral", level: "flora" },
    { region: "litoral", level: "fauna" },
    { region: "litoral", level: "folclore" },

    { region: "patagonia", level: "flora" },
    { region: "patagonia", level: "fauna" },
    { region: "patagonia", level: "folclore" },

    { region: "malvinas", level: "flora" },
    { region: "malvinas", level: "fauna" },
    { region: "malvinas", level: "folclore" }
];


class SaveManager {
    
    constructor() {
        this.saveData = null;
        this.init();
        this.scoreToNextLevel = 15;
    }

    // =========================================
    // INIT
    // =========================================

    init() {
        const localSave = localStorage.getItem('escrimaticos_save');

        if (localSave) {
            this.saveData = JSON.parse(localSave);

            console.log("SAVE LOADED");
        }
        else {
            this.saveData = structuredClone(DefaultSaveData);

            this.save();

            console.log("NEW SAVE CREATED");
        }
    }

    // =========================================
    // SAVE
    // =========================================

    save() {
        if (!this.saveData) {
            console.error("SaveManager no inicializado");
            return false;
        }
        localStorage.setItem(
            'escrimaticos_save',
            JSON.stringify(this.saveData)
        );
    }

    // =========================================
    // GETTERS
    // =========================================

    isRegionUnlocked(regionName) {
        if (!this.saveData) {
            console.error("SaveManager no inicializado");
            return false;
        }

        return this.saveData
            .regions[regionName]
            .unlocked;
    }

    isLevelUnlocked(regionName, levelKey) {
        if (!this.saveData) {
            console.error("SaveManager no inicializado");
            return false;
        }
        return this.saveData
            .regions[regionName]
            .levels[levelKey]
            .unlocked;
    }

    getLevelScore(regionName, levelKey) {
        if (!this.saveData) {
            console.error("SaveManager no inicializado");
            return false;
        }
        return this.saveData
            .regions[regionName]
            .levels[levelKey]
            .score;
    }

    // =========================================
    // SETTERS
    // =========================================

    unlockRegion(regionName) {
        if (!this.saveData) {
            console.error("SaveManager no inicializado");
            return false;
        }
        this.saveData
            .regions[regionName]
            .unlocked = true;

        this.save();
    }

    unlockLevel(regionName, levelKey) {
        if (!this.saveData) {
            console.error("SaveManager no inicializado");
            return false;
        }
        this.saveData
            .regions[regionName]
            .levels[levelKey]
            .unlocked = true;

        this.save();
    }

    completeLevel(regionName, levelKey, score) {
        const level =
            this.saveData
                .regions[regionName]
                .levels[levelKey];

        level.completed = true;

        level.score =
            Math.max(
                level.score,
                score
            );

        if (score >= this.scoreToNextLevel) {

            this.unlockNextLevel(
                regionName,
                levelKey
            );
        }

        this.save();
    }

    unlockNextLevel(regionName, levelKey) {

        const currentIndex =
            LEVEL_ORDER.findIndex(
                entry =>
                    entry.region === regionName &&
                    entry.level === levelKey
            );

        if (currentIndex === -1) {
            return;
        }

        const next =
            LEVEL_ORDER[currentIndex + 1];

        if (!next) {
            return;
        }

        this.unlockRegion(
            next.region
        );

        this.unlockLevel(
            next.region,
            next.level
        );
    }

    // =========================================
    // DEBUG
    // =========================================

    resetSave() {
        if (!this.saveData) {
            console.error("SaveManager no inicializado");
            return false;
        }
        this.saveData =
            structuredClone(DefaultSaveData);

        this.save();
    }
}

const instance = new SaveManager();

export default instance;