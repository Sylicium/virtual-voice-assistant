

let config = require("./config")
let somef = require("./localModules/someFunctions")
const Logger_file = require("./localModules/logger")()
const fs = require("fs")
const notifier = require('node-notifier');
const child_process = require("child_process")
const path = require("path")

let say = require("say")
const { text } = require("express");
const { info } = require("console");

/****** JARVIS MODULES *******/
let JarvisModules = {
    "actionManager": require("./brain/modules/actionManager")
}

let rootDirectory = __dirname

let Logger = {
    log: (...args) => { Logger_file.log(`[Jarvis.js LOG]:`,...args) },
    error: (...args) => { Logger_file.error(`[Jarvis.js ERROR]:`,...args) },
    warn: (...args) => { Logger_file.success(`[Jarvis.js WARN]:`,...args) },
    info: (...args) => { Logger_file.info(`[Jarvis.js INFO]:`,...args) },
    debug: (...args) => { Logger_file.debug(`[Jarvis.js DEBUG]:`,...args) }
}

let GlobalVars = {
    io: undefined
}


class commandObject {
    constructor(command_require) {
        this.infos = command_require.infos
        this.init = command_require.init
        this.configuration = command_require.configuration
        this.rules = command_require.rules
    }

    getFormatedArgs(text) {
        return text.split(" ")
    }

    testConfiguration(configID, text) {
        let args = this.getFormatedArgs(text)
        let configNeeded = this.configuration.filter(x => { return x.id == configID })[0]
        Logger.debug("configNeeded:",configNeeded)
        if(configNeeded.match == "all") {
            console.log("testing all", args,configNeeded.content, " =>",somef.all(args, configNeeded.content, false))
            return somef.all(args, configNeeded.content, false)
        } else if(configNeeded.match = "any") {
            console.log("testing any", args,configNeeded.content, " =>",somef.any(args, configNeeded.content, false))
            return somef.any(args, configNeeded.content, false)
        }
    }

    test = (text) => {
        for(let rule_i in this.rules) {
            let rule = this.rules[rule_i]
            let answers = rule.answers
            let isConfigOk = true
            for(let configNeededInt_index in rule.configuration) {
                let configNeededInt = rule.configuration[configNeededInt_index]
                let tested = this.testConfiguration(configNeededInt, text)
                if(!tested) isConfigOk = false
                
            }
            if(isConfigOk) return {
                isOk: true,
                rule: rule
            }
        }
        return {
            isOk: false
        }
    }

    execute = (text) => {
        let tested = this.test(text)
        Logger.debug("tested:",tested)
        if(tested.isOk) {
            if(tested.rule.function) {
                setTimeout(async () => {
                    tested.rule.function(JarvisInstance)
                }, 1)
            }
            return { executed: true, answers: tested.rule.answers }
        } else {
            return { executed: false }
        }
    }
}


function getCommandRequireListOfDirectory(path, ends_with=".js") {
    let list = []
    fs.readdirSync(path).forEach(file => {
        if(file.endsWith(ends_with)) {
            let fileName = file.split(".")
            fileName.pop()
            fileName.join(".")
            //require(`./events/${endpoint_type}/${fileName}`).start(bot, endpoint_type)
            let the_require = require(`${path}${fileName}`)
            let command = new commandObject(the_require)
        
            list.push({
                fileName: fileName,
                require: the_require,
                command: command
            })
        }
    })
    return list
}

function getRequireListOfDirectory(path, ends_with=".js") {
    let list = []
    fs.readdirSync(path).forEach(file => {
        if(file.endsWith(ends_with)) {
            let fileName = file.split(".")
            fileName.pop()
            fileName.join(".")
            //require(`./events/${endpoint_type}/${fileName}`).start(bot, endpoint_type)
            let the_require = require(`${path}${fileName}`)
            list.push({
                fileName: fileName,
                require: the_require
            })
        }
    })
    return list
}


class createJarvis {
    constructor() {

        this._modules = {
            "notifier": notifier,
            "somef": somef,
            "config": config,
            "fs": fs,
            "say": say,
            "child_process": child_process,
            "logger": Logger,
            "path": path
        }
        this._ActionManager = JarvisModules.actionManager(this)
        this._ActionManager.testManager()

        this._infos = {
            name: {
                text: config.ai.name.text,
                tts: config.ai.name.tts
            }
        }

        this._configFile = config
        

        
        this.commands = getCommandRequireListOfDirectory("./brain/commands/", "_cmd.js")
        console.log(this.commands)



    }

    getConfig() { return JSON.parse(JSON.stringify(this._configFile))}

