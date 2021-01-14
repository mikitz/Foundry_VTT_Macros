/* This Macro generates a random encounter based on the time of day as logged by the About Time module and the minimum level of the actors that are in the scene */
/* 
REQUIREMENTS:
1.) There must be actors in the scene (I.E. on the grid) 
    a.) This is because this macro gets the minimum level of all actors in the scene
2.) the About Time module
    a.) This is because this macro uses this module to get the time of day in order to determine how likely an encounter is
*/
/* 
THINGS TO FIX AND/OR ADD:
1.) Need to fix the displaying of multi-output tables:
    a.) Whirlpool, Random Ships
        i.) only outputs the first table instead of all of them
2.) Double-check tables to make sure they don't have TEXT MISSING entries
*/
let message = "The party has come across an <b>encounter</b> ";
let time = game.Gametime.getTime();
let s = time.split(':');
let seconds = (+s[0]) * 60 * 60 + (+s[1]) * 60 + (+s[2]);
let minLevel = Infinity;
let biome = document.getElementById("dBiome");
const tableHour1 = game.tables.entities.find(t => t.name === "(Shift) Hour").roll().results[0].text;
const tableHour2 = game.tables.entities.find(t => t.name === "(Shift) Hour").roll().results[0].text;

for(let token of canvas.tokens.placeables) {
    if( token.actor.data.data.details.level >= 1 ) {
      minLevel = Math.min(minLevel, token.actor.data.data.details.level);
    }
  }

// log the minimum level to the console to make sure it's working
// log the time to the console to make sure it's working
// log the seconds to the console to make sure it's working
console.log(`Min. Level: ${minLevel}\nTime: ${time}\nSeconds: ${seconds}`)

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
		//make sure all the results are text only.
		message += "<hr><b>Encounter: </b>" + result.text + "<p>" + "<b>Encounter Hour: </b>" + tableHour1 + "<p>";
	} else {
		message += "<hr>@" + result.collection + "[" + result.resultId + "]{" + result.text + "}";
	}
	printMessage(message);
}

function printHazard(result){
	if (result.type == 0){
		//make sure all the results are text only.
		message += "<hr><b>Encounter: </b>" + result.text + "<p>" + "<b>Encounter Hour: </b>" + tableHour2 + "<p>";
	} else {
		message += "<hr>@" + result.collection + "[" + result.resultId + "]{" + result.text + "}";
	}
	printMessage(message);
}

function printBiomeEncounter(label) {
        message += `in the <b>${label}</b> `;
        if(minLevel >= 1 && minLevel <= 4)  {
            printEncounter(game.tables.entities
                .find(t => t.name == `${label} (Levels 1-4)`)
                .roll().results[0]);
        } else if(minLevel >= 5 && minLevel <= 10) {
            printEncounter(game.tables.entities
                .find(t => t.name == `${label} (Levels 5-10)`)
                .roll().results[0]);
        } else if(minLevel >= 11 && minLevel <= 16) {
            printEncounter(game.tables.entities
                .find(t => t.name == `${label} (Levels 11-16)`)
                .roll().results[0]);
        } else {
            printEncounter(game.tables.entities
                .find(t => t.name == `${label} (Levels 17-20)`)
                .roll().results[0]);
        }
}

function printNonCombatEncounter(label) {
    printEncounter(game.tables.entities
        .find(t => t.name === `${label} (Non-combat) `)
        .roll().results[0]);
}

let dBiome = new Dialog({
	title: "Generate a Random Combat Encounter",
    content: "<h2><b>COMBAT ENCOUNTER</b></h2> <p>In what biome is the party currently located?</p><p><i>Note that if the party are on a road, select the biome in which the road travels through</i></p>",
	buttons:{
        arctic:{
            id: "1",
			label: "Arctic",
			callback () {
                console.log(this.label);
                printBiomeEncounter(this.label);
			}
		},
	}
})

