let time = game.Gametime.getTime();
let minLevel = Infinity;
const tierZero = game.tables.entities.find(t => t.name === "Forest Encounters (Non-combat)").roll().results[0].text;
const tierOne = game.tables.entities.find(t => t.name === "Forest Encounters (Levels 1-4)").roll().results[0].text;
const tierTwo = game.tables.entities.find(t => t.name === "Forest Encounters (Levels 5-10)").roll().results[0].text;
const tierThree = game.tables.entities.find(t => t.name === "Forest Encounters (Levels 11-16)").roll().results[0].text;
const tierFour = game.tables.entities.find(t => t.name === "Forest Encounters (Levels 17-20)").roll().results[0].text;

for(let token of canvas.tokens.placeables) {
  if( token.actor.data.data.details.level >= 1 ) {
    minLevel = Math.min(minLevel, token.actor.data.data.details.level);
  }
}

let die = new Roll("1d20", {}).roll().total;

// This is for night time
if(time >= 64800 && time <= 18000) {
    if(die >= 18) {
        if(minLevel >= 1 && minLevel <= 4) {
            let output = tierOne;
            let messageTable = "<b><h2>FOREST ENCOUNTER:</b></h2>" + output;
                let chatData = {
                    user: game.user._id,
                    speaker: ChatMessage.getSpeaker(),
                    content: messageTable,
                    whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
                };  
                ChatMessage.create(chatData, {});
        } else if(minLevel >= 5 && minLevel <= 10) {
            let output = tierTwo;
            let messageTable = "<b><h2>FOREST ENCOUNTER:</b></h2>" + output;
                let chatData = {
                    user: game.user._id,
                    speaker: ChatMessage.getSpeaker(),
                    content: messageTable,
                    whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
                };  
                ChatMessage.create(chatData, {});
        } else if(minLevel >= 11 && minLevel <= 16) {
            let output = tierThree;
            let messageTable = "<b><h2>FOREST ENCOUNTER:</b></h2>" + output;
                let chatData = {
                    user: game.user._id,
                    speaker: ChatMessage.getSpeaker(),
                    content: messageTable,
                    whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
                };  
                ChatMessage.create(chatData, {});
        } else {
            let output = tierFour;
            let messageTable = "<b><h2>FOREST ENCOUNTER:</b></h2>" + output;
                let chatData = {
                    user: game.user._id,
                    speaker: ChatMessage.getSpeaker(),
                    content: messageTable,
                    whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
                };  
                ChatMessage.create(chatData, {});
        }
    } else {
        let output = "An uneventful evening";
            let messageTable = "<b><h2>FOREST ENCOUNTER:</b></h2>" + output;
                let chatData = {
                    user: game.user._id,
                    speaker: ChatMessage.getSpeaker(),
                    content: messageTable,
                    whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
                };  
                ChatMessage.create(chatData, {});
    }
// This is for day time
} else {
    if(die = 20) {
        if(minLevel >= 1 && minLevel <= 4) {
            let output = tierOne;
            let messageTable = "<b><h2>FOREST ENCOUNTER:</b></h2>" + output;
                let chatData = {
                    user: game.user._id,
                    speaker: ChatMessage.getSpeaker(),
                    content: messageTable,
                    whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
                };  
                ChatMessage.create(chatData, {});
        } else if(minLevel >= 5 && minLevel <= 10) {
            let output = tierTwo;
            let messageTable = "<b><h2>FOREST ENCOUNTER:</b></h2>" + output;
                let chatData = {
                    user: game.user._id,
                    speaker: ChatMessage.getSpeaker(),
                    content: messageTable,
                    whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
                };  
                ChatMessage.create(chatData, {});
        } else if(minLevel >= 11 && minLevel <= 16) {
            let output = tierThree;
            let messageTable = "<b><h2>FOREST ENCOUNTER:</b></h2>" + output;
                let chatData = {
                    user: game.user._id,
                    speaker: ChatMessage.getSpeaker(),
                    content: messageTable,
                    whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
                };  
                ChatMessage.create(chatData, {});
        } else {
            let output = tierFour;
            let messageTable = "<b><h2>FOREST ENCOUNTER:</b></h2>" + output;
                let chatData = {
                    user: game.user._id,
                    speaker: ChatMessage.getSpeaker(),
                    content: messageTable,
                    whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
                };  
                ChatMessage.create(chatData, {});
        }
    } else if(die = 19) {
        let output = tierZero;
            let messageTable = "<b><h2>FOREST ENCOUNTER:</b></h2>" + output;
                let chatData = {
                    user: game.user._id,
                    speaker: ChatMessage.getSpeaker(),
                    content: messageTable,
                    whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
                };  
                ChatMessage.create(chatData, {});
    } else {
        let output = "An uneventful day";
            let messageTable = "<b><h2>FOREST ENCOUNTER:</b></h2>" + output;
                let chatData = {
                    user: game.user._id,
                    speaker: ChatMessage.getSpeaker(),
                    content: messageTable,
                    whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
                };  
                ChatMessage.create(chatData, {});
    }
}


