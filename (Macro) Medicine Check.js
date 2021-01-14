let medSkill = token.actor.data.data.skills.med.mod
let targets = game.user.targets;

function printMessage(message){
	let chatData = {
	    user : game.user._id,
	    content : message,
	};
	ChatMessage.create(chatData,{});
}

targets.forEach(target => {
    let type = target.actor.data.data.details.type?.toLocaleLowerCase();
    let name = target.actor.data.name?.toLocaleLowerCase();
    let health_current = target.actor.data.data.attributes.hp.value;
    let health_max = target.actor.data.data.attributes.hp.max;
    let health_percent = health_current / health_max;
    let die = new Roll(`1d20`, {}).roll().total;
    let roll = die + medSkill;

    console.log(
        `Health Percent: ${health_percent}
        Medicine Check: ${roll}`);

    if (die == 1) {
        printMessage(`${actor.name} examines the ${name} from a distance and determines it hasn't been hit at all...`);
        // No idea LOL
    } else if (die == 20) {
        var hp = health_percent.toFixed(1);
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
        var hp = health_percent.toFixed(1);
        var hp_low = hp - 0.1
        printMessage(`${actor.name} examines the ${name} from a distance and determines its health is between ${parseFloat(hp_low*100)+"%"} and ${parseFloat(hp*100)+"%"}!`);
    } else if (roll >= 20 && roll <= 24) {
        // 5% range
        var hp = health_percent.toFixed(2);
        var hp_low = hp - 0.05
        printMessage(`${actor.name} examines the ${name} from a distance and determines its health is between ${parseFloat(hp_low*100)+"%"} and ${parseFloat(hp*100)+"%"}!`);
    } else if (roll >= 25) {
        var hp = health_percent.toFixed(1);
        printMessage(`${actor.name} examines the ${name} from a distance and determines its health is at ${parseFloat(hp*100)+"%"}!`);
        // Exact percentage
    }
})