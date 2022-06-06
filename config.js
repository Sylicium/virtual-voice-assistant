module.exports = {
    server: {
        port: 1111
    },
    ai: {
        name: {
            text: "Wilfried",
            tts: "tao"
        },
        callNames: [
            "tao", "jarvis", "sarah", "wilfried" // lowercase
        ]
    },
    notificationCenter: {
        icon: "./src/img/jarvis_triangle_only.ico",
        title: "Wilfried: {{title}}"
    },
    trayMenu: { // Tray menu is the little icons you can click on, in the bottom right corner like discord
        icon: "./src/img/jarvis_triangle_only.ico",
        // items: [ ] // Moved to ./localModules/windowsTrayMenu.js
    },
    stt: {
        annyangLanguage: "fr"
    },
    tts: {
        default: {
            lang: "fr-FR",
            volume: 1,
            rate: 1.2,
            pitch: 0
        }
    }
}