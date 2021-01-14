let time = game.Gametime.getTimeString();
let minLevel = Infinity;
const NCenc = game.tables.entities.find(t => t.name === "Forest").roll().results[0].text;
const LVL1to4 = game.tables.entities.find(t => t.name === "Forest (Levels 1-4)").roll().results[0].text;
const LVL5to10 = game.tables.entities.find(t => t.name === "Forest (Levels 5-10)").roll().results[0].text;
const LVL11to16 = game.tables.entities.find(t => t.name === "Forest (Levels 11-16)").roll().results[0].text;
const LVL17to20 = game.tables.entities.find(t => t.name === "Forest (Levels 16-20)").roll().results[0].text;

let messageTable = "<b><h2>ENCOUNTER:</b></h2>" + output;

for(let token of canvas.tokens.placeables) {
  if( token.actor.data.data.details.level >= 1 ) {
    minLevel = Math.min(minLevel, token.actor.data.data.details.level);
  }
}

switch(minLevel) {
    case 1:
    case 2: 
    case 3:
    case 4:       
        let output = LVL1to4;
        let chatData = {
            user: game.user._id,
            speaker: ChatMessage.getSpeaker(),
            content: messageTable,
            whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
        };  
        ChatMessage.create(chatData, {});
        break;
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
        let output = LVL5to10;
        let chatData = {
            user: game.user._id,
            speaker: ChatMessage.getSpeaker(),
            content: messageTable,
            whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
        };  
        ChatMessage.create(chatData, {});
        break;
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
        let output = LVL11to16;
        let chatData = {
            user: game.user._id,
            speaker: ChatMessage.getSpeaker(),
            content: messageTable,
            whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
        };  
        ChatMessage.create(chatData, {});
        break;
    case 17:
    case 18:
    case 19:
    case 20:
        let output = LVL17to20;
        let chatData = {
            user: game.user._id,
            speaker: ChatMessage.getSpeaker(),
            content: messageTable,
            whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
        };  
        ChatMessage.create(chatData, {});
        break;
}