let dUrban = new Dialog({
    title: "Generate a Random Non-combat Encounter in an Urban Environment",
	content: "<h2><b>NON-COMBAT ENCOUNTER</b></h2> <p>Where is the party located within the urban area?</p>",
	buttons:{
		seedytavern:{
            id: "1",
			label: "Seedy Tavern",
			callback () {
                printEncounter(game.tables.entities
                    .find(t => t.name === `${this.label} (Non-combat) `)
                    .roll().results[0]);
			}
        },
        redlightdistrict:{
            id: "2",
			label: "Red Light Disctrict",
			callback () {
                printEncounter(game.tables.entities
                    .find(t => t.name === `${this.label} (Non-combat) `)
                    .roll().results[0]);
			}
        },
        tavern:{
            id: "3",
			label: "Tavern",
			callback () {
                printEncounter(game.tables.entities
                    .find(t => t.name === `${this.label} (Non-combat) `)
                    .roll().results[0]);
			}
        },
        citystreets:{
            id: "3",
			label: "City Streets",
			callback () {
                printEncounter(game.tables.entities
                    .find(t => t.name === `${this.label} (Non-combat) `)
                    .roll().results[0]);
			}
        },
    }
})

let dNonCombat = new Dialog({
    title: "Generate a Random Non-combat Encounter",
	content: "<h2><b>NON-COMBAT ENCOUNTER</b></h2> <p>In what biome is the party currently located?</p>",
	buttons:{
        arctic:{
            id: "1",
			label: "Arctic",
			callback () {
                printNonCombatEncounter(this.label);
			}
        },
        coastal:{
            id: "2",
			label: "Coastal",
			callback () {
                printNonCombatEncounter(this.label);
			}
        },
        desert:{
            id: "3",
			label: "Desert",
			callback () {
                printNonCombatEncounter(this.label);
			}
        },
        forest:{
            id: "4",
			label: "Forest",
			callback () {
                printNonCombatEncounter(this.label);
			}
        },
        grassland:{
            id: "5",
            label: "Grassland",
			callback () {
                printNonCombatEncounter(this.label);
			}
        },
        hill:{
            id: "6",
            label: "Hill",
			callback () {
                printNonCombatEncounter(this.label);
			}
        },
        mountain:{
            id: "7",
            label: "Mountain",
			callback () {
                printNonCombatEncounter(this.label);
			}
        },
        road:{
            id: "8",
            label: "Road",
            callback () {
                printNonCombatEncounter(this.label);
			}
        },
        sea:{
            id: "9",
			label: "Sea",
			callback () {
                printNonCombatEncounter(this.label);
			}
        },
        swamp:{
            id: "10",
			label: "Swamp",
			callback () {
                printNonCombatEncounter(this.label);
			}
        },
        underdark:{
            id: "11",
            label: "Underdark",
			callback () {
                printNonCombatEncounter(this.label);
			}
        },
        urban:{
            id: "12",
			label: "Urban",
			callback: () => {
                dUrban.render(true);
			}
        },
    }
})

// this if statement is for encounters at night
// if the time is between 1800 and 0500, then it is considered night
// the time values are in seconds: 1800 hrs = 64,800 seconds and 0500 hrs = 18,000 seconds
if(seconds >= 64800 || seconds <= 18000) {
    let die = new Roll("1d20", {}).roll().total;
    // log the roll to the console to make sure it's working
    console.log("Roll: " + die);
    if (die >= 18){
        message += "during the <b>night</b> ";
        dBiome.render(true);
    } else if(die == 17) {
        message += "during the <b>night</b> ";
        dNonCombat.render(true);
    } else {
        printMessage("<b>Encounter:</b> No random encounter");
    }
// this else statement is for encounters during the day
// basically it means that if the time isn't between 1800 and 0500, then it must be during the day
} else {
    let die = new Roll("1d20", {}).roll().total;
    // log the roll to the console to make sure it's working
    console.log("Roll: " + die);
    if (die >= 20){
        message += "during the <b>day</b> ";
        dBiome.render(true);
    } else if(die >= 18 && die <= 19) {
        message += "during the <b>day</b> ";
        dNonCombat.render(true);
    } else {
        printMessage("<b>Encounter:</b> No random encounter");
    }
}
