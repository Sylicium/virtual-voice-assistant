
let infos = {
    description: "Gérer le volume sonore de l'ordinateur",
    actions: [
        "baisser le son", "monter le son", "définir le son", "couper/reprendre le son"
    ],
    version: "1.0.0"
}

let configuration = [
    {
        id: 1,
        optionnal: false,
        content: ["monte","monter","augmenter","augmente"],
        match: "any",
        caseSensitive: false
    },
    {
        id: 2,
        optionnal: false,
        content: ["baisse","baisser","diminue","diminuer"],
        match: "any",
        caseSensitive: false
    },
    {
        id: 3,
        optionnal: false,
        content: ["volume","son","musique"],
        match: "any",
        caseSensitive: false
    },
    {
        id: 4,
        optionnal: false,
        content: ["mets","met","définit","règle","regle","règles"],
        match: "any",
        caseSensitive: false
    },
    {
        id: 5,
        optionnal: false,
        content: ["sur","à","a"],
        match: "any",
        caseSensitive: false
    }
]

let rules = [
    {
        configuration: [[1,2,4]],
        answers: [
            { weight: 5, value: "Il est actuellement 22h07" },
            { weight: 4, value: "Il est actuellement 22h07" },
            { weight: 2, value: "Il est actuellement 22h07" },
            { weight: 2, value: "Il est actuellement 22h07" }
        ],
        function: (Jarvis) => {
        }
    },
    {
        configuration: [[1,3,4]],
        answers: [
            { weight: 5, value: "Il est actuellement 22h07" },
            { weight: 4, value: "Il est actuellement 22h07" },
            { weight: 2, value: "Il est actuellement 22h07" },
            { weight: 2, value: "Il est actuellement 22h07" }
        ],
        function: (Jarvis) => {
        }
    },
    {
        configuration: [[1,4]],
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
        configuration: [[1,5]],
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