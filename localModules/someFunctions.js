


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


/**
 * Renvoie une chaine de caractère de date formatée à partir du timestamp fournit
 * @param {Float32Array} timestamp Timestamp à convertir
 * @param {String} format String de la date qui sera retourné
 */
module.exports.formatDate = formatDate
function formatDate(timestamp, format) {
    /*
    YYYY: year
    MM: month
    MMMMM: month
    DDDDD: jour de la semaine
    DD: day
    hh: heure
    mm: minute
    ss: seconde
    */
    let la_date = new Date(timestamp)
    function formatThis(thing, length=2) {
        return `0000${thing}`.substr(-2)
    }

    function getMonthName() {
        return ["Janvier","Février","Mars","Avril","Mais","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"][la_date.getMonth()]
    }

    function getDayName() {
        let list = [
            "lundi",
            "mardi",
            "mercredi",
            "jeudi",
            "vendredi",
            "samedi",
            "dimanche"
        ]
        return list[(la_date.getDay()-1 < 0 ? (la_date.getDay()-1+7) : (la_date.getDay()-1))]
    }

    let return_string = format.replace("YYYY", la_date.getFullYear()).replace("MMMMM", getMonthName()).replace("MM", formatThis(la_date.getMonth()+1)).replace("DDDDD", getDayName()).replace("DD", formatThis(la_date.getDate())).replace("hh", formatThis(la_date.getHours())).replace("mm", formatThis(la_date.getMinutes())).replace("ss", formatThis(la_date.getSeconds()))

    return return_string
}


/**
 * Renvoie une chaine de caractère du temps formatée à partir de la durée en milliseconde fournie
 * @param {Float32Array} millisecondes Durée en millisecondes à convertir
 * @param {String} format String du temps qui sera retourné
 */
module.exports.formatTime = formatTime
function formatTime(millisecondes, format) {
    /*
    Renvoie un dictionnaire avec le formatage de la durée en ms, en jour, heures, etc...
    YYYY: year
    MM: month
    DDDDD: jour de l'année
    DD: jours du mois
    hh: heure
    mm: minute
    ss: seconde
    */
    let v = {
        y: 31536000000,
        mo: 2628000000,
        d: 86400000,
        h: 3600000,
        m: 60000,
        s: 1000
    }
    let la_date = {
        years: Math.floor(millisecondes/v.y),
        months: Math.floor((millisecondes%v.y)/v.mo), // value de l'année divisée en douze poue faire à peu pres
        all_days: Math.floor(millisecondes/v.d), // jours de l'année
        days: Math.floor(((millisecondes%v.y)%v.mo)/v.d), // jours du mois
        hours: Math.floor((((millisecondes%v.y)%v.mo)%v.d)/v.h),
        minutes: Math.floor(((((millisecondes%v.y)%v.mo)%v.d)%v.h)/v.m),
        seconds: Math.floor((((((millisecondes%v.y)%v.mo)%v.d)%v.h)%v.m)/v.s),
    }
    //console.log(la_date)

    function formatThis(thing, length=2) {
        return `0000${thing}`.substr(-2)
    }

    let return_string = format.replace("YYYY", la_date.years).replace("MM", formatThis(la_date.months)).replace("DDDDD", la_date.all_days).replace("DD", formatThis(la_date.days)).replace("hh", formatThis(la_date.hours)).replace("mm", formatThis(la_date.minutes)).replace("ss", formatThis(la_date.seconds))

    return return_string
}