let message = "The party has come across an <b>encounter</b> ";
let time = game.Gametime.getTime();
let s = time.split(':');
let seconds = (+s[0]) * 60 * 60 + (+s[1]) * 60 + (+s[2]);
let minLevel = Infinity;
const tableHour1 = game.tables.getName("(Shift) Hour").roll().results[0].text;
const tableHour2 = game.tables.getName("(Shift) Hour").roll().results[0].text;
const tHazard = game.tables.getName("Hazard (General)").roll().results[0];

function printMessage(message){
	let chatData = {
	user : game.user._id,
	content : "<b><h2>RANDOM ENCOUNTER</h2></b>" + message,
	whisper : game.users.entities.filter(u => u.isGM).map(u => u._id)
	};

	ChatMessage.create(chatData,{});
}

function printEncounter(result){
	if (result.type == 0){
		message += "<hr><b>Encounter: </b>" + result.text + "<p>" + "<b>Encounter Hour: </b>" + tableHour1 + "<p>";
	} else {
		message += "<hr>@" + result.collection + "[" + result.resultId + "]{" + result.text + "}";
	}
	printMessage(message);
}

function printHazard(result){
	if (result.type == 0){
		message += "<hr><b>Hazard: </b>" + result.text + "<p>" + "<b>Encounter Hour: </b>" + tableHour2 + "<p>";
	} else {
		message += "<hr>@" + result.collection + "[" + result.resultId + "]{" + result.text + "}";
	}
	printMessage(message);
}

console.log(`Hazard: ${tHazard}`);
printEncounter(tHazard);
printHazard(tHazard);