

const Logger = require("../../localModules/logger")()


class create_actionManager {
    constructor(jarvisInstance) {
        this.Jarvis = jarvisInstance
        this._actionsStack = []
        this._paused = false
    }

    addAction(func) {
        if(typeof func === "function") {

        } else { this.Jarvis.throwError() }
    }

    testManager() {
        Logger.debug("test manager OK")
    }
}

let _instance;

module.exports = (jarvisInstance=undefined) => {
    if(_instance) return _instance
    else _instance = new create_actionManager(jarvisInstance)
    return _instance
}