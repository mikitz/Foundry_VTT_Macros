const tTheme = game.tables.getName("(MI) Theme").roll().results[0].text;
console.log(`Theme: ${tTheme}`)
let tHook = game.tables.getName(`(MI) ${tTheme} - Story Hooks`).roll().results[0].text;
const tableHour1 = game.tables.getName("(Shift) Hour").roll().results[0].text;
const tableHour2 = game.tables.getName("(Shift) Hour").roll().results[0].text;

let messageTable = `<h2>Mysterious Island</h2>
                    <p><b>Theme: </b>${tTheme}</p>
                    <p><b>Dimensions</b></p>
                    <p>Length: [[1d528 * 10]]</p> 
                    <p>Width: [[1d528 * 10]]</p>
                    <p><b>Hook: </b>${tHook}
                    <p><b>Encounter Hour:</b> ${tableHour1}`

if(tTheme == "Alien") {
    let tInhabitants = game.tables.getName(`(MI) ${tTheme} - Island Inhabitants`).roll().results[0].text;
    let tLeader = game.tables.getName(`(MI) ${tTheme} - Island Leader`).roll().results[0].text;
    let tReactions = game.tables.getName(`(MI) ${tTheme} - Inhabitant Reactions`).roll().results[0].text;
    messageTable += `<p><b>Leader: </b>${tLeader}</p>
                     <p><b>Inhabitants: </b>${tInhabitants}</p>
                     <p><b>Inhabitants' Reaction: </b>${tReactions}</p>`
} else if(tTheme == "Cursed") {
    let tInhabitants = game.tables.getName(`(MI) ${tTheme} - Island Inhabitants`).roll().results[0].text;
    let tCurse = game.tables.getName(`(MI) ${tTheme} - Curse`).roll().results[0].text;
    messageTable += `<p><b>Curse: </b>${tCurse}</p>
                     <p><b>Inhabitants: </b>${tInhabitants}</p>`
} else if(tTheme == "Hostile") {
    let tInhabitants = game.tables.getName(`(MI) ${tTheme} - Island Inhabitants`).roll().results[0].text;
    let tLeader = game.tables.getName(`(MI) ${tTheme} - Island Leader`).roll().results[0].text;
    let tMotiv = game.tables.getName(`(MI) ${tTheme} - Leader Motivation`).roll().results[0].text;
    messageTable += `<p><b>Leader: </b>${tLeader}</p>
                     <p><b>Leader Motiv: </b>${tMotiv}</p>
                     <p><b>Inhabitants: </b>${tInhabitants}</p>`
} else if(tTheme == "Sanctum") {
    let tInhabitants = game.tables.getName(`(MI) ${tTheme} - Island Inhabitants`).roll().results[0].text;
    let tLeader = game.tables.getName(`(MI) ${tTheme} - Island Leader`).roll().results[0].text;
    let tReactions = game.tables.getName(`(MI) ${tTheme} - Inhabitant Reactions`).roll().results[0].text;
    messageTable += `<p><b>Leader: </b>${tLeader}</p>
                     <p><b>Inhabitants: </b>${tInhabitants}</p>
                     <p><b>Inhabitants' Reaction: </b>${tReactions}</p>`
} else if(tTheme == "Welcoming") {
    let tInhabitants = game.tables.getName(`(MI) ${tTheme} - Island Inhabitants`).roll().results[0].text;
    let tLeader = game.tables.getName(`(MI) ${tTheme} - Island Leader`).roll().results[0].text;
    messageTable += `<p><b>Leader: </b>${tLeader}</p>
                     <p><b>Inhabitants: </b>${tInhabitants}</p>`
} else if(tTheme == "Wild") {
    let tFeature = game.tables.getName(`(MI) ${tTheme} - Feature`).roll().results[0].text;
    let tEnc= game.tables.getName(`(MI) ${tTheme} - Encounter`).roll().results[0].text;
    messageTable += `<p><b>Feature: </b>${tFeature}</p>
                     <p><b>Encounter: </b>${tEnc}</p>`
}

let chatData = {
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: messageTable,
    whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
};
ChatMessage.create(chatData, {});