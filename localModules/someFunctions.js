


/**
 * Renvoie true si au moins un element se trouve dans les deux listes
 * @param {Array} list1 La première liste en entrée
 * @param {Array} list2 La seconde liste en entrée
 */
module.exports.any = any
function any(list1, list2, caseSensitive=true) {
    if(!caseSensitive) {
        list1 = list1.map(x => x.toLowerCase())
        list2 = list2.map(x => x.toLowerCase())
    }
    for(let i in list1) {
        if(list2.indexOf(list1[i]) != -1) return true
    }
    return false
}

/**
 * Renvoie true si tous les element de la liste 1 se trouvent dans la liste 2
 * @param {Array} list1 La première liste en entrée
 * @param {Array} list2 La seconde liste en entrée
 */
module.exports.all = all
function all(list1, list2, caseSensitive=true) {
    if(!caseSensitive) {
        list1 = list1.map(x => x.toLowerCase())
        list2 = list1.map(x => x.toLowerCase())
    }
    for(let i in list1) {
        if(list2.indexOf(list1[i]) == -1) return false
    }
    return true
}



/**
 * Renvoie un element aléatoire de la liste
 * @param {Array} list La liste en entrée
 */
module.exports.choice = choice
function choice(list) { return list[Math.floor(Math.random()*list.length)] }

/**
 * Renvoie un nombre entier au hasard entre [min, max[
 * @param {*} min Int minimum
 * @param {*} max Int maximal
 * @returns 
 */
module.exports.randInt = randInt
function randInt(min, max) {
    return Math.floor(Math.random()*(max-min)+min)
}