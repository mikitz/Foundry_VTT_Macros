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
let result = ""
let rollType = ""
let check = 0
let checkA = 0
let checkB = 0
let check1 = 0
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
let dropdownAdvDis = `<form action="/action_page.php">
                        <label for="advdis">Roll Type:</label>
                        <select name="advdis" id="advdis">
                            <option value="normal">Normal</option>
                            <option value="advantage">Advantage</option>
                            <option value="disadvantage">Disadvantage</option>
                        </select>
                    </form>`
// Define a function to get the label from a selection
function fGetLabel(elementName) {
    // Get the label for the selected element from the dropdown
    let sel = document.getElementById(elementName)
    let label = sel.options[sel.selectedIndex].text
    return label
}

// Define a function to handle advantage and disadvantage
function fRollType(html, modifier) {
    // Get the roll type from the dropdown
    rollType = html.find("#advdis").val()
    // Determine the check
    if (rollType == "normal") {
        check = new Roll(`1d20 + ${modifier}`).roll().total;
    } else if (rollType == 'advantage') {
        checkA = new Roll(`1d20 + ${modifier}`).roll().total;
        checkB = new Roll(`1d20 + ${modifier}`).roll().total;
        if (checkA > checkB) {
            check = checkA
        } else {
            check = checkB
        }
    } else {
        checkA = new Roll(`1d20 + ${modifier}`).roll().total;
        checkB = new Roll(`1d20 + ${modifier}`).roll().total;
        if (checkA < checkB) {
            check = checkA
        } else {
            check = checkB
        }
    }
    console.log(`Roll Type: ${rollType}
                Check A: ${checkA}
                Check B: ${checkB}`)
    return check
}
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
let dictGamble = {
    1: "You are accused of cheating. You decide whether you actually did cheat or were framed.*",
    2: "The town guards raid the gambling hall and throw you in jail.*",
    3: "A noble in town loses badly to you and loudly vows to get revenge.*",
    4: "You won a sum from a low-ranking member of a thieves' guild, and the guild wants its money back.",
    5: "A local crime boss insists you start frequenting the boss's gambling parlor and no others.",
    6: "A high-stakes gambler comes to town and insists that you take part in a game."
}

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
        let d100 = new Roll(`1d100`).roll().total
        let ins = token.actor.data.data.skills.ins.mod;
        let dec = token.actor.data.data.skills.dec.mod;
        let itm = token.actor.data.data.skills.itm.mod;
        // Complication?
        let comp = ""
        if (d100 <= 20) {
            comp = randomProperty(dictGamble)
        } else {
            comp = `No complication`
        }

        let DC1 = new Roll("2d10 + 5", {}).roll().total;
        let DC2 = new Roll("2d10 + 5", {}).roll().total;
        let DC3 = new Roll("2d10 + 5", {}).roll().total;

        let insR = fRollType(html, ins)
        let decR = fRollType(html, dec)
        let itmR = fRollType(html, itm)

        console.log(`ROLL LOG
                DC1: ${DC1}
                DC2: ${DC2}
                DC3: ${DC3}
                Insight: ${insR}
                Deception: ${decR}
                Intimidation: ${itmR}
                d100: ${d100}`)

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
    title: "Gambling time, yo!",
    content: `
    <H2>Resources</H2>
        This activity requires one workweek of effort plus a stake of at least 10 gp, to a maximum of 1,000 gp or more, as you see fit.
    <H2>Resolution</H2>
        The character must make a series of checks, with a DC determined at random based on the quality of the competition that the character runs into. 
        Part of the risk of gambling is that one never knows who might end up sitting across the table.
        The character makes three checks: Wisdom (Insight), Charisma (Deception), and Charisma (Intimidation). 
        If the character has proficiency with an appropriate gaming set, that tool proficiency can replace the relevant skill in any of the checks. 
        The DC for each of the checks is 5 + 2d10; generate a separate DC for each one. Consult the Gambling Results table to see how the character did.
    <H2>User Inputs</H2>
        ${contentGambling} 
        ${radiosGambling}
        ${dropdownAdvDis}`,
    buttons: {
        gamble: new fGambleButton(1, "Gamble!")
    }
})

