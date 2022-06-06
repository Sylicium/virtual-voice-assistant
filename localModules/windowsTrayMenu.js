
let config = require("../config")
const openExplorer = require('open-file-explorer');
const EventEmitter = require('events').EventEmitter;
const NodeTray = require("../node_modules/windows-tray/build/Release/tray").NodeTray
const util = require('util')
util.inherits(NodeTray, EventEmitter)
let path = require("path");
const JarvisInstance = require("../jarvis");
let Logger = require("./logger")()

let rootDirectory = path.join(__dirname, "../")

let Jarvis;
Logger.debug("Starting windowsTrayMenu")
module.exports.start = (jarvis) => {
    Logger.debug("Initializing windowsTrayMenu")
    Jarvis = jarvis
    
    process.title = config.ai.name.text;

    /******************************/
    /* Juste change this variable to change menu. */
    /******************************/

    let trayMenu = [
        {
            //id: 1, IDs are automatically generated with the position in list of the item
            title: "Lock computer",
            function: () => {
                //tray.balloon(process.title, "Je verrouille l'ordinateur", 3000);
                Jarvis.toast.info("Verrouillage de l'ordinateur..")
            }
        },
        {
            title: 'Open I.A. folder',
            function: () => {
                Logger.debug("opening",rootDirectory)
                Jarvis.useModule("child_process").exec(`start "" "${rootDirectory}"`)
                /*
                openExplorer(`${rootDirectory}`, err => {
                    if(err) { Logger.error(err); }
                    else {
                        //Do Something
                    }
                });
                */
            }
        },
        {
            title: `Relancer ${Jarvis.getInfo("name").text}`,
            function: () => {
                Logger.debug("opening",rootDirectory)
                Jarvis.useModule("child_process").exec(`start "" "${path.join(rootDirectory,"./index.js")}"`)
                setTimeout(() => {
                    shutdown()
                }, 200)
                /*
                openExplorer(`${rootDirectory}`, err => {
                    if(err) { Logger.error(err); }
                    else {
                        //Do Something
                    }
                });
                */
            }
        },
        {
            title: '---', // this text make the separator
            separator: true // this is for my code the be sure its a separator
        },
        {
            title: 'Exit',
            function: () => {
                tray.balloon(process.title, `Désactivation de ${Jarvis.getInfo("name").text}`, 1000);
                shutdown();
            }
        },
    ];

    /******************************/
    /******************************/
    /******************************/


    function* genID_f() {
        let i = 0
        while(true) {
            i++
            yield i
        }
    }
    let genID = genID_f()

    trayMenu = trayMenu.map(x => { x.id = genID.next().value; return x })


    Logger.debug("path.join(rootDirectory, './src/img/jarvis_triangle_only.ico')",path.join(rootDirectory, "./src/img/jarvis_triangle_only.ico"))
    const tray = new NodeTray(path.join(rootDirectory, "./src/img/jarvis_triangle_only.ico"))
    tray.setToolTip(process.title);

    tray.on('click', () => {

        let result = tray.toggleWindow(process.title);
        Logger.debug("click, result = ", result);

    })
    tray.on('right-click', () => {

        // Logger.debug("right-click");

        tray.showPopup(trayMenu, function (err, result) {

            Logger.debug('error:', err);
            Logger.debug('result:', result);

            let item = trayMenu.filter(x => (x.id == result && !x.separator))
            if(item.length >= 1) {
                if(item[0].function) item[0].function()
            }

        });

    })
    tray.on('balloon-click', () => {

        Logger.debug('balloon-click')

    })

    setInterval(function () {

        // Logger.debug('Window Visibility: ', tray.isWindowVisible(process.title));
        // Logger.debug('Window Minimized: ', tray.isWindowMinimized(process.title));

        if (tray.isWindowMinimized(process.title) == true)
        {
            tray.toggleWindow(process.title);

            tray.balloon(process.title, 'Will continue in background', 5000);
            return;
        }

        // Logger.debug('In background');

    }, 1000)

    // tray.on("double-click", () => {
    // 	tray.destroy()
    // 	process.exit(0)
    // })

    var SHUTDOWN_EVENTS = [
        'exit',
        'SIGINT',
        'SIGUSR1',
        'SIGUSR2',
        'SIGTERM',
        'uncaughtException',
    ];

    var onShutdown = function (cb) {

        for (let i = 0; i < SHUTDOWN_EVENTS.length; i++)
        {
            let event = SHUTDOWN_EVENTS[i];
            process.on(event, cb);
        }

    };

    var shutdown = function() {
        Logger.info('Destroying all application!');
        tray.destroy();
        process.exit(0);
    }

    onShutdown(shutdown);

}