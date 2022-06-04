# Informations
I AM FRENCH, so code and the supposed use are both in french.
Then why i write the README.md file in english ? Well idk too..

# Installation
just run the index.js lol

# Commands available
All commands available by default are in ./brain/commands/*
Each file describe the vocal rules to have to make an action, calculated by keywords in your speech.

Example of rules & configuration:
```js

let configuration = [
    {
        id: 1,
        optionnal: false, // this line is 100% useless lol. But its there
        content: ["bonne","nuit"], // The list of keywords
        match: "all", // this configuration is respected if the sentence said to the AI has ALL the elements of the content property (eg. "Bonne nuit Jarvis !")
        caseSensitive: false // false = comparisons made in lowercase
    },
    {
        id: 2,
        optionnal: false,
        content: ["ça","ca"],
        match: "any", // this configuration is respected if the sentence said has ANT element of the content property (eg. "Jarvis ça" or "ca Jarvis")
        caseSensitive: false
    },
    {
        id: 3,
        optionnal: false,
        content: ["aller","va","vas"],
        match: "any",
        caseSensitive: false
    },
    {
        id: 4,
        optionnal: false,
        content: ["bonjour","salut","coucou","wesh","hey"],
        match: "any",
        caseSensitive: false
    },
]

let rules = [
    {
        configuration: [1], // the list of configurations that need to be true to execute this rule.
        answers: [ // Anwsers that the AI can answer. Adding a weight make the sentence more chances to be used.
            { weight: 5, value: "Très bien. Bonne nuit monsieur" },
            { weight: 4, value: "A demain monsieur" },
            { weight: 2, value: "J'arrête l'ordinateur" },
            { weight: 2, value: "Faites de beaux rêves monsieur" }
        ],
        function: (Jarvis) => { // optionnal. The function executed when this rule is respected
            Jarvis.useModule("child_process").exec(`nul && shutdown -s -30`)
            setTimeout(() => { Jarvis.toast.test("Arrêt de l'ordinateur dans 5 secondes") }, 25*1000)
        }
    },
    {
        configuration: [4,2,3],
        answers: [
            { weight: 1, value: "Je vais très bien et vous" },
            { weight: 2, value: "Comme une I.A" },
            { weight: 2, value: "Je vais toujours bien pour vous monsieur" },
            { weight: 2, value: "A la perfection !" },
            { weight: 1, value: "Parfaitement bien et vous ?" }
        ],
        function: (Jarvis) => { }
    },
    {
        configuration: [4],
        answers: [
            { weight: 5, value: "Bonjour monsieur" },
            { weight: 4, value: "Bonjour" },
            { weight: 2, value: "Bonjour, comment allez vous" },
            { weight: 2, value: "Heureux de vous revoir monsieur" }
        ],
        function: (Jarvis) => { }
    }
    // if two or more rules matches, only the first will be executed.
]
```
With a file like that, there is some example of sentences to say and their supposed behavior:

- `**Salut** Jarvis **ça va** ?`         : rule 2  
- `**Bonjour** Jarvis tu **vas** bien`   : rule 3  
- `**Hey** Jarvis **ça va** ?`           : rule 2  
- `**Bonjour** Jarvis **ça va** ?`       : rule 2  
- `Jarvis **ça va** ?`                   : nothing  
- `Jarvis tu **vas** bien ?`             : nothing  
- `Jarvis comment **vas** tu ?`          : nothing  
- `**Wesh** Jarvis comment **vas** tu ?` : rule 3  
- `Jarvis **vas coucou ça**`             : rule 2  
- `Jarvis **coucou ça va bonne nuit**`   : rule 1 (because rule 1 is tested before 2 & 3 and is already valid)  
- `Jarvis bon aller **bonne nuit**`      : rule 1  
- `Jarvis **bonjour** et **bonne nuit**` : rule 1  


