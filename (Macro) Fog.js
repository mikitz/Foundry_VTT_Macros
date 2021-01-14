const tFog = game.tables.getName("Normal Fog").roll().results[0].text;
const tEldritch = game.tables.getName("(Fog) Eldritch Mist").roll().results[0].text;
const tThick = game.tables.getName("(Fog) Mist Thickness").roll().results[0].text;

let message = ``

let die = new Roll("1d6", {}).roll().total;
console.log(`Roll: ${die}`);
if (die == 6) {
    message += `<p>${tEldritch}</p>
                <p>${tThick}</p>`
} else {
    message += `${tFog}`
}

let chatData = {
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: message,
    whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
};
ChatMessage.create(chatData, {});

