
const config = require("./config")
const somef = require("./localModules/someFunctions");

var bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const serv = require('http').createServer(app);
const io = require('socket.io')(serv);

const fs = require("fs");
const axios = require('axios')
const fetch = require('node-fetch');
const Logger = require("./localModules/logger")()

const Jarvis = require("./jarvis")
Jarvis.updateModules({
    "socketIO":io
})


let say = require("say")


module.exports.start = () => {

    let apiEvents = {}

    /*
    Logger.info("Chargement des fichiers API") 
    fs.readdirSync("./server/api/events").forEach(endpoint_type => {
        endpoint_type = endpoint_type.toUpperCase()
        if(!apiEvents[endpoint_type]) apiEvents[endpoint_type] = {}
        fs.readdirSync(`./server/api/events/${endpoint_type}`).forEach(file => {
            if(file.endsWith(".js")) {
                let fileName = file.split(".")
                fileName.pop()
                fileName.join(".")
                //require(`./events/${endpoint_type}/${fileName}`).start(bot, endpoint_type)
                let the_require = require(`./server/api/events/${endpoint_type}/${fileName}`)
                apiEvents[endpoint_type][fileName] = the_require
                Logger.info(`[API] Loaded endpoint ${endpoint_type} /api/${fileName}`)
            }
        })
    });
    // let allEvents = [...Object.keys(apiEvents)]
    Logger.log(apiEvents)

    app.all("/api/*", (req, res) => {
        Logger.log(`[API] (${req.method}) ${req.url}`)
        let last_endpoint = req.url.substr(5,req.url.length)
        if(apiEvents[req.method] && apiEvents[req.method][last_endpoint]) {
            apiEvents[req.method][last_endpoint].onEvent(req,res)
            return;
        } else {
            res.send({
                status: 200
            })
        }
    })

    app.get("*", (req, res) => {
        if(req.url.startsWith("/api/")) return;
        res.send("coucou")

    })
    */

    app.get("/tts/*", (req, res) => {
        Logger.debug("got url:",req.url)
        Logger.debug("the query:",req.query.text)
        say.speak(req.query.text)
        res.send({
            status: 200,
            ok: true
        })
    })

    app.all("/stt/", (req, res) => {
        Logger.debug("got url:",req.url)
        Logger.debug("the query:",req.query)
        
        Jarvis.recognize(req.query.recognized)

        res.send({
            status: 200,
            ok: true
        })
        
    })

    app.get("/", (req, res) => {
        res.sendFile(`${__dirname}/site/index.html`)
    })


    

    io.on('connection', (socket) => {
        Logger.log(`[sock][+] [${socket.id}] Connected.`)

        socket.emit("annyang_setLanguage", {
            language: config.stt.annyangLanguage
        })


        socket.on('disconnect', (socket) => {
            Logger.log(`[sock][-] [${socket.id}] Disconnected.`)
        })

        socket.on("Logger", async datas => {

        })

    })


    serv.listen(config.server.port, () => {
        Logger.info(`Serveur démarré sur le port ${config.server.port}`)
    })



}
