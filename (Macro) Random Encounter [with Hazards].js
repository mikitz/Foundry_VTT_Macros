/* 
INTRODUCTION
- This macro generates a random encounter based on the time of day as logged by the About Time module and the minimum level of the actors that are in the scene.
- This macro uses tables from Xanathar's Guide to Everything, Ghosts of Saltmarsh, and r/d100. I neglected to keep track of where the tables came from, so apologies for not having citations.
*/

/* 
REQUIREMENTS:
1.) There must be actors in the scene (I.E. on the grid) 
    a.) This is because this macro gets the minimum level of all actors in the scene and uses this minimum level to determine in which tier the party belongs.
2.) the About Time module
    a.) This is because this macro uses this module to get the time of day in order to determine how likely an encounter is.
        1.) Night (Defined as hours between 18:00:00 and 05:00:00)
            a.) 15% chance of a combat encounter
            b.) 5% chance of a non-combat encounter
        2.) Day (Defined as hours between 05:00:01 and 17:59:59)
            a.) 5% chance of a combat encounter
            b.) 10% chance of a noncombat encounter
*/

/* 
THINGS TO FIX AND/OR ADD:
    1.) Add Hazards for biomes:
        a.) Arctic
        b.) Coast
        c.) Desert
        d.) Forest
        e.) Grassland
        f.) Hill
        g.) Mountain
        h.) Swamp
        i.) Underdark
*/

let message = "The party has come across an <b>encounter</b> ";
let time = game.Gametime.getTime();
let s = time.split(':');
let seconds = (+s[0]) * 60 * 60 + (+s[1]) * 60 + (+s[2]);
let minLevel = Infinity;
const tableHour1 = game.tables.getName("(Shift) Hour").roll().results[0].text;
const tableHour2 = game.tables.getName("(Shift) Hour").roll().results[0].text;
const tHazard = game.tables.getName("Hazard (On a Boat)").roll().results[0];
const tUWHazard = game.tables.getName("Hazard (Underwater)").roll().results[0];

for(let token of canvas.tokens.placeables) {
    if( token.actor.data.data.details.level >= 1 ) {
      minLevel = Math.min(minLevel, token.actor.data.data.details.level);
    }
  }

// log the variables to make sure they're working as intended.
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
		message += "<hr><b>Encounter: </b>" + result.text + "<p>" + "<b>Encounter Hour: </b>" + tableHour1 + "<p>";
	} else {
		message += "<hr>@" + result.collection + "[" + result.resultId + "]{" + result.text + "}";
	}
	printMessage(message);
}

function printHazard(result){
	if (result.type == 0){
		message += "<hr><b>Hazard: </b>" + result.text + "<p>" + "<b>Hazard Hour: </b>" + tableHour2 + "<p>";
	} else {
		message += "<hr>@" + result.collection + "[" + result.resultId + "]{" + result.text + "}";
	}
	printMessage(message);
}

function fCombatEncounter(id, label) {
    this.id = id;
    this.label = label;
    this.callback = function () {
        message += `in the <b>${label}</b> `;
        if(minLevel >= 1 && minLevel <= 4)  {
            printEncounter(game.tables
                .getName(`${label} (Levels 1-4)`)
                .roll().results[0]);
        } else if(minLevel >= 5 && minLevel <= 10) {
            printEncounter(game.tables
                .getName(`${label} (Levels 5-10)`)
                .roll().results[0]);
        } else if(minLevel >= 11 && minLevel <= 16) {
            printEncounter(game.tables
                .getName(`${label} (Levels 11-16)`)
                .roll().results[0]);
        } else {
            printEncounter(game.tables
                .getName(`${label} (Levels 17-20)`)
                .roll().results[0]);
        }      
    }
}

function fCombatEncounter1(id, label) {
    this.id = id;
    this.label = label;
    this.callback = function () {
        message += `in the <b>${label}</b> `;
        if(minLevel >= 1 && minLevel <= 4)  {
            printEncounter(game.tables
                .getName(`${label} (Levels 1-4)`)
                .roll().results[0]);
        } else if(minLevel >= 5 && minLevel <= 10) {
            printEncounter(game.tables
                .getName(`${label} (Levels 5-10)`)
                .roll().results[0]);
        } else {
            printEncounter(game.tables
                .getName(`${label} (Levels 11-20)`)
                .roll().results[0]);
        }      
    }
}

function fNonCombatEncounter(id, label) {
    this.id = id;
    this.label = label;
    this.callback = function () {
        message += `in the <b>${label}</b> `;
        printEncounter(game.tables
            .getName(`${label} (Non-combat)`)
            .roll().results[0]);
    }
}

