const type = game.tables.entities.find(t => t.name === "Ship Type").roll().results[0].text;
const purpose = game.tables.entities.find(t => t.name === "Ship Purpose").roll().results[0].text;
const adj = game.tables.entities.find(t => t.name === "Ship Adj").roll().results[0].text;
const noun = game.tables.entities.find(t => t.name === "Ship Noun").roll().results[0].text;
const poc = game.tables.entities.find(t => t.name === "Ship Port o' Call").roll().results[0].text;
const tableHour1 = game.tables.getName("(Shift) Hour").roll().results[0].text;
const tableHour2 = game.tables.getName("(Shift) Hour").roll().results[0].text;

let messageTable = `<h2>RANDOM SHIP</h2>
                    <p><b>Type:</b> ${type}</p> 
                    <p><b>Purpose:</b> ${purpose}</p>
                    <p><b>Name:</b> ${adj} ${noun} </p>
                    <p><b>Port of Call:</b> ${poc}</p>
                    <p><b>Encounter Hour:</b> ${tableHour1}`

let chatData = {
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: messageTable,
    whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
};
ChatMessage.create(chatData, {});