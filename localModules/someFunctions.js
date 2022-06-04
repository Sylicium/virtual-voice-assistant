


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


/**
 * Renvoie une chaine de caractère aléatoire de longueur donnée et parmis les caractères donnés
 * @param {Number} len Longueur de la chaine
 * @param {String} charSet Chaine des caractères à utiliser / nom de préconfig
 */
module.exports.randomString = randomString
function randomString(len, charSet) {
    if(!charSet) {
        charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    } else if(typeof charSet == "object" && charSet.length) {
        charSet = charSet.join("")
    } else if(typeof charSet == "string") {
        if(charSet == "hex") charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        else if(charSet == "decimal") charSet = '0123456789'
        else if(charSet == "lowercase") charSet = 'abcdefghijklmnopqrstuvwxyz'
        else if(charSet == "uppercase") charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        else if(charSet == "letters") charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        else if(charSet == "base62") charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        else if(charSet == "base64") charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
        else if(charSet == "base64url") charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+_'
    }
    console.log(charSet, typeof charSet)
    //charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }       
    return randomString;
}