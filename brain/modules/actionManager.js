

const Logger = require("../../localModules/logger")()


class create_actionManager {
    constructor(jarvisInstance) {
        this.Jarvis = jarvisInstance
        this._actionsStack = []
        this._paused = false

        this._clock = {
            value: 0, // ms
            interval: 1000 // ms. One check every 10ms
        }
    }

    addAction(func, cancelFunc) {
        if(typeof func === "function") {
            if(typeof cancelFunc === "function") {
                let identifier = this.Jarvis.useModule("somef").randomString(8, "hex")
                this._actionsStack.push({
                    identifier: identifier,
                    function: func,
                    givenAt: Date.now(),
                    cancelFunction: cancelFunc || (() => { this.Jarvis.throwWarn("4",`Cannot cancel action ${identifier}`) })
                })
            } else {
                Logger.warn(`addAction()> Arg 'cancelFunc': '${typeof cancelFunc}' was given. Expected to be 'function'`)
            }
        } else {
            Logger.warn(`addAction()> Arg 'func': '${typeof func}' was given. Expected to be 'function'`)
        }
    }

    getActionList() {
        return this._actionsStack
    }

    resetClock() { this._clock.value = 0 }

}

let _instance;

module.exports = (jarvisInstance=undefined) => {
    if(_instance) return _instance
    else _instance = new create_actionManager(jarvisInstance)
    return _instance
}