let dBiome = new Dialog({
	title: "Generate a Random Combat Encounter",
    content: "<h2><b>COMBAT ENCOUNTER</b></h2> <p>In what biome is the party currently located?</p><p><i>Note that if the party are on a road, select the biome in which the road travels through</i></p>",
	buttons:{
        arctic: new fCombatEncounter(1, 'Arctic'),
        coast: new fCombatEncounter(2, 'Coast'),
        desert: new fCombatEncounter(3, 'Desert'),
        forest: new fCombatEncounter(4, 'Forest'),
        grassland: new fCombatEncounter(5, 'Grassland'),
        hill: new fCombatEncounter(6, 'Hill'),
        mountain: new fCombatEncounter(7, 'Mountain'),
        sea:{
            id: "8",
            label: "Sea",
            callback () {
                message += `on the <b>${this.label}</b> `;
               
                if(minLevel >= 1 && minLevel <= 4)  {
                    printEncounter(game.tables
                        .getName(`${this.label} (Levels 1-4)`)
                        .roll().results[0]);
                } else if(minLevel >= 5 && minLevel <= 10) {
                    printEncounter(game.tables
                        .getName(`${this.label} (Levels 5-10)`)
                        .roll().results[0]);
                } else if(minLevel >= 11 && minLevel <= 16) {
                    printEncounter(game.tables
                        .getName(`${this.label} (Levels 11-16)`)
                        .roll().results[0]);
                } else {
                    printEncounter(game.tables
                        .getName(`${this.label} (Levels 17-20)`)
                        .roll().results[0]);
                }
            }
        },
        swamp: new fCombatEncounter1(9, 'Swamp'),
        underdark: new fCombatEncounter(10, 'Underdark'),
        underwater: {
            id: "11",
            label: "Underwater",
            callback () {
                message += `<b>${this.label}</b> `;
                
                if(minLevel >= 1 && minLevel <= 4)  {
                    printEncounter(game.tables
                        .getName(`${this.label} (Levels 1-4)`)
                        .roll().results[0]);
                } else if(minLevel >= 5 && minLevel <= 10) {
                    printEncounter(game.tables
                        .getName(`${this.label} (Levels 5-10)`)
                        .roll().results[0]);
                } else {
                    printEncounter(game.tables
                        .getName(`${this.label} (Levels 11-20)`)
                        .roll().results[0]);
                }
            }
        }, 
        urban: new fCombatEncounter(12, 'Urban'),
	}
})

let dUrban = new Dialog({
    title: "Generate a Random Non-combat Encounter in an Urban Environment",
	content: "<h2><b>NON-COMBAT ENCOUNTER</b></h2> <p>Where is the party located within the urban area?</p>",
	buttons:{
        seedytavern: new fNonCombatEncounter(1, 'Seedy Tavern'),
        redlightdistrict: new fNonCombatEncounter(2, 'Red Light District'),
        tavern: new fNonCombatEncounter(3, 'Tavern'),
        citystreets: new fNonCombatEncounter(4, 'City Streets')
    }
})

let dNonCombat = new Dialog({
    title: "Generate a Random Non-combat Encounter",
	content: "<h2><b>NON-COMBAT ENCOUNTER</b></h2> <p>In what biome is the party currently located?</p>",
	buttons:{
        arctic: new fNonCombatEncounter(1, 'Arctic'),
        coast: new fNonCombatEncounter(2, 'Coast'),
        desert: new fNonCombatEncounter(3, 'Desert'),
        forest: new fNonCombatEncounter(4, 'Forest'),
        grassland: new fNonCombatEncounter(5, 'Grassland'),
        hill: new fNonCombatEncounter(6, 'Hill'),
        mountain: new fNonCombatEncounter(7, 'Mountain'),
        road: new fNonCombatEncounter(8, 'Road'),
        sea: new fNonCombatEncounter(9, 'Sea'),
        swamp: new fNonCombatEncounter(10, 'Swamp'),
        underdark: new fNonCombatEncounter(11, 'Underdark'),
        underwater: new fNonCombatEncounter(12, 'Underwater'),
        urban:{
            id: "13",
            label: "Urban",
            callback () {
                dUrban.render(true);
            }
        }
    }
})

let dHazard = new Dialog({
    title: "Generate a Random Hazard",
    content: "<h2><b>HAZARD</b></h2> <p>Where is the party located?</p>",
    buttons:{
        boat:{
            id: "1",
            label: "On a Boat",
            callback () {
                printHazard(tHazard);
            }
        },
        underwater:{
            id: "2",
            label: "Underwater",
            callback () {
                printHazard(tUWHazard);
            }
        }
    }
})

// this if statement is for hazards at sea and underwater
let die = new Roll("1d20", {}).roll().total;
console.log(`Hazard Roll: ${die}`);
if (die >= 20){
    dHazard.render(true);
} else {
    
}

// this if statement is for encounters at night
// if the time is between 1800 and 0500, then it is considered night
// the time values are in seconds: 1800 hrs = 64,800 seconds and 0500 hrs = 18,000 seconds
if(seconds >= 64800 || seconds <= 18000) {
    let die = new Roll("1d20", {}).roll().total;
    // log the roll to the console to make sure it's working
    console.log("Encounter Roll: " + die);
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
    console.log("Encounter Roll: " + die);
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