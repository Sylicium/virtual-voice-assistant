module.exports = {
    server: {
        port: 1111
    },
    ai: {
        name: {
            text: "T.A.U.",
            tts: "tao"
        },
        callNames: [
            "tao", "jarvis", "sarah" // minuscule
        ]
    },
    notificationCenter: {
        icon: "./src/img/jarvis_triangle_only.ico",
        title: "T.A.U."
    },
    trayMenu: {
        icon: "./src/img/jarvis_triangle_only.ico",
        items: [
            {
                id: 1,
                title: "Lock computer",
                "function": () => {

                }
            },
            {
                id: 2,
                title: 'Open I.A. folder',
            },
            {
                id: 3,
                title: '---',
            },
            {
                id: 99,
                title: 'Exit',
            },
        ]
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