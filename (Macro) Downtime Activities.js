// Define the print message function
function printMessage(message){
	let chatData = {
	    user : game.user._id,
	    content : message,
	};
	ChatMessage.create(chatData,{});
}
let name = `<B>${token.actor.name}</B>`;
let messageComp = `<H3><U>Complication:</U></H3>`
let activity = "";
let DTmessage = "";
let resultMessage = "";
let complication = "";

// Text Input
let content = `
        <p>Please input the number of hours you wish to train.</p>
        <form>
            <div class="form-group">
                <label for="hours">Hours: </label>
                <input id="hours" name="num" type="number" min="0"></input>
            </div>
        </form>`;

// Radio Group
let radios = `<p>Please select either "Proficiency" or "Expertise".</p>
            <form>
                <div class="form-group">
                    <label for="prof">Proficiency </label>
                    <input id="prof" value="prof" name="level" type="radio"></input>
                    <label for="exp">Expertise </label>
                    <input id="exp" value="exp" name="level" type="radio"></input>
                </div>
            </form>`;

// Dropdown menu selector
let dropdown = `<form action="/action_page.php">
                    <label for="cars">Choose a car:</label>
                    <select name="cars" id="cars">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>
                    <br><br>
                    <input type="submit" value="Submit">
                </form>`

// DEFINE SOME DICE
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
let d4 = new getRndInteger(1, 4);
let d6 = new getRndInteger(1, 6);
let d8 = new getRndInteger(1, 8);
let d10 = new getRndInteger(1, 10);
let d12 = new getRndInteger(1, 12);
let d20 = new getRndInteger(1, 20);
let d100 = new getRndInteger(1, 100);

// Declare a function to select a random value from a dictionary
// Source: https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};

// SECONDARY DIALOG FUNCTIONS AND DIALOGS

// Buying a Magic Item: Variables, Functions, and Dialoges
var dictRival = {
    1: "Tax collector who is convinced the characters are dodging fees",
    2: "Politician who is concerned that the characters are causing more trouble than they solve",
    3: "High priest who worries the characters are diminishing the temple's prestige",
    4: "Wizard who blames the characters for some recent troubles",
    5: "Rival adventuring party",
    6: "Bard who loves a scandal enough to spark one",
    7: "Childhood rival or member of a rival clan",
    8: "Scorned sibling or parent",
    9: "Merchant who blames the characters for any business woes",
    10: "Newcomer out to make a mark on the world",
    11: "Sibling or ally of defeated enemy",
    12: "Official seeking to restore a tarnished reputation",
    13: "Deadly foe disguised as a social rival",
    14: "Fiend seeking to tempt the characters to evil",
    15: "Spurned romantic interest",
    16: "Political opportunist seeking a scapegoat",
    17: "Traitorous noble looking to foment a revolution",
    18: "Would-be tyrant who brooks no opposition",
    19: "Exiled noble looking for revenge",
    20: "Corrupt official worried that recent misdeeds will be revealed",
};
var dictBuyMagicItemComplication = {
    1: "The item is a fake, planted by an enemy.*",
    2: "The item is stolen by the party's enemies.*",
    3: "The item is cursed by a god.",
    4: "The item's original owner will kill to reclaim it; the party's enemies spread news of its sale.*",
    5: "The item is at the center of a dark prophecy.",
    6: "The seller is murdered before the sale.*",
    7: "The seller is a devil looking to make a bargain.",
    8: "The item is the key to freeing an evil entity.",
    9: "A third party bids on the item, doubling its price.*",
    10: "The item is an enslaved, intelligent entity.",
    11: "The item is tied to a cult.",
    12: "The party's enemies spread rumors that the item is an artifact of evil.*",
};
var dictBuyMagicItemItemPrice = {
    Common: (d6 + 1) * 10,
    Uncommon: d6 * 100,
    Rare: (d10 + d10) * 1000,
    VeryRare: (d4 + 1) * 10000,
    Legendary: (d6 + d6) * 25000
}
let dBuyMagicItem = new Dialog ({
    // TO-DO
    title: "Buy a Magic Item",
    content: "How much money do you spend searching and how long do you search for a quality seller?",
    buttons: {
        skill: {
            id: "1",
            label: "Skill",
            callback () {
                let persuasionBonus = token.actor.data.data.skills.per.total;
                let persuasionRoll = new Roll(`1d20 + ${persuasionBonus}`).roll().total;
                
            }  
        }
    }
})

// Gambling: Variables and Functions and Dialogs
let contentGambling = `
        <p>Please input the amount of your selected currency you wish to wager.</p>
        <p><i>Note: You will lose whatever you put into this box</i></p>
        <form>
            <div class="form-group">
                <label for="quan">Quantity: </label>
                <input id="quan" name="quan" type="number" min="0"></input>
            </div>
        </form>`;

let radiosGambling = `<p>Please select either "Proficiency" or "Expertise".</p>
            <form>
                <div class="form-group">
                    <label for="plat">Platinum</label>
                    <input id="plat" value="plat" name="currency" type="radio"></input>
                    <label for="gold">Gold</label>
                    <input id="gold" value="gold" name="currency" type="radio"></input>
                    <label for="elec">Electrum</label>
                    <input id="elec" value="elec" name="currency" type="radio"></input>
                    <label for="silv">Silver</label>
                    <input id="silv" value="silv" name="currency" type="radio"></input>
                    <label for="copp">Copper</label>
                    <input id="copp" value="copp" name="currency" type="radio"></input>
                </div>
            </form>`;

function fGambleButton(id, label) {
    this.id = id;
    this.label = label;
    this.callback = function (html) {
        let ins = token.actor.data.data.skills.ins.mod;
        let dec = token.actor.data.data.skills.dec.mod;
        let itm = token.actor.data.data.skills.itm.mod;
        let comp = game.tables.getName("Gambling Complications").roll().results[0].text;

        let DC1 = new Roll("2d10 + 5", {}).roll().total;
        let DC2 = new Roll("2d10 + 5", {}).roll().total;
        let DC3 = new Roll("2d10 + 5", {}).roll().total;

        let insR = new Roll(`1d20 + ${ins}`, {}).roll().total;
        let decR = new Roll(`1d20 + ${dec}`, {}).roll().total;
        let itmR = new Roll(`1d20 + ${itm}`, {}).roll().total;

        console.log(`ROLL LOG
        DC1: ${DC1}
        DC2: ${DC2}
        DC3: ${DC3}
        Insight: ${insR}
        Deception: ${decR}
        Intimidation: ${itmR}`)

        let currency = $('input[name="currency"]:checked').val();
        let quantity = Number(html.find("#quan")[0].value);
        let gp = null;

        if (!currency) {
            ui.notifications.warn("Please select a currency.");
            this.render(true);
        } else if (quantity == 0) {
            ui.notifications.warn("Please input a quantity greater than zero(0).");
            this.render(true);
        } else if (insR >= DC1 && decR >= DC2 && itmR >= DC3) {
            gp = quantity * 2;
        } else if (insR >= DC1 && decR >= DC2 || decR >= DC2 && itmR >= DC3 || insR >= DC1 && itmR >= DC3) {
            gp = quantity * 1.5;
        } else if (insR >= DC1 || decR >= DC2 || itmR >= DC3) {
            gp = quantity * 0.5;
        } else {
            gp = 0;
        }
        let resultMessage = `${name} earns <I>${gp} ${currency}</I>`
        messageComp += `${comp}` 
        printMessage(`${DTmessage} ${resultMessage} <BR> ${messageComp}`)
    }
}    

let dGambling = new Dialog ({
    title: "Wager",
    content: contentGambling + radiosGambling,
    buttons: {
        gamble: new fGambleButton(1, "Gamble!")
    }
})

// Pit Fighting: Variables and Functions and Dialogs
let dPitFighting = new Dialog ({
    title: "Pit Fighting",
    content: "It's Pit Fighting Time!",
    buttons: {
        gamble: {
            id: "1",
            label: "Go Pit Fighting!",
            callback () {
                let ath = token.actor.data.data.skills.ath.mod;
                let acr = token.actor.data.data.skills.acr.mod;
                let hitdie = canvas.tokens.controlled[0].actor.items.find(i => i.type === 'class').data.data.hitDice;
                let comp = game.tables.getName("Pit Fighting Complications").roll().results[0].text;
            
                let DC1 = new Roll("2d10 + 5", {}).roll().total;
                let DC2 = new Roll("2d10 + 5", {}).roll().total;
                let DC3 = new Roll("2d10 + 5", {}).roll().total;
            
                let hdR = new Roll(`1${hitdie}`, {}).roll().total;
                let athR = new Roll(`1d20 + ${ath}`, {}).roll().total;
                let acrR = new Roll(`1d20 + ${acr}`, {}).roll().total;
                let conR = new Roll(`1d20 + ${hdR}`, {}).roll().total;
            
                let gp = null;

                console.log(`ROLL LOG
                    Hit Die: ${hdR}
                    DC1: ${DC1}
                    DC2: ${DC2}
                    DC3: ${DC3}
                    Athletics: ${athR}
                    Acrobatics: ${acrR}
                    Consitution: ${conR}`)
            
                if (athR >= DC1 && acrR >= DC2 && conR >= DC3) {
                    gp = new Roll("1d10 + 10", {}).roll().total;
                } else if (athR >= DC1 && acrR >= DC2 || acrR >= DC2 && conR >= DC3 || athR >= DC1 && conR >= DC3) {
                    gp = new Roll("1d5 + 5", {}).roll().total;
                } else if (athR >= DC1 || acrR >= DC2 || conR >= DC3) {
                    gp = new Roll("1d5", {}).roll().total;
                } else {
                    gp = 0;
                }
                let resultMessage = `${name} earns <I>${gp} gp</I>`
                messageComp += `${comp}` 
                printMessage(`${DTmessage} ${resultMessage} <BR> ${messageComp}`)
            }
        }
    }
})

// Carousing: Variables and Functions and Dialogs
let dropdownCarousing = `<form action="/action_page.php">
                    <label for="carousing-locale">Choose a Carousing Location:</label>
                    <select name="locale" id="locale">
                        <option value="low">Low-class Carousing</option>
                        <option value="middle">Middle-class Carousing</option>
                        <option value="high">High-class Carousing</option>
                    </select>
                </form>`
var dictLow = {
    1: "A pickpocket lifts [[1d10 × 5]] gp from you.*",
    2: "A bar brawl leaves you with a scar.*",
    3: "You have fuzzy memories of doing something very, very illegal, but can't remember exactly what.",
    4: "You are banned from a tavern after some obnoxious behavior.*",
    5: "After a few drinks, you swore in the town square to pursue a dangerous quest.",
    6: "Surprise! You're married.",
    7: "Streaking naked through the streets seemed like a great idea at the time.",
    8: "Everyone is calling you by some weird, embarrassing nickname, like Puddle Drinker or Bench Slayer, and no one will say why.*"
};
var dictMiddle = {
    1: "You accidentally insulted a guild master, and only a public apology will let you do business with the guild again.*",
    2: "You swore to complete some quest on behalf of a temple or a guild.",
    3: "A social gaffe has made you the talk of the town.*",
    4: "A particularly obnoxious person has taken an intense romantic interest in you.*",
    5: "You have made a foe out of a local spellcaster.*",
    6: "You have been recruited to help run a local festival, play, or similar event.",
    7: "You made a drunken toast that scandalized the locals.",
    8: "You spent an additional 100 gp trying to impress people."
}
var dictUpper = {
    1: "A pushy noble family wants to marry off one of their scions to you.*",
    2: "You tripped and fell during a dance, and people can't stop talking about it.",
    3: "You have agreed to take on a noble's debts.",
    4: "You have been challenged to a joust by a knight.*",
    5: "You have made a foe out of a local noble.*",
    6: "A boring noble insists you visit each day and listen to long, tedious theories of magic.",
    7: "You have become the target of a variety of embarrassing rumors.*",
    8: "You spent an additional 500 gp trying to impress people."
}
let dCarousing = new Dialog ({
    title: "Carousing Time, Baby!",
    content: `Where are you going carousing? <BR> 
            ${dropdownCarousing}`,
    buttons: {
        goCarousing: {
            id: "1",
            label: "Go Carousing!",
            callback (html) {
                let contact = "";
                let check = new Roll(`1d20 + ${token.actor.data.data.skills.per.total}`).roll().total;
                let d100 = new Roll(`1d100`).roll().total;
                let locale = html.find('#locale').val();
                let result = "";
                check = Math.ceil(check / 5);
                // Log the above
                console.log(`d100: ${d100}`)
                console.log(`Check: ${check}`);
                console.log(`Locale: ${locale}`);
                // Determine if a complications happens
                if (d100 <= 25) {
                    // Pull a result from the correct dictionary
                    if (locale == 'low') {
                        result = randomProperty(dictLow);
                    } else if (locale == 'middle') {
                        result = randomProperty(dictMiddle);
                    } else {
                        result = randomProperty(dictUpper);
                    }
                    messageComp += `${result}`;
                }
                // Determine the type of contact the character makes
                if (check == 1 || check == 0) {
                    contact = "a hostile";
                } else if (check == 2) {
                    contact = "no new";
                } else if (check == 3) {
                    contact = "an allied";
                } else if (check == 4) {
                    contact = "two allied";
                } else if (check >= 5) {
                    contact = "three allied";
                }
                let resultMessage = `${name} has made <I>${contact}</I> contact(s).`
                printMessage(`${DTmessage} ${resultMessage} <BR> ${messageComp}`)
            }
        }
    }
})

// Crime: Variables and Functions and Dialogs
let dropdownCrime1 = `<form action="/action_page.php">
                    <label for="crime-mark">Choose a Mark:</label>
                    <select name="mark" id="mark">
                        <option value="struggling">A Struggling Merchant</option>
                        <option value="prosperous">A Prosperous Merchant</option>
                        <option value="noble">A Noble</option>
                        <option value="rich-figure">Extremely Rich Figure</option>
                    </select>
                </form>`
let dropdownCrime2 = `<form action="/action_page.php">
                <label for="check3">Choose your Third Check:</label>
                <select name="check3" id="check3">
                    <option value="inv">Intelligence (Investigation)</option>
                    <option value="perc">Wisdom (Perception)</option>
                    <option value="dec">Charisma (Deception)</option>
                </select>
            </form>`
var dictCrime = {
    1: "A bounty equal to your earnings is offered for information about your crime.*",
    2: "An unknown person contacts you, threatening to reveal your crime if you don't render a service.*",
    3: "Your victim is financially ruined by your crime.",
    4: "Someone who knows of your crime has been arrested on an unrelated matter.*",
    5: "Your loot is a single, easily identified item that you can't fence in this region.",
    6: "You robbed someone who was under a local crime lord's protection, and who now wants revenge.",
    7: "Your victim calls in a favor from a guard, doubling the efforts to solve the case.",
    8: "Your victim asks one of your adventuring companions to solve the crime.",
}

let dCrime = new Dialog ({
    title: "You wanna be a criminal, eh?",
    content: "You will make 3 checks: Dexterity (Stealth), Dexterity (thieves' tools), and one of your choosing: A.) Intelligence (Investigation), B.) Wisdom (Perception), or C.) Charisma (Deception)" + dropdownCrime1 + "<BR>" + dropdownCrime2,
    buttons: {
        crimeTime: {
            id: "1",
            label: "Crime Time!",
            callback (html) {
                let message = "";
                activity = activity;
                let mark = html.find('#mark').val();
                let check3skill = html.find('#check3').val();
                let check1 = new Roll(`1d20 + ${token.actor.data.data.skills.ste.total}`).roll().total;
                let thievesTools = 0; // TO-DO
                let check2 = new Roll(`1d20 + ${token.actor.data.data.abilities.dex.mod} + ${thievesTools}`).roll().total;
                let check3 = "";
                // Get the 3rd check
                if (check3skill == "inv") {
                    check3 = new Roll(`1d20 + ${token.actor.data.data.skills.inv.total}`).roll().total;
                } else if (check3skill === "perc") {
                    check3 = new Roll(`1d20 + ${token.actor.data.data.skills.prc.total}`).roll().total;
                } else if (check3skill === "dec") {
                    check3 = new Roll(`1d20 + ${token.actor.data.data.skills.dec.total}`).roll().total;
                }
                console.log(`Mark: ${mark}`);
                console.log(`Check 3 Skill: ${check3skill}`)
                console.log(`Check 1 Roll: ${check1}`);
                console.log(`Check 2 Roll: ${check2}`);
                console.log(`Check 3 Roll: ${check3}`);
                // Set the DC, profit, and jail time
                let dc = "";
                let profit = "";
                if (mark == "struggling") {
                    dc = 10;
                    profit = 50;
                } else if (mark == "prosperous") {
                    dc = 15;
                    profit = 100;
                } else if (mark == "noble") {
                    dc = 20;
                    profit = 200;
                } else if (mark == "rich-figure") {
                    dc = 25;
                    profit = 1000;
                }
                let jailTime = profit / 25;
                console.log(`DC: ${dc}`);
                console.log(`Profit: ${profit} gp`);
                console.log(`Jail Time: ${jailTime} weeks`);
                // Determine the outcome
                let compMessage = "";
                if (check1 >= dc && check2 >= dc && check3 >= dc) {
                    message = `The heist is an unequivocal success! ${name} earns ${profit} gp!`
                } else if (check1 >= dc && check2 >= dc || check2 >= dc && check3 >= dc || check1 >= dc && check3 >= dc) {
                    message = `${name} escapes with half of the desired haul, netting ${profit / 2} gp`;
                } else if (check1 >= dc || check2 >= dc || check3 >= dc) {
                    complication = randomProperty(dictCrime);
                    message = `The heist has failed and ${name} has narrowly escaped the long arm of the law!`
                    compMessage = `<H3><U>Complication</U></H3> ${complication}`
                } else {
                    message = `${name} has been caught and jailed! You must pay a ${profit} gp fine and spend ${jailTime} weeks in jail.`
                }
                printMessage(`${DTmessage} ${message} <BR> ${compMessage}`);
            }
        }
    }
})

// Religious Service: Variables, Functions, and Dialogs
let dropdownReligion = `<form action="/action_page.php">
                <label for="check">Choose your Check:</label>
                <select name="check" id="check">
                    <option value="rel">Intelligence (Religion)</option>
                    <option value="per">Charisma (Persuasion)</option>
                </select>
            </form>`
var dictReligiousService = {
    1: "You have offended a priest through your words or actions.*",
    2: "Blasphemy is still blasphemy, even if you did it by accident.",
    3: "A secret sect in the temple offers you membership.",
    4: "Another temple tries to recruit you as a spy.*",
    5: "The temple elders implore you to take up a holy quest.",
    6: "You accidentally discover that an important person in the temple is a fiend worshiper.",
};
let dReligiousService = new Dialog ({
    title: `Religious Service`,
    content: `${dropdownReligion}`,
    buttons: {
        ok: {
            id: "1",
            label: "OK",
            callback (html) {
                let skill = html.find('#check').val();
                let check = new Roll(`1d20 + ${token.actor.data.data.skills[skill].total}`).roll().total;
                let d100 = new Roll(`1d100`).roll().total;
                // Determine if a complications happens
                if (d100 <= 25) {
                    result = randomProperty(dictReligiousService);
                    messageComp += `${result}`;
                } else {
                    messageComp += `No complications.`
                }

                // Determining the outcome
                if (check <= 10) {
                    resultMessage = `${name} has had no effect on the religious structure or its community. ${name}'s efforts have failed to make a lasting impression.`;
                } else if (check >= 11 && check <= 20) {
                    resultMessage = `${name} has earned one favor.`;
                } else {
                    resultMessage = `${name} has earned two favors.`;
                }
                printMessage(`${DTmessage} ${resultMessage} <BR> ${messageComp}`)
            }
        }
    }
    

})

// Research: Variables, Functions, and Dialogs
var dictResearch = {
    1: "You accidentally damage a rare book.",
    2: "You offend a sage, who demands an extravagant gift.*",
    3: "If you had known that book was cursed, you never would have opened it.",
    4: "A sage becomes obsessed with convincing you of a number of strange theories about reality.*",
    5: "Your actions cause you to be banned from a library until you make reparations.*",
    6: "You uncovered useful lore, but only by promising to complete a dangerous task in return.",
};

let dResearch = new Dialog ({
    title: `Research`,
    content: "",
    buttons: {
        ok: {
            id: "1",
            label: "OK",
            callback (html) {
                let check = new Roll(`1d20 + ${token.actor.data.data.abilities.int.mod}`).roll().total;
                let d100 = new Roll(`1d100`).roll().total;
                let loreQuantity = "";
                check = Math.ceil(check / 5);
                // Determine if a complication happens
                if (d100 <= 25) {
                    result = randomProperty(dictResearch);
                    messageComp += `${result}`;
                } else {
                    messageComp += `No complications.`
                }
                // Determining the outcome
                if (check == 1 || check == 0) {
                    loreQuantity = "zero";
                } else if (check == 2) {
                    loreQuantity = "one";
                } else if (check == 3) {
                    loreQuantity = "two";
                } else if (check >= 4) {
                    loreQuantity = "three";
                }
                let resultMessage = `${name} learns ${loreQuantity} piece(s) of lore.`
                printMessage(`${DTmessage} ${resultMessage} <BR> ${messageComp}`)
            }
        }
    }

});

// Work: Variables, Function, and Dialogs
var dictWork = {
    1: "A difficult customer or a fight with a coworker reduces the wages you earn by one category.*",
    2: "Your employer's financial difficulties result in your not being paid.*",
    3: "A coworker with ties to an important family in town takes a dislike to you.*",
    4: "Your employer is involved with a dark cult or a criminal enterprise.",
    5: "A crime ring targets your business for extortion.*",
    6: "You gain a reputation for laziness (unjustified or not, as you choose), giving you disadvantage on checks made for this downtime activity for the next six workweeks you devote to it.*",
};
let dropdownWork = `<form action="/action_page.php">
                <label for="check">Choose your Check:</label>
                <select name="check" id="check">
                    <option value="ath">Strength (Athletics)</option>
                    <option value="acr">Dexterity (Acrobatics)</option>
                    <option value="tool">Intelligence using a set of tools</option>
                    <option value="prf">Charisma (Performance)</option>
                    <option value="instrument">Charisma using a musical instrument</option>
                </select>
            </form>`
let radiosWork = `<p>Please select either "Not Skilled", "Proficiency" or "Expertise".</p>
            <form>
                <div class="form-group">
                    <label for="not-skilled">Not Skilled</label>
                    <input id="not-skilled" value="not-skilled" name="skill-level" type="radio"></input>
                    <label for="prof">Proficiency</label>
                    <input id="prof" value="prof" name="skill-level" type="radio"></input>
                    <label for="exp">Expertise</label>
                    <input id="exp" value="exp" name="skill-level" type="radio"></input>
                </div>
            </form>`;
let dWork = new Dialog ({
    title: "Work",
    content: `${dropdownWork} ${radiosWork}`,
    buttons: {
        ok: {
            id: "1",
            label: "OK",
            callback (html) {
                let d100 = new Roll(`1d00`).roll().total;
                let skillLevel = eval($('input[name="skill-level"]:checked').val());
                ath = token.actor.data.data.skills.ath.mod;
                acr = token.actor.data.data.skills.acr.mod;
                tool = token.actor.data.data.abilities.int.mod;
                per = token.actor.data.data.skills.prf.mod;
                instrument = token.actor.data.data.abilities.cha.mod;
                let skill = html.find("#check").val();
                let bonus = "";
                // Check for proficiency or expertise
                if (skillLevel == "prof") {
                    bonus = token.actor.data.data.attributes.prof;
                } else if (skillLevel == "exp") {
                    bonus = token.actor.data.data.attributes.prof * 2;
                }
                // Check for a complication
                if (d100 <= 20) {
                    complication = randomProperty(dictWork);
                }
                // Determine the outcome
                let roll = new Roll(`1d20 + ${bonus}`).roll().total;
                let total = roll + skill;
                console.log(`Total: ${total}`);
                // Print the end result to chat
                // let resultMessage = `${name} works and earns ${wage} ${currency}.`
                printMessage(`${DTmessage} ${resultMessage} <BR> ${messageComp}`)
            }
        }
    }
});

// PRIMARY DIALOG FUNCTIONS AND DIALOG

// Create the initial dialog where the user selects the downtime activity they wish to perform
let dropdownInitial = `<form action="/action_page.php">
                <label for="dta">Choose a Downtime Activity:</label>
                <select name="dta" id="dta">
                    <option value="dBuyMagicItem">Buy a Magic Item</option> // TO-DO
                    <option value="dCarousing">Carousing</option>
                    <option value="dCraftItem">Craft an Item</option> // TO-DO
                    <option value="dCrime">Crime</option>
                    <option value="dGambling">Gambling</option>
                    <option value="dPitFighting">Pit Fighting</option>
                    <option value="dRelax">Rest & Relaxation</option> // TO-DO
                    <option value="dReligiousService">Religious Service</option>
                    <option value="dResearch">Research</option>
                    <option value="dScribeSpellScroll">Scribe a Spell Scroll</option> // TO-DO
                    <option value="dSellMagicItem">Sell a Magic Item</option> // TO-DO
                    <option value="dTraining">Training</option> // TO-DO
                    <option value="dWork">Work</option> // TO-DO
                </select>
            </form>`

let dDowntimeActivity = new Dialog ({
    title: "Downtime Activity",
    content: `Please select the downtime activity you wish to perform. <BR> ${dropdownInitial}`,
    buttons: {
        ok: {
            id: "14",
            label: "OK",
            callback (html) {
                let dta = html.find('#dta').val();
                let vdta = eval(dta);
                let sel = document.getElementById("dta");
                let activity = sel.options[sel.selectedIndex].text;
                console.log(`ACTIVITY LOG
                             Value: ${dta}
                             Activity: ${activity}`)
                DTmessage = `<H2> Downtime Activity: ${activity}</H2> <H3><U>Outcome</U></H3>`;
                vdta.render(true);
            }
        }
    }
})
dDowntimeActivity.render(true)