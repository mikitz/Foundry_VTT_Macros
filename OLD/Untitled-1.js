const tableHour1 = game.tables.getName("(Shift) Hour").roll().results[0].text;
const tableHazard = game.tables.getName("Hazard Type").roll().results[0].text;
const tableHour2 = game.tables.getName("(Shift) Hour").roll().results[0].text;
const tableSeaEncounter0 = game.tables.getName("Sea (Levels 1-4)").roll().results[0].text;

let messageTable = "<b><h2>DAYTIME (W/O LAND):</h2></b><p>" + "<b>Hazard Hour: </b>" + tableHour1 + "<p>" + "<b>Hazard: </b>" + tableHazard + "<p>" + "<b>Encounter Hour: </b>" + tableHour2 + "<p>" + "<b>Encounter: </b>" + tableSeaEncounter0 

let chatData = {
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: messageTable,
    whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
};
ChatMessage.create(chatData, {});