// Pit Fighting: Variables and Functions and Dialogs
let dPitFighting = new Dialog ({
    title: "Pit Fighting",
    content: `
    <H2>Resources</H2>
        Engaging in this activity requires one workweek of effort from a character.
    <H2>Resolution</H2>
        The character must make a series of checks, with a DC determined at random based on the quality of the opposition that the character runs into. 
        A big part of the challenge in pit fighting lies in the unknown nature of a character's opponents.
        The character makes three checks: Strength (Athletics), Dexterity (Acrobatics), 
        and a special Constitution check that has a bonus equal to a roll of the character's largest Hit Die (this roll doesn't spend that die). 
        If desired, the character can replace one of these skill checks with an attack roll using one of the character's weapons. 
        The DC for each of the checks is 5 + 2d10; generate a separate DC for each one. Consult the Pit Fighting Results table to see how the character did.
    <H2>User Inputs</H2>
        ${dropdownAdvDis}`,
    buttons: {
        gamble: {
            id: "1",
            label: "Go Pit Fighting!",
            callback (html) {
                let ath = token.actor.data.data.skills.ath.mod;
                let acr = token.actor.data.data.skills.acr.mod;
                let hitdie = canvas.tokens.controlled[0].actor.items.find(i => i.type === 'class').data.data.hitDice;
                let comp = game.tables.getName("Pit Fighting Complications").roll().results[0].text;
            
                let DC1 = new Roll("2d10 + 5", {}).roll().total;
                let DC2 = new Roll("2d10 + 5", {}).roll().total;
                let DC3 = new Roll("2d10 + 5", {}).roll().total;
            
                let hdR = new Roll(`1${hitdie}`, {}).roll().total;
                let athR = fRollType(html, ath)
                let acrR = fRollType(html, acr)
                let conR = fRollType(html, hdR)
            
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
                        <option value="low">Lower-class</option>
                        <option value="middle">Middle-class</option>
                        <option value="high">High-class</option>
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
    content: `
    <H2>Resources</H2>
        Carousing covers a workweek of fine food, strong drink, and socializing. A character can attempt to carouse among lower-, middle-, or upper-class folk. 
        A character can carouse with the lower class for 10 gp to cover expenses, or 50 gp for the middle class. 
        Carousing with the upper class requires 250 gp for the workweek and access to the local nobility.
        A character with the noble background can mingle with the upper class, but other characters can do so only if you judge that the character has made sufficient contacts. 
        Alternatively, a character might use a disguise kit and the Deception skill to pass as a noble visiting from a distant city.
    <H2>Resolution</H2>
        After a workweek of carousing, a character stands to make contacts within the selected social class. 
        The character makes a Charisma (Persuasion) check using the Carousing table. 
    <H3>Contacts</H3>
    Contacts are NPCs who now share a bond with the character. Each one either owes the character a favor or has some reason to bear a grudge. A hostile contact works against the character, placing obstacles but stopping short of committing a crime or a violent act. Allied contacts are friends who will render aid to the character, but not at the risk of their lives.
    <I>Lower-class</I> contacts include criminals, laborers, mercenaries, the town guard, and any other folk who normally frequent the cheapest taverns in town.
    <I>Middle-class</I> contacts include guild members, spellcasters, town officials, and other folk who frequent well-kept establishments.
    <I>Upper-class</I> contacts are nobles and their personal servants. Carousing with such folk covers formal banquets, state dinners, and the like.
    <H2>User Inputs</H2>
        ${dropdownCarousing}
        ${dropdownAdvDis}`,
    buttons: {
        goCarousing: {
            id: "1",
            label: "Go Carousing!",
            callback (html) {
                let contact = "";
                check = fRollType(html, token.actor.data.data.skills.per.total)
                let d100 = new Roll(`1d100`).roll().total;
                let locale = html.find('#locale').val();
                let result = "";
                let gold = 0
                // Get the class
                let oClass = ""
                oClass = fGetLabel("locale")
                // Determine how much money they spend
                if (locale == "low") {
                    gold = 10
                } else if (locale == "middle") {
                    gold = 50
                } else {
                    gold = 250
                }
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
                } else {
                    messageComp += `No complication.`
                }
                // Determine the type of contact the character makes
                check = Math.ceil(check / 5)
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
                let resultMessage = `${name} has spent ${gold} gp carousing with some ${oClass} folks and made <I>${contact}</I> contact(s).`
                printMessage(`${DTmessage} ${resultMessage} <BR> ${messageComp}`)
                // Log the above
                console.log(`CAROUSING LOG
                            d100: ${d100}
                            Check: ${check}
                            Locale: ${locale}
                            Class: ${oClass}
                            Gold: ${gold}`)
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
    content: `
    <H2>Resources</H2>
        A character must spend one week and at least <B>25 gp</B> gathering information on potential targets before committing the intended crime.
    <H2>Resolution</H2>
        The character must make a series of checks, with the DC for all the checks chosen by the character according to the amount of profit sought from the crime.
        The chosen DC can be 10, 15, 20, or 25. Successful completion of the crime yields a number of gold pieces, as shown on the Loot Value table.
        To attempt a crime, the character makes three checks: Dexterity (Stealth), Dexterity using thieves' tools, 
        and the player's choice of Intelligence (Investigation), Wisdom (Perception), or Charisma (Deception).
        If none of the checks are successful, the character is caught and jailed. 
        The character must pay a fine equal to the profit the crime would have earned and must spend one week in jail for each 25 gp of the fine.
        If only one check is successful, the heist fails but the character escapes.
        If two checks are successful, the heist is a partial success, netting the character half the payout.
        If all three checks are successful, the character earns the full value of the loot.
    <H2>User Inputs</H2>
        ${dropdownCrime1} 
        ${dropdownCrime2}
        ${dropdownAdvDis}`,
    buttons: {
        crimeTime: {
            id: "1",
            label: "Crime Time!",
            callback (html) {
                let message = "";
                activity = activity;
                let mark = html.find('#mark').val();
                let check3skill = html.find('#check3').val();
                let check1 = fRollType(html, token.actor.data.data.skills.ste.total)
                let thievesTools = 0; // TO-DO
                let check2 = fRollType(html, token.actor.data.data.abilities.dex.mod)
                let check3 = "";
                // Get the 3rd check
                if (check3skill == "inv") {
                    check3 = fRollType(html, token.actor.data.data.skills.inv.total)
                } else if (check3skill === "perc") {
                    check3 = fRollType(html, token.actor.data.data.skills.prc.total)
                } else if (check3skill === "dec") {
                    check3 = fRollType(html, token.actor.data.data.skills.dec.total)
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
                    profit = 50
                } else if (mark == "prosperous") {
                    dc = 15;
                    profit = 100
                } else if (mark == "noble") {
                    dc = 20;
                    profit = 200
                } else if (mark == "rich-figure") {
                    dc = 25;
                    profit = 1000
                }
                let jailTime = profit / 25;
                console.log(`DC: ${dc}`);
                console.log(`Profit: ${profit} gp`);
                console.log(`Jail Time: ${jailTime} weeks`);
                // Determine the outcome
                let compMessage = "";
                if (check1 >= dc && check2 >= dc && check3 >= dc) {
                    message = `The heist is an unequivocal success! ${name} earns ${profit - 25} gp!`
                } else if (check1 >= dc && check2 >= dc || check2 >= dc && check3 >= dc || check1 >= dc && check3 >= dc) {
                    message = `${name} escapes with half of the desired haul, netting ${(profit - 25) / 2} gp`;
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
    content: `
    <H2>Resources</H2>
        Performing religious service requires access to, and often attendance at, a temple whose beliefs and ethos align with the character's. 
        If such a place is available, the activity takes one workweek of time but involves no gold piece expenditure.
    <H2>Resolution</H2>
        At the end of the required time, the character chooses to make either an Intelligence (Religion) check or a Charisma (Persuasion) check. 
        The total of the check determines the benefits of service, as shown on the Religious Service table. <BR>
        <U><H3>Favors</H3></U>
            A favor, in broad terms, is a promise of future assistance from a representative of the temple. 
            It can be expended to ask the temple for help in dealing with a specific problem, for general political or social support, or to reduce the cost of cleric spellcasting by 50 percent. 
            A favor could also take the form of a deity's intervention, such as an omen, a vision, or a minor miracle provided at a key moment. This latter sort of favor is expended by the DM, who also determines its nature.
            Favors earned need not be expended immediately, but only a certain number can be stored up. 
            A character can have a maximum number of unused favors equal to 1 + the character's Charisma modifier (minimum of one unused favor).
    <H2>User Inputs</H2>
        ${dropdownReligion}
        ${dropdownAdvDis}`,
    buttons: {
        ok: {
            id: "1",
            label: "OK",
            callback (html) {
                let skill = html.find('#check').val();
                let check = fRollType(html, token.actor.data.data.skills[skill].total)
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
let dropdownResearch = `<form action="/action_page.php">
                <label for="gold">Additional Gold:</label>
                <select name="gold" id="gold">
                    <option value="50">50 gp</option>
                    <option value="100">100 gp</option>
                    <option value="150">150 gp</option>
                    <option value="200">200 gp</option>
                    <option value="250">250 gp</option>
                    <option value="300">300 gp</option>
                </select>
            </form>`
let dResearch = new Dialog ({
    title: `Research`,
    content: `
    <H2>Resources</H2>
        Typically, a character needs access to a library or a sage to conduct research. 
        Assuming such access is available, conducting research requires one workweek of effort 
        and at least 50 gp spent on materials, bribes, gifts, and other expenses.
    <H2>Resolution</H2>
        The character declares the focus of the research—a specific person, place, or thing. 
        After one workweek, the character makes an Intelligence check with a +1 bonus per 50 gp spent beyond the initial 50 gp, to a maximum of +6. 
        In addition, a character who has access to a particularly well-stocked library or knowledgeable sages gains advantage on this check. 
        Determine how much lore a character learns using the Research Outcomes table.
    <H2>User Inputs</H2>
        ${dropdownResearch}
        ${dropdownAdvDis}`,
    buttons: {
        ok: {
            id: "1",
            label: "OK",
            callback (html) {
                // Normal, Advantage, Disadvantage
                check1 = fRollType(html, token.actor.data.data.abilities.int.mod)
                // Other variables
                let gold = Number(html.find("#gold").val())
                let bonus = gold / 50
                let d100 = new Roll(`1d100`).roll().total;
                let loreQuantity = "";
                let check = Math.ceil(check1 / 5) + bonus
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
                // Log to console for debugging purposes
                console.log(`WORK LOG
                            Check1: ${check1}
                            Check: ${check}
                            d100: ${d100}
                            Lore: ${loreQuantity}
                            Gold: ${gold}
                            Bonus: ${bonus}`)
                let resultMessage = `${name} spends ${gold + 50} gp researching and learns ${loreQuantity} piece(s) of lore.`
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
}
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
    content: `
            <H2>Resources</H2>
                Performing a job requires one workweek of effort.
            <H2>Resolution</H2>
                To determine how much money a character earns, the character makes an ability check: 
                Strength (Athletics), Dexterity (Acrobatics), Intelligence using a set of tools, Charisma (Performance), or Charisma using a musical instrument. 
                Consult the Wages table to see how much money is generated according to the total of the check.
            <H2>User Inputs</H2>
                ${dropdownWork} 
                ${radiosWork}
                ${dropdownAdvDis}`,
    buttons: {
        ok: {
            id: "1",
            label: "OK",
            callback (html) {
                DTmessage += `You have earned `
                let d100 = new Roll(`1d100`).roll().total;
                let skillLevel = $('input[name="skill-level"]:checked').val()
                let ath = token.actor.data.data.skills.ath.mod
                let acr = token.actor.data.data.skills.acr.mod
                let tool = token.actor.data.data.abilities.int.mod
                let per = token.actor.data.data.skills.prf.mod
                let instrument = token.actor.data.data.abilities.cha.mod
                let skill = eval(html.find("#check").val())

                let bonus = 0
                // Check for proficiency or expertise
                if (skillLevel == "prof") {
                    bonus = token.actor.data.data.attributes.prof;
                } else if (skillLevel == "exp") {
                    bonus = token.actor.data.data.attributes.prof * 2;
                }
                // Normal, Advantage, Disadvantage
                check = fRollType(html, skill + bonus)
                // Check for a complication
                if (d100 <= 20) {
                    messageComp += randomProperty(dictWork);
                } else {
                    messageComp += `No Complication`
                }
                // Determine the outcome
                let total = check + skill;
                // Get outcome
                if (total <= 9) {
                    resultMessage = `20 sp`
                } else if (total <= 14) {
                    resultMessage = `10 gp`
                } else if (total <= 20) {
                    resultMessage = `20 gp`
                } else {
                    resultMessage = `45 gp`
                }
                console.log(`WORK LOG
                            Skill Level: ${skillLevel}
                            d100: ${d100}
                            Check: ${check}
                            Skill: ${skill}
                            Bonus: ${bonus}
                            Total: ${total}`)
                // Print the end result to chat
                // let resultMessage = `${name} works and earns ${wage} ${currency}.`
                printMessage(`${DTmessage} <B>${resultMessage}</B> <BR> ${messageComp}`)
            }
        }
    }
});

// Trainig dialog b/c bullshit
let dTraining = new Dialog({
    title: "Training",
    content: "",
    buttons: {
        ok: {
            id: "1",
            label: "OK",
            callback (html) {
                
            }
        }
    }
})

// SCRIBING A SPELL SCROLL

// Create the initial dialog where the user selects the downtime activity they wish to perform
let dropdownSpellLevel = `<form action="/action_page.php">
                <label for="spelllevel">Spell Level:</label>
                <select name="spelllevel" id="spelllevel">
                    <option value="cantrip">Cantrip</option>
                    <option value="1st">1st</option>
                    <option value="2nd">2nd</option>
                    <option value="3rd">3rd</option>
                    <option value="4th">4th</option>
                    <option value="5th">5th</option>
                    <option value="6th">6th</option>
                    <option value="7th">7th</option>
                    <option value="8th">8th</option>
                    <option value="9th">9th</option>
                </select>
            </form>`
// Scribing Data
let oaScribingSpellScroll = [
    {"spell_level":"cantrip","hours":8,"days":1,"workweeks":0.1,"cost":"15 gp"},
    {"spell_level":"1st","hours":8,"days":1,"workweeks":0.1,"cost":"25 gp"},
    {"spell_level":"2nd","hours":24,"days":3,"workweeks":0.3,"cost":"250 gp"},
    {"spell_level":"3rd","hours":80,"days":10,"workweeks":1,"cost":"500 gp"},
    {"spell_level":"4th","hours":160,"days":20,"workweeks":2,"cost":"2,500 gp"},
    {"spell_level":"5th","hours":320,"days":40,"workweeks":4,"cost":"5,000 gp"},
    {"spell_level":"6th","hours":640,"days":80,"workweeks":8,"cost":"15,000 gp"},
    {"spell_level":"7th","hours":1280,"days":160,"workweeks":16,"cost":"25,000 gp"},
    {"spell_level":"8th","hours":2560,"days":320,"workweeks":32,"cost":"50,000 gp"},
    {"spell_level":"9th","hours":3840,"days":480,"workweeks":48,"cost":"250,000 gp"}
]

let tScribeSpellScroll = `<style type="text/css">
                        table.tableizer-table {
                            font-size: 12px;
                            border: 1px solid #CCC; 
                            font-family: Georgia, serif;
                        } 
                        .tableizer-table td {
                            padding: 4px;
                            margin: 3px;
                            border: 1px solid #CCC;
                        }
                        .tableizer-table th {
                            background-color: #104E8B; 
                            color: #FFF;
                            font-weight: bold;
                        }
                        </style>
                        <table class="tableizer-table">
                            <thead><tr class="tableizer-firstrow"><th>Spell Level</th><th>Hours</th><th>Days</th><th>Workweeks</th><th>Cost</th></tr></thead><tbody>
                                <tr><td>Cantrip</td><td>8</td><td>1</td><td>0.1</td><td>15 gp</td></tr>
                                <tr><td>1st</td><td>8</td><td>1</td><td>0.1</td><td>25 gp</td></tr>
                                <tr><td>2nd</td><td>24</td><td>3</td><td>0.3</td><td>250 gp</td></tr>
                                <tr><td>3rd</td><td>80</td><td>10</td><td>1</td><td>500 gp</td></tr>
                                <tr><td>4th</td><td>160</td><td>20</td><td>2</td><td>2,500 gp</td></tr>
                                <tr><td>5th</td><td>320</td><td>40</td><td>4</td><td>5,000 gp</td></tr>
                                <tr><td>6th</td><td>640</td><td>80</td><td>8</td><td>15,000 gp</td></tr>
                                <tr><td>7th</td><td>1280</td><td>160</td><td>16</td><td>25,000 gp</td></tr>
                                <tr><td>8th</td><td>2560</td><td>320</td><td>32</td><td>50,000 gp</td></tr>
                                <tr><td>9th</td><td>3840</td><td>480</td><td>48</td><td>250,000 gp</td></tr>
                        </tbody></table>`
// Complications Dictionary
let dictScribing = {
    1: "You bought up the last of the rare ink used to craft scrolls, angering a wizard in town.", 
    2: "The priest of a temple of good accuses you of trafficking in dark magic.*", 
    3: "A wizard eager to collect one of your spells in a book presses you to sell the scroll.", 
    4: "Due to a strange error in creating the scroll, it is instead a random spell of the same level.", 
    5: "The rare parchment you bought for your scroll has a barely visible map on it.", 
    6: "A thief attempts to break into your workroom.*" 
}
// Dialog
let dScribeSpellScroll = new Dialog({
    title: "Scribe a Spell Scroll",
    content: `
    <H2>Resources</H2>
        Scribing a spell scroll takes an amount of time and money related to the level of the spell the character wants to scribe, as shown in the Spell Scroll Costs table. 
        In addition, the character must have proficiency in the Arcana skill and must provide any material components required for the casting of the spell.
         Moreover, the character must have the spell prepared, or it must be among the character's known spells, in order to scribe a scroll of that spell.
        If the scribed spell is a cantrip, the version on the scroll works as if the caster were 1st level.
    <H2>Table(s)</H2>
        ${tScribeSpellScroll}
    <H2>User Inputs</H2>
        ${dropdownSpellLevel}`,
    buttons: {
            ok: {
                id: "1",
                label: "OK",
                callback (html) {
                    // Complications
                    let d100 = new Roll(`1d100`).roll().total
                    if (d100 <= 20) {
                        messageComp += randomProperty(dictScribing);
                    } else {
                        messageComp += `No Complication`
                    }
                    // Get the Spell Level from User Input
                    let sSpellLevel = html.find("#spelllevel").val()
                    // Pull data from oaScribingSpellScroll based on sSpellLevel
                    let iHours = oaScribingSpellScroll.find(i => i.spell_level == sSpellLevel).hours
                    let iDays = oaScribingSpellScroll.find(i => i.spell_level == sSpellLevel).days
                    let sCost = oaScribingSpellScroll.find(i => i.spell_level == sSpellLevel).cost
                    let iWorkWeeks = oaScribingSpellScroll.find(i => i.spell_level == sSpellLevel).workweeks
                    // Print the message
                    resultMessage += `It will take you <B>${iHours} hours</B> worth of work and cost you <B>${sCost}</B> to Scribe a <I>${sSpellLevel}-level Spell Scroll</I>. <BR>
                                        <B>${iHours} hours</B> is equal to <B>${iDays} days</B> or <B>${iWorkWeeks} workweeks</B>. Note that you can do no more than 8 hours of work per day.`
                    printMessage(`${DTmessage} ${resultMessage} <BR> ${messageComp}`)
                    // Log to console
                    console.log(`SCRIBING LOG
                                Spell Level: ${sSpellLevel}
                                Hours: ${iHours}
                                Days: ${iDays}
                                Cost: ${sCost}
                                Workweeks: ${iWorkWeeks}
                                d100: ${d100}`)
                }
            }
        }   
})

// PRIMARY DIALOG FUNCTIONS AND DIALOG

// Create the initial dialog where the user selects the downtime activity they wish to perform
let dropdownInitial = `<form action="/action_page.php">
                <label for="dta">Choose a Downtime Activity:</label>
                <select name="dta" id="dta">
                    <option value="dBuyMagicItem">Buy a Magic Item (N/A)</option> // TO-DO
                    <option value="dCarousing">Carousing</option>
                    <option value="dCraftItem">Craft an Item (N/A)</option> // TO-DO
                    <option value="dCrime">Crime</option>
                    <option value="dGambling">Gambling</option>
                    <option value="dPitFighting">Pit Fighting</option>
                    <option value="dRelax">Rest & Relaxation (N/A)</option> // TO-DO
                    <option value="dReligiousService">Religious Service</option>
                    <option value="dResearch">Research</option>
                    <option value="dScribeSpellScroll">Scribe a Spell Scroll</option>
                    <option value="dSellMagicItem">Sell a Magic Item (N/A)</option> // TO-DO
                    <option value="dTraining">Training</option>
                    <option value="dWork">Work</option>
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
                if (activity === 'Training') {
                    game.macros.getName("Fast_Training").execute()
                } else {
                    vdta.render(true);
                }
            }
        }
    }
})
dDowntimeActivity.render(true)