    getInfo(info_name) {
        if(this._infos[info_name] != undefined) return this._infos[info_name]
        else {
            this.throwError("2",`Information not found in _infos: ${info_name}`)
            return "<none>"
        }
    }

    get toast() {
        return {
            "info": (message, sound=true, ...args) => {
                notifier.notify({
                    title: config.ai.name.text,
                    message: message,
                    icon: path.join(rootDirectory, config.notificationCenter.icon), // Absolute path (doesn't work on balloons)
                    sound: sound, // Only Notification Center or Windows Toasters
                
                });
            },
            "test": (message,
                    title       = undefined,
                    subtitle    = undefined,
                    sound       = true,
                    icon        = this.useModule("path").join(rootDirectory, config.notificationCenter.icon),
                    contentImage= undefined,
                    open        = undefined,
                    wait        = false,
                    timeout     = 3,
                    closeLabel  = undefined,
                    actions     = undefined,
                    dropdownLabel= undefined,
                    reply       = false
                ) => {
                
                notifier.notify(
                    {
                      title: title,
                      subtitle: subtitle,
                      message: message,
                      sound: sound, // Case Sensitive string for location of sound file, or use one of macOS' native sounds (see below)
                      icon: icon, // Absolute Path to Triggering Icon
                      contentImage: contentImage, // Absolute Path to Attached Image (Content Image)
                      open: open, // URL to open on Click
                      wait: wait, // Wait for User Action against Notification or times out. Same as timeout = 5 seconds
                  
                      // New in latest version. See `example/macInput.js` for usage
                      timeout: timeout, // Takes precedence over wait if both are defined.
                      closeLabel: closeLabel, // String. Label for cancel button
                      actions: actions, // String | Array<String>. Action label or list of labels in case of dropdown
                      dropdownLabel: dropdownLabel, // String. Label to be used if multiple actions
                      reply: reply // Boolean. If notification should take input. Value passed as third argument in callback and event emitter.
                    },
                    function (error, response, metadata) {
                      console.log(response, metadata);
                    }
                );
            }
        }
    }


    updateModules(globalVar_dict) {
        let updated = 0
        for(let key in globalVar_dict) {
            if(this._modules[key] == undefined) { this._modules[key] = globalVar_dict[key] ; updated++}
        }
        return updated
    }

    useModule(name) {
        if(this._modules[name]) return this._modules[name]
        else return ( (...args) => {
            this.throwError("1", `Module not found: ${name}. Args useds: ${args}`)
        } )
    }

    throwError(errorCode, message) {
        let text = `[!][Jarvis.js][ERROR]: code: ${errorCode} | ${message}`
        Logger.debug(text)
        throw new Error(text)
    }
    throwWarn(errorCode, message) {
        let text = `[!][Jarvis.js][ERROR]: code: ${errorCode} | ${message}`
        Logger.debug(text)
        throw new Error(text)
    }


    recognize(text) {

        let args = text.split(" ")
        let argsLower = text.toLowerCase().split(" ")

        let is_called = somef.any(argsLower, config.ai.callNames, false)
        if(!is_called) return;

        let alreadyExecuted = false;
        for(let commandDatas_i in this.commands) {
            let commandDatas = this.commands[commandDatas_i]
            let commandObject = commandDatas.command
            Logger.debug("Trying to execute:",commandObject)
            let executed = commandObject.execute(text)
            Logger.debug("executed:",executed)
            if(executed.executed) {
                this.tts(executed.answers)
                alreadyExecuted = true
                break;
            }
        }
    }

    tts(pond_list,
        lang    = config.tts.default.lang,
        volume  = config.tts.default.volume,
        rate    = config.tts.default.rate,
        pitch   = config.tts.default.pitch
    ) {
        /* example:
        pond_list = [
            { weight: 1, value: "heyoo" },
            { weight: 1, value: "salut" }
        ]
        lang = "fr-FR"
        volume = 1
        rate = 1
        pitch = 0
        */
        
        let text = "erreur"

        let list = []
        for(let key in pond_list) {
            for(let i=0;i<pond_list[key].weight;i++) { list.push(pond_list[key].value) }
        }
        text = somef.choice(list)

        Logger.debug(`[TTS()] > list of ${pond_list.length} items. Saying: ${text}`)

        //say.speak(text)
        
        this.useModule("socketIO").emit("say_tts", {
            "text": text,
            "lang": lang,
            "volume": volume,
            "rate": rate,
            "pitch": pitch,
        })
    }

}


let JarvisInstance = new createJarvis()

module.exports = JarvisInstance

/*
module.exports.init = (var_dict) => {
    // var_dict = {
    //     "io": io // la variable qui contient l'objet de socket, etc..
    // }
    
    Logger.debug("Init()", var_dict)
    for(let key in var_dict) {
        GlobalVars[key] = var_dict[key]
    }
}
*/

/*
let voiceName = "paul"
say.speak("Luke, I am your father", voiceName, 0.75 , (err) => {
    if (err) {
        return console.error(err);
    }

    console.log(`Text with the voice ${voice}`);
});
*/
/*
const gTTS = require('gtts');
var player = require('play-sound')(opts = {})


say.speak("test de voix","Sebastien_Full_22kHz")

var speech = 'Bienvenue à Geek pour Geek';
var gtts = new gTTS(speech, 'fr');



gtts.save('Voice.mp3', function (err, result){
    if(err) { throw new Error(err); }
    console.log("Text to speech converted!");
});


var speech = 'Bienvenue 2ahahah';
var gtts = new gTTS(speech, 'fr');
  
gtts.save('Voice2.mp3', function (err, result){
    if(err) { throw new Error(err); }
    console.log("Text to speech converted! 2");
    player.play('./Voice.mp3', function(err){
        if (err) console.log(err)
      })
});

*/



let tts = (pond_list,
        lang    = config.tts.default.lang,
        volume  = config.tts.default.volume,
        rate    = config.tts.default.rate,
        pitch   = config.tts.default.pitch
    ) => {
    /* example:
    pond_list = [
        { weight: 1, value: "heyoo" },
        { weight: 1, value: "salut" }
    ]
    lang = "fr-FR"
    volume = 1
    rate = 1
    pitch = 0
    */
    
    let text = "erreur"

    let list = []
    for(let key in pond_list) {
        for(let i=0;i<pond_list[key].weight;i++) { list.push(pond_list[key].value) }
    }
    text = somef.choice(list)

    Logger.debug(`[TTS()] > list of ${pond_list.length} items. Saying: ${text}`)

    //say.speak(text)
    
    GlobalVars["io"].emit("say_tts", {
        "text": text,
        "lang": lang,
        "volume": volume,
        "rate": rate,
        "pitch": pitch,
    })
    
}

let doAction = (text) => {
    let args = text.split(" ")
    /*
    commandes dans le dossiers ./commands/
    avec dans chaque fichier une description de l'appel de la commande
    */

    if(!somef.any(args, config.ai.callNames)) return;

    if(somef.any(args, ["ordinateur","ordi","pc","pécé"])) {
        if(somef.any(args, ["veille"])) {
            tts("")
        }
    }
}


let recognize = (text) => {

    let args = text.split(" ")
    let argsLower = text.toLowerCase().split(" ")


    /*
    commandes dans le dossiers ./commands/
    avec dans chaque fichier une description de l'appel de la commande
    */

    /*

    Logger.debug("0")
    if(!somef.any(argsLower, config.ai.callNames)) return;
    Logger.debug("0.5")

    if(somef.any(argsLower, ["l'ordi","l'ordinateur","ordinateur","ordi","pc","pécé"])) {
        Logger.debug("1")
        if(somef.any(argsLower, ["veille"])) {
            Logger.debug("2")
            if(somef.any(argsLower, ["mets","mettre","place","passe","remet","remets","remettre"])) {
                Logger.debug("3")
                Logger.debug(`Passage de l'ordinateur en mode veille.`)
                tts([
                    { weight: 5, value: "Je mets l'ordinateur en mode veille" },
                    { weight: 4, value: "Je mets l'ordinateur en veille" },
                    { weight: 3, value: "Je passe l'ordinateur en mode veille" },
                    { weight: 2, value: "Je passe l'ordinateur en veille" },
                    { weight: 1, value: "Très bien, je le mets en veille" },
                    { weight: 1, value: "Très bien. A tout à l'heure monsieur" },
                    { weight: 1, value: "Passage de l'ordinateur en mode veille" },
                    { weight: 1, value: "L'ordinateur entre en veille" }
                ])
            }
        }
    }
    */

    let alreadyExecuted = false

    fs.readdirSync(`./commands`).forEach(file => {
        if(file.endsWith("_cmd.js") && !alreadyExecuted) {
            let fileName = file.split(".")
            fileName.pop()
            fileName.join(".")
            //require(`./events/${endpoint_type}/${fileName}`).start(bot, endpoint_type)
            let the_require = require(`./commands/${fileName}`)
            let command = new commandObject(the_require)
            let executed = command.execute(text)
            if(executed.executed) {
                tts(executed.answers)
                alreadyExecuted = true
            }
        }
    })
    


}

/*
module.exports = {
    "infos": infos,
    "init": init,
    "configuration": configuration,
    "rules": rules
}
*/


function protocol(protocolName, protocolAction) {

}