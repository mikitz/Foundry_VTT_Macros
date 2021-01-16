// This is for acquiring materials only

// TODO Crafting left to do
    // [✔] Alchemy (pg. 6)
        // [✔] Foraging 
        // [✔] Butchering
    // [] Blacksmith (pg. 32)
        // [] Mining
        // [] Salvaging
        // [] Butchering
    // [] Cooking (pg. 34)
        // [] Butchering
        // [] Foraging [My addition]
    // [] Enchanting (pg. 49)
        // [] Butchering [Same as Butchering under Alchemy]
        // [] Salvaging Essences
        // [] Synthesizing Essences
        // [] Making Essences
    // [] Scroll Scribing (pg. 50)
        // [] Alchemy makes the inks
        // [] Alchemy/Tanner makes parchments
    // [] Wand Wittling (pg. 52)
        // [] Woods
        // [] Essence [Same as Enchanting Essences]

// Organization
    // Select Gathering Method
        // Description: duration, checks used, etc.
            // Foraging
                // Reagants, Cooking Ingredients, Woods
            // Butchering
                // Reagants (Alchemy, Enchanting), Cooking Ingredients, Metallurgy Materials
            // Mining
                // Metallurgy Materials
            // Salvaging
                // Metallurgy Materials
            //  
    // What Skill to use for Crafting
        //

// Get the name of the called macro
let macroName = this.name;
// Display a UI message if no actor is selected
if (!actor) {
    ui.notifications.warn(`An actor must be selected prior to calling the ${macroName} macro.`);
}
// Define the print message function
function printMessage(message){
	let chatData = {
	    user : game.user._id,
	    content : message,
	};
	ChatMessage.create(chatData,{});
}
// Declare a function to select a random value from a dictionary
// Source: https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};
// Define the necessary dictionaries
var dictReagantTypes = {
    1: "curative",
    2: "reactive",
    3: "exotic",
    4: "poisonous",
};
// Define global variables
let name = `<B>${token.actor.name}</B>`;
let toolProfs = token.actor.data.data.traits.toolProf.value;
let gathered = '';
let quantity = 0;
let rarity = '';
let type = ''
let message = ''
let rarity1 = ''
let quantity1 = ''

// INITIAL DIALOG
// Create the initial dialog where the user selects the activity they wish to perform related to crafting
let ddInitial = `<form action="/action_page.php">
                <label for="crafting">Choose a Crafting Activity:</label>
                <select name="crafting" id="crafting">
                    <option value="dGather">Gather Materials</option> // TO-DO
                    <option value="dCrafting">Craft Something</option>
                </select>
            </form>`
// Define the dialog window
let dInitialDialog = new Dialog({
    title: "Crafting Time",
    content: ddInitial,
    buttons: {
        ok: {
            id: "1",
            label: "Next",
            callback (html) {
                let selection = html.find('#crafting').val();
                let vdta = eval(selection);
                let sel = document.getElementById("crafting");
                let activity = sel.options[sel.selectedIndex].text;
                console.log(`ACTIVITY LOG
                             Value: ${selection}
                             Activity: ${activity}`)
                vdta.render(true);
            }
        }
    }
});
// Define the function for foraging in the wilderness to retrieve reagants
function fForaging() {
    // Random type
    let type = randomProperty(dictReagantTypes)
    // Set a bonus if the actor has Herbalism Kit Proficiency
    let bonus = 0;
    if (toolProfs.includes("herb")) bonus = token.actor.data.data.attributes.prof;
    // Determine the outcome of the herbalism check
    let herbalismCheck = new Roll(`1d20 + ${bonus}`).roll().total;
    if (herbalismCheck <= 5) {
        rarity = 'common';
        quantity = 1
        gathered = `${quantity} ${rarity}`
    } else if (herbalismCheck > 5 && herbalismCheck <= 10) {
        rarity = 'common'
        quantity = 2
        gathered = `${quantity} ${rarity}`
    } else if (herbalismCheck > 10 && herbalismCheck <= 15) {
        rarity = 'common'
        rarity1 = 'uncommon'
        quantity = 1
        quantity1 = 1
        gathered = `${quantity} ${rarity} and ${quantity1} ${rarity1}`
    } else if (herbalismCheck > 15 && herbalismCheck <= 20) {
        rarity = 'uncommon'
        quantity = 2
        gathered = `${quantity} ${rarity}`
    } else if (herbalismCheck > 20 && herbalismCheck <= 25) {
        rarity = 'uncommon'
        rarity1 = 'rare'
        quantity = 1
        quantity1 = 1
        gathered = `${quantity} ${rarity} and ${quantity1} ${rarity1}`
    } else {
        rarity = 'rare'
        rarity1 = 'very rare'
        quantity = 1
        quantity1 = 1
        gathered = `${quantity} ${rarity} and ${quantity1} ${rarity1}`
    }

    console.log(`HERBALISM CHECK
                Gathered: ${gathered}
                Bonus: ${bonus}
                Check: ${herbalismCheck}`)
    return gathered, type;
};

let arrayButchering = [
    {id: 15, result: '1 common'},
    {id: 16, result: '1 common'},
    {id: 17, result: '2 common'},
    {id: 18, result: '1 uncommon'},
    {id: 20, result: '1 rare'},
    {id: 22, result: '2 rare'},
    {id: 24, result: '1 very rare'},
    {id: 30, result: '1 legendary'},
]
let ddButchering = `<form action="/action_page.php">
                <label for="butchering">Select Creature CR:</label>
                <select name="butchering" id="butchering">
                    <option value="15">1/2</option>
                    <option value="16">1</option>
                    <option value="17">2-4</option>
                    <option value="18">5-8</option>
                    <option value="20">9-12</option>
                    <option value="22">13-16</option>
                    <option value="24">17-20</option>
                    <option value="30">21+</option>
                </select>
            </form>`

let dButchering = new Dialog ({
    title: "Butcher a Creature",
    content: ddButchering,
    buttons: {
        ok: {
            id: "1",
            label: "Butcher!",
            callback (html) {
                let selection = html.find('#butchering').val();
                let vdta = eval(selection);
                let DC = selection;
                let sel = document.getElementById("butchering");
                let activity = sel.options[sel.selectedIndex].text;
                // Random type
                let type = randomProperty(dictReagantTypes)
                // Roll the check 
                let medicineCheck = new Roll(`1d20 + ${token.actor.data.data.skills.med.mod}`).roll().total;
                if (medicineCheck >= DC) {
                    gathered = arrayButchering.find(result => result.id == DC).result
                    message = `<H2> Crafting Activity: Butchering</H2> <H3><U>Outcome</U></H3>`;
                    message += `${name} has gathered <I>${gathered} ${type}</I> reagant(s)!`;
                    printMessage(message)
                } else {
                    message = `<H2> Crafting Activity: ${activity}</H2> <H3><U>Outcome</U></H3>`;
                    message += `${name} has gathered <I>no</I> reagant(s)!`;
                    printMessage(message)
                }
                console.log(`MONSTER HARVESTING
                            DC: ${DC}
                            Quantity: ${quantity}
                            Gathered: ${gathered}
                            Check: ${medicineCheck}`)
            }
        }
    }
})
// Define the dropdown menu for selecting the gathering method
let ddGather = `<form action="/action_page.php">
                <label for="gather">Choose a Gathering Method:</label>
                <select name="gather" id="gather">
                    <option value="fForaging">Foraging</option> // TO-DO
                    <option value="dButchering">Butchering</option>
                </select>
            </form>`
// Define the dialog for gathering reagants
let dGather = new Dialog ({
    title: "Gathering Materials",
    content: ddGather,
    buttons: {
        ok: {
            id: "1",
            label: "Next",
            callback (html) {
                let selection = html.find('#gather').val();
                let vdta = eval(selection);
                let sel = document.getElementById("gather");
                let activity = sel.options[sel.selectedIndex].text;
                console.log(`ACTIVITY LOG
                             Value: ${selection}
                             Activity: ${activity}`)
                if (selection == "fForaging") {
                    gathered, type = fForaging();
                    message = `<H2> Crafting Activity: ${activity}</H2> <H3><U>Outcome</U></H3>`;
                    message += `${name} has gathered <I>${gathered} ${type}</I> reagant(s)!`;
                    printMessage(message)
                } else {
                    dButchering.render(true)
                }
            }
        }
    }
});

// DETERMINE MODIFIERS
// define necessary variables
let time = 0;
let dice = 0;
// define the function
function fModifier() {
    time = 0;
    dice = 0;
    if (roll < DC) {
        time = time / 2;
        dice = dice / 2;
    }
}

dInitialDialog.render(true);