let medSkill = token.actor.data.data.skills.med.mod
let targets = game.user.targets;

function printMessage(message){
	let chatData = {
	    user : game.user._id,
	    content : message,
	};
	ChatMessage.create(chatData,{});
}

function fRound5(x) { 
    return Math.ceil(x / 5) * 5
} 

function fRound10(x) { 
    return Math.ceil(x / 10) * 10 
} 

targets.forEach(target => {
    let type = target.actor.data.data.details.type?.toLocaleLowerCase();
    let name = target.actor.data.name?.toLocaleLowerCase();
    let health_current = target.actor.data.data.attributes.hp.value;
    let health_max = target.actor.data.data.attributes.hp.max;
    let health_percent = health_current / health_max;
    let die = new Roll(`1d20`, {}).roll().total;
    let roll = die + medSkill;
    var hp = null
    var hp_low = null

    if (die == 1) {
        printMessage(`${actor.name} examines the ${name} from a distance and determines it hasn't been hit at all...`);
        // No idea LOL
    } else if (die == 20) {
        hp = health_percent.toFixed(1);
        printMessage(`${actor.name} examines the ${name} from a distance and determines its health is at ${parseFloat(hp*100)+"%"}!`);
        // Exact percentage
    } else if (roll <= 4) {
        printMessage(`${actor.name} examines the ${name} from a distance and determines it has health and might be injured...`);
        // No idea LOL
    } else if (roll >= 5 && roll <= 9) {
        // 50% range
        if (health_percent >= .5) {
            printMessage(`${actor.name} examines the ${name} from a distance and determines its health is between 50% and 100%!`);
        } else {
            printMessage(`${actor.name} examines the ${name} from a distance and determines its health is between 0% and 50%!`);
        }
    } else if (roll >= 10 && roll <= 14) { 
        // 25% range
        if (health_percent <= .25) {
            printMessage(`${actor.name} examines the ${name} from a distance and determines its health is between 0% and 25%!`);
        } else if (health_percent <= .50) {
            printMessage(`${actor.name} examines the ${name} from a distance and determines its health is between 25% and 50%!`);
        } else if (health_percent <= .75) {
            printMessage(`${actor.name} examines the ${name} from a distance and determines its health is between 50% and 75%!`);
        } else {
            printMessage(`${actor.name} examines the ${name} from a distance and determines its health is between 75% and 100%!`);
        }
    } else if (roll >= 15 && roll <= 19) { 
        // 10% range
        hp = fRound10(health_percent*100)
        if (hp <= 10) {
            hp_low = 0
        } else {
            hp_low = hp - 10
        }
        printMessage(`${actor.name} examines the ${name} from a distance and determines its health is between ${parseFloat(hp_low)+"%"} and ${parseFloat(hp)+"%"}!`);
    } else if (roll >= 20 && roll <= 24) {
        // 5% range
        hp = fRound5(health_percent*100)
        if (hp <= 10) {
            hp_low = 0
        } else {
            hp_low = hp - 5
        }
        printMessage(`${actor.name} examines the ${name} from a distance and determines its health is between ${parseFloat(hp_low)+"%"} and ${parseFloat(hp)+"%"}!`);
    } else if (roll >= 25) {
        hp = health_percent.toFixed(1);
        printMessage(`${actor.name} examines the ${name} from a distance and determines its health is at ${parseFloat(hp*100)+"%"}!`);
        // Exact percentage
    }
    console.log(`MEDICINE CHECK LOG
                HP: ${hp}
                HP Low: ${hp_low}
                Health Percent: ${health_percent}
                Check: ${die}
                Medicine Check: ${roll}`);
})