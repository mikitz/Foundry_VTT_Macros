function isOdd (n) {
    return !!(n % 2)
}

let level = token.actor.data.data.details.level

if (isOdd(level) == false) {
    new Roll(`(${level}/2)d6`).roll().toMessage({ flavor: `${actor.name} sneakily attacks ${name}!`, speaker })
} else {
    new Roll(`((${level}+1)/2)d6`).roll().toMessage({ flavor: `${actor.name} sneakily attacks ${name}!`, speaker })
}
