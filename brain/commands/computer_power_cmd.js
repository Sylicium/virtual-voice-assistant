/**
 * Gérer l'alimentation de l'ordinateur
 * 
 */

let infos = {
    description: "Gérer l'alimentation de l'ordinateur",
    actions: [
        "éteindre l'ordinateur", "mettre l'ordinateur en veille", "redémarrer l'ordinateur"
    ],
    version: "1.0.0"
}

let Global = {
}

function init(config) {
    for(let key in var_dict) {
        Global[key] = var_dict[key]
    }
}

let configuration = [
    {
        id: 1,
        optionnal: false,
        content: ["l'ordi","l'ordinateur","ordinateur","ordi","pc","pécé"],
        match: "any",
        caseSensitive: false
    },
    {
        id: 2,
        optionnal: false,
        content: ["met","mets","mettre","place","passe","remet","remets","remettre"],
        match: "any",
        caseSensitive: false
    },
    {
        id: 3,
        optionnal: false,
        content: ["veille"],
        match: "any",
        caseSensitive: false
    },
    {
        id: 4,
        optionnal: false,
        content: ["éteins","éteindre","arrêter","arreter","stopper","l'éteindre","l'arrêter"],
        match: "any",
        caseSensitive: false
    },
    {
        id: 5,
        optionnal: false,
        content: ["redémarre","relance","redémarrage","redemarrage"],
        match: "any",
        caseSensitive: false
    },
    {
        id: 6,
        optionnal: false,
        content: ["vais","reviens","re","j'arrive","arrive","arriver"],
        match: "any",
        caseSensitive: false
    }
]

let rules = [
    {
        configuration: [[1,2,3,6]],
        answers: [
            { weight: 5, value: "Très bien. A tout à l'heure monsieur" },
            { weight: 4, value: "A tout à l'heure monsieur" },
            { weight: 2, value: "Je passe l'ordinateur en veille" },
            { weight: 2, value: "Je mets l'ordi en veille, aurevoir monsieur" }
        ],
        function: (Jarvis) => {
            Jarvis.useModule("child_process").exec(`ping localhost -n 30>nul && shutdown -h`)
            setTimeout(() => { Jarvis.toast.info("Mise en veille de l'ordinateur dans 5 secondes") }, 25*1000)
        }
    },
    {
        configuration: [[1,2,3]],
        answers: [
            { weight: 5, value: "Je mets l'ordinateur en mode veille" },
            { weight: 4, value: "Je mets l'ordinateur en veille" },
            { weight: 3, value: "Je passe l'ordinateur en mode veille" },
            { weight: 2, value: "Je passe l'ordinateur en veille" },
            { weight: 1, value: "Très bien, je le mets en veille" },
            { weight: 1, value: "Très bien. A tout à l'heure monsieur" },
            { weight: 1, value: "Passage de l'ordinateur en mode veille" },
            { weight: 1, value: "L'ordinateur entre en veille" }
        ],
        function: (Jarvis) => {
            Jarvis.useModule("child_process").exec(`ping localhost -n 30>nul && shutdown -h`)
            setTimeout(() => { Jarvis.toast.info("Mise en veille de l'ordinateur dans 5 secondes") }, 25*1000)
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
            setTimeout(() => { Jarvis.toast.info("Arrêt de l'ordinateur dans 5 secondes") }, 25*1000)
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
            setTimeout(() => { Jarvis.toast.info("Redémarrage de l'ordinateur dans 5 secondes") }, 25*1000)
        }
    }
]

module.exports = {
    "infos": infos,
    //"init": init,
    "configuration": configuration,
    "rules": rules
}