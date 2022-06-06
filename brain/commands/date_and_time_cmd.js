/**
 * Savoir la date et/ou l'heure
 * 
 */

let infos = {
    description: "Savoir la date et/ou l'heure",
    actions: [
        "donner la date", "donner l'heure"
    ],
    version: "1.0.0"
}

let configuration = [
    {
        id: 1,
        optionnal: false,
        content: ["quelle","quel"],
        match: "any",
        caseSensitive: false
    },
    {
        id: 2,
        optionnal: false,
        content: ["heure"],
        match: "any",
        caseSensitive: false
    },
    {
        id: 3,
        optionnal: false,
        content: ["jour","jours","mois","année",'annee',"moi","date","aujourd'hui","d'aujourd'hui"],
        match: "any",
        caseSensitive: false
    },
    {
        id: 4,
        optionnal: false,
        content: ["est","donne","donne-moi"],
        match: "any",
        caseSensitive: false
    },
    {
        id: 5,
        optionnal: false,
        content: ["combien","est","on"],
        match: "all",
        caseSensitive: false
    },

]

let rules = [
    {
        configuration: [
            [1,2,4]
        ],
        answers: [
            { weight: 5, value: `Il est actuellement ${(new Date()).getHours()}h${(new Date()).getMinutes()}` },
            { weight: 4, value: `Il est actuellement ${(new Date()).getHours()}h${(new Date()).getMinutes()}` },
            { weight: 2, value: `Il est actuellement ${(new Date()).getHours()}h${(new Date()).getMinutes()}` },
            { weight: 2, value: `Il est actuellement ${(new Date()).getHours()}h${(new Date()).getMinutes()}` }
        ],
        function: (Jarvis) => {

            let pond_list = [
            ]

            Jarvis.tts(pond_list,
                lang    = Jarvis.useModule("config").tts.default.lang,
                volume  = Jarvis.useModule("config").tts.default.volume,
                rate    = Jarvis.useModule("config").tts.default.rate,
                pitch   = Jarvis.useModule("config").tts.default.pitch
            )

        }
    },
    {
        configuration: [
            [5],
            [1,3,4]
        ],
        answers: [
        ],
        function: (Jarvis) => {

            let isYear = (Math.floor(Math.random()*2) == 1)

            let date = Jarvis.useModule("somef").formatDate(Date.now(), `le DD MMMMM${isYear ? " YYYY" :""}`)
            let date_with_dayname = Jarvis.useModule("somef").formatDate(Date.now(), `DDDDD DD MMMMM${isYear ? " YYYY" :""}`)
            
            let dayName = (num) => { return ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"][num] }

            let pond_list = [
                { weight: 5, value: `Nous sommes ${date_with_dayname}` },
                { weight: 2, value: `Nous sommes ${date} monsieur` },
                { weight: 3, value: `Aujourd'hui nous sommes ${date_with_dayname}` },
                { weight: 2, value: `La date d'aujourd'hui est ${date_with_dayname}` },
                { weight: 2, value: `Nous sommes ${date} monsieur` },
                { weight: 2, value: `Nous sommes ${date}` },
            ]
            
            Jarvis.tts(pond_list,
                lang    = Jarvis.useModule("config").tts.default.lang,
                volume  = Jarvis.useModule("config").tts.default.volume,
                rate    = Jarvis.useModule("config").tts.default.rate,
                pitch   = Jarvis.useModule("config").tts.default.pitch
            )
        }
    },
    {
        configuration: [
            [1,4],
        ],
        answers: [
            { weight: 5, value: "J'arrête l'ordinateur" },
            { weight: 4, value: "j'éteins l'ordinateur" },
            { weight: 3, value: "Au revoir monsieur" },
            { weight: 2, value: "Très bien, j'arrête l'ordi" },
            { weight: 1, value: "Extinction de l'ordinateur" },
            { weight: 1, value: "Arrêt de l'ordinateur" }
        ],
        function: (Jarvis) => {
            Jarvis.useModule("child_process").exec(`shutdown -s -t 30 -d P:0:0 /c "[JARVIS]: Action demandée par l'utilisateur: Arrêt."`)
            setTimeout(() => { Jarvis.toast.test("Arrêt de l'ordinateur dans 5 secondes") }, 25*1000)
        }
    },
    {
        configuration: [
            [1,5],
        ],
        answers: [
            { weight: 5, value: "Je redémarre l'ordinateur" },
            { weight: 4, value: "D'accord je redémarre l'ordinateur" },
            { weight: 2, value: "A tout de suite monsieur" },
            { weight: 2, value: "Redémarrage de l'ordinateur" },
            { weight: 1, value: "Je lance le redémarrage de l'ordinateur" },
            { weight: 1, value: "L'ordinateur va redémarrer" },
            { weight: 1, value: "L'ordinateur redémarre" }
        ],
        function: (Jarvis) => {
            Jarvis.useModule("child_process").exec(`shutdown -r -t 30 -d P:0:0 /c "[JARVIS]: Action demandée par l'utilisateur: Redémarrage."`)
            setTimeout(() => { Jarvis.toast.test("Redémarrage de l'ordinateur dans 5 secondes") }, 25*1000)
        }
    }
]

module.exports = {
    "infos": infos,
    "configuration": configuration,
    "rules": rules
}