let toHit = new Roll(`1d20`).roll().toMessage({ flavor: `${actor.name} swings their weapon to attack!`, speaker })
let dmg = new Roll(`5d6`).roll().toMessage({ flavor: `${actor.name} deals damage to their target`, speaker })
