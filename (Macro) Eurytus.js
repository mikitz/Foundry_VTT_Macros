let targets = game.user.targets;
let s_actor = canvas.tokens.controlled[0]?.actor || game.user.character;
let extraDamage = 0;
let dexMod = token.actor.data.data.abilities.dex.mod
let prof = token.actor.data.data.attributes.prof
let toHit = new Roll(`1d20 + ${dexMod} + ${prof} + 1`).roll().total
let damageDice = `1d8 + ${dexMod} + 1`

function printMessage(message){
	let chatData = {
	    user : game.user._id,
	    content : message,
	};
	ChatMessage.create(chatData,{});
}

targets.forEach(target => {
    let size = target.actor.data.data.traits.size?.toLocaleLowerCase();
    let ac = target.actor.data.data.attributes.ac.value
    let name = target.actor.data.name?.toLocaleLowerCase();

    if (toHit >= ac) {
        if (size == 'lg') extraDamage = `1d6`;
        new Roll(`${damageDice} + ${extraDamage}`).roll().toMessage({ flavor: `${actor.name} fires a Eurytus bolt towards the ${name} striking flesh!`, speaker })
    } else {
        printMessage(`${actor.name} fires an Eurytus bolt towards the ${name} and it dodges out of the way!`)
    }
    
    console.log(`${name}'s AC: ${ac}
                To Hit: ${toHit}`)
})