// managers/SaveManager.js

import DefaultSaveData from '../data/DefaultSaveData.js';

class SaveManager {

    constructor() {

        this.saveData = null;
        this.init();
    }

    // =========================================
    // INIT
    // =========================================

    init() {
        const localSave = null;//localStorage.getItem('escrimaticos_save');

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
        if (!this.saveData) {
            console.error("SaveManager no inicializado");
            return false;
        }
        const level =
            this.saveData
                .regions[regionName]
                .levels[levelKey];

        level.completed = true;

        level.score =
            Math.max(level.score, score);

        this.save();
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