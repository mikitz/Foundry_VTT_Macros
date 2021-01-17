// This macro codifies material-gathering mechanics present in Kibble's Crafting PDF 
    // PDF Doc: https://www.gmbinder.com/share/-MGivvBo5k0a2tjzWX4l

// Crafting left to do
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
// Define globally used object arrays
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
let type = ''
let message = ''
let quantity = ''
let DC = ''
let blah = ''
// FUNCTIONS
// Define a function for getting reagants from foraging
function fReagants(roll) {
    if (roll <= 4) {
        gathered = '1 common'
    } else if (roll >= 5 && roll <= 9) {
        gathered = '2 common'
    } else if (roll >= 10 && roll <= 14) {
        gathered = '1 common and 1 uncommon'
    } else if (roll >= 15 && roll <= 19) {
        gathered = '2 uncommon'
    } else if (roll >= 20 && roll <= 24) {
        gathered = '1 uncommon and 1 rare'
    } else if (roll >= 25 && roll <= 29) {
        gathered = '1 rare and 1 very rare'
    } else if (roll >= 30) {
        gathered = '1 very rare and 1 legendary'
    }
    return gathered 
}
// INITIAL DIALOG
// Create the initial dialog where the user selects the vActivity they wish to perform related to crafting
let ddInitial = `<form action="/action_page.php">
                <label for="gathering">Choose a Gathering Method:</label>
                <select name="gathering" id="gathering">
                    <option value="foraging">Foraging</option>
                    <option value="butchering">Butchering</option>
                    <option value="mining">Mining (Not Functioning)</option>
                    <option value="salvaging">Salvaging (Not Functioning)</option>
                </select>
            </form>`
let cInitial = `<B>Foraging.</B> 1 hour: You have a chance to find <I>Reagants</I>, <I>Cooking Ingredients</I>, and/or <I>Woods</I>. <P>
                <B>Butchering.</B> 1 hour: You have a chance to harvest <I>Reagants</I>, <I>Cooking Ingredients</I> and/or <I>Metallurgy Materials</I>. <P>
                <B>Mining.</B> 8 hours: You have a chance to find <I>Metallurgy Materials</I> and/or <I>Gemstones</I>. <P>
                <B>Salvaging.</B> 2 hours:  You have a chance to extract from items <I>Essences</I> and/or <I>Metallurgy Materials</I>. <P>`
// Define the dialog window
let dInitialDialog = new Dialog({
    title: "Gather Materials",
    content: `${ddInitial} <P> ${cInitial}`,
    buttons: {
        ok: {
            id: "1",
            label: "Next",
            callback (html) {
                let selection = html.find('#gathering').val()
                let sel = document.getElementById("gathering")
                let vActivity = sel.options[sel.selectedIndex].text
                let vdta = eval(`d${vActivity}`)
                console.log(`ACTIVITY LOG
                             Selected: ${selection}
                             Activity: ${vActivity}`)
                vdta.render(true)
            }
        }
    }
});
// FORAGING
// Define the dropdown for Foraging
let ddForaging = `<form action="/action_page.php">
                    <label for="foraging">Select what you are foraging for:</label>
                    <select name="foraging" id="foraging">
                        <option value="reagants">Reagants</option>
                        <option value="cooking-ingredient">Cooking Ingredient</option>
                        <option value="wood">Wood</option>
                    </select>
                </form>`
// Define the Dialog for Foraging
let dForaging = new Dialog ({
    title: "Foraging",
    content: `${ddForaging}
            <B>Foraging.</B> 1 hour: You have a chance to find <I>Reagants</I>, <I>Cooking Ingredients</I>, and/or <I>Woods</I>.`,
    buttons: {
        ok: {
            id: "1",
            title: "Foraging",
            label: "Forage!",
            callback (html) {
                let sel = document.getElementById("foraging");
                let foraging = sel.options[sel.selectedIndex].text;
                let vActivity = this.title
                // Random type
                if (foraging != 'Cooking Ingredient') {
                    let type = randomProperty(dictReagantTypes)
                }
                // Set a bonus if the actor has Herbalism Kit Proficiency
                let bonus = 0;
                if (toolProfs.includes("herb")) bonus = token.actor.data.data.attributes.prof;
                // Determine the outcome of the herbalism check
                let herbalismCheck = new Roll(`1d20 + ${bonus}`).roll().total;
                gathered = fReagants(herbalismCheck)
                // Log variables to the console for debugging
                console.log(`HERBALISM CHECK
                            Gathered: ${gathered}
                            Bonus: ${bonus}
                            Check: ${herbalismCheck}`)
                // Print the message to chat
                message = `<H2> Crafting Activity: ${vActivity}</H2> <H3><U>Outcome</U></H3>`;
                message += `${name} has gathered <I>${gathered} ${type}</I> ${foraging}(s)!`;
                printMessage(message)
            }
        }
    }
})
// BUTCHERING
// Define the object array for the Butchering roll
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
// Define the dropdown for Butchering
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
// Define the dialog for Butchering
let dButchering = new Dialog ({
    title: "Butcher a Creature",
    content: `<B>Butchering.</B> 1 hour: You have a chance to harvest <I>Reagants</I>, 
            <I>Cooking Ingredients</I> and/or <I>Metallurgy Materials</I>. <P> ${ddButchering}`,
    buttons: {
        ok: {
            id: "1",
            label: "Butcher!",
            title: "Butchering",
            callback (html) {
                let selection = html.find('#butchering').val();
                let vdta = eval(selection);
                let DC = selection;
                let sel = document.getElementById("butchering");
                let vActivity = this.title
                // Random type
                let type = randomProperty(dictReagantTypes)
                // Roll the check 
                let medicineCheck = new Roll(`1d20 + ${token.actor.data.data.skills.med.mod}`).roll().total;
                if (medicineCheck >= DC) {
                    gathered = arrayButchering.find(result => result.id == DC).result
                    message = `<H2> Crafting Activity: Butchering</H2> <H3><U>Outcome</U></H3>`;
                    message += `${name} has gathered: 
                                <P>• <I>${gathered} ${type}</I> reagant(s)
                                <P>• <I>${gathered}</I> meat(s) [Ask DM]
                                <P>• <I>${gathered}</I> metallurgy material(s) [Ask DM]`;
                    printMessage(message)
                } else {
                    message = `<H2> Crafting Activity: ${vActivity}</H2> <H3><U>Outcome</U></H3>`;
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
// SALVAGING
// Define the dropdown for Salvaging
let ddSalvaging = `<form action="/action_page.php">
                    <label for="salvaging">Select Item Rarity:</label>
                    <select name="salvaging" id="salvaging">
                        <option value="common">Common</option>
                        <option value="uncommon">Uncommon</option>
                        <option value="rare">Rare</option>
                        <option value="very-rare">Very Rare</option>
                        <option value="legendary">Legendary</option>
                    </select>
                </form>`
// Define the Salvaging object array 
let aoSalvaging = [
    {dc: 12, rarity: 'common'},
    {dc: 15, rarity: 'uncommon'},
    {dc: 20, rarity: 'rare'},
    {dc: 25, rarity: 'very-rare'},
    {dc: 30, rarity: 'legendary'},
]
// Define the Outcome object array
let aoOutcome = [
    {rarity: 'common', yield: ""},
]
// Define the checkbox for Salvaging
let ddSalvagingMagical = `<form action="/action_page.php">
                            <label for="salvage">Magical?:</label>
                            <select name="salvage" id="salvage">
                                <option value="magical">Magical</option>
                                <option value="non-magical">Non-magical</option>
                            </select>
                        </form>`
// Define the dialog for Salvaging
let dSalvaging = new Dialog ({
    // TODO
    title: "Salvage an Item",
    content: `<B>Salvaging.</B> 2 hours:  You have a chance to extract from items 
            <I>Essences</I> and/or <I>Metallurgy Materials</I>. <P> ${ddSalvaging} <P> ${ddSalvagingMagical}`,
    buttons: {
        ok: {
            id: "1",
            label: "Salvage!",
            title: "Salvaging",
            callback (html) {
                let selection = html.find('#salvaging').val()
                let sel = document.getElementById("salvaging")
                let magical = html.find('#salvage').val()
                let vActivity = this.title
                // Random type
                let type = randomProperty(dictReagantTypes)
                // Set a bonus if the actor has Smith's tools Proficiency
                let bonus = 0;
                if (toolProfs.includes("Smith's tools")) bonus = token.actor.data.data.attributes.prof;
                // Roll the check 
                let smithToolsCheck = new Roll(`1d20 + ${token.actor.data.data.skills.med.mod} + ${bonus}`).roll().total;
                let aracanaCheck = new Roll(`1d20 + ${token.actor.data.data.skills.arc.total}`).roll().total
                DC = aoSalvaging.find(i => i.rarity == selection).dc
                // Check the rolls based on whether the item is magical or not
                if (magical == 'magical') {
                    blah = 'Yes'
                    // If the item is magical
                    if (smithToolsCheck >= DC && aracanaCheck >= DC) {
                        // TODO
                        
                    } else {
                        message = `<H2> Crafting Activity: ${vActivity}</H2> <H3><U>Outcome</U></H3>`;
                        message += `${name} has gathered <I>nothing</I>!`;
                        printMessage(message)
                    }
                } else {
                    blah = 'No'
                    // If the item is non-magical
                    if (smithToolsCheck >= DC) {
                        gathered = arrayButchering.find(result => result.id == DC).result // TODO
                        message = `<H2> Crafting Activity: Butchering</H2> <H3><U>Outcome</U></H3>`;
                        message += `${name} has gathered: 
                                    <P>• <I>${gathered} ${type}</I> reagant(s)
                                    <P>• <I>${gathered}</I> meat(s) [Ask DM]
                                    <P>• <I>${gathered}</I> metallurgy material(s) [Ask DM]`;
                        printMessage(message)
                    } else {
                        message = `<H2> Crafting Activity: ${vActivity}</H2> <H3><U>Outcome</U></H3>`;
                        message += `${name} has gathered <I>nothing</I>!`;
                        printMessage(message)
                    }
                }
                console.log(`MONSTER HARVESTING
                            DC: ${DC}
                            Quantity: ${quantity}
                            Gathered: ${gathered}
                            Smith Tools Check: ${smithToolsCheck}
                            Arcana Check: ${aracanaCheck}
                            Magical: ${blah}`)
            }
        }
    }
})
// MINING
// Define the dialog for Mining
let dMining = new Dialog ({
    // TODO
    title: "Mine for Resources",
    content: `<B>Mining.</B> 8 hours: You have a chance to find <I>Metallurgy Materials</I> and/or <I>Gemstones</I>. <P>`,
    buttons: {
        ok: {
            id: "1",
            label: "Mine!",
            title: "Mining",
            callback (html) {
                let selection = html.find('#salvaging').val()
                let sel = document.getElementById("salvaging")
                let magical = html.find('#salvage').val()
                let vActivity = this.title
                // Random type
                let type = randomProperty(dictReagantTypes)
                // Set a bonus if the actor has Smith's tools Proficiency
                let bonus = 0;
                if (toolProfs.includes("Smith's tools")) bonus = token.actor.data.data.attributes.prof;
                // Roll the check 
                let smithToolsCheck = new Roll(`1d20 + ${token.actor.data.data.skills.med.mod} + ${bonus}`).roll().total;
                let aracanaCheck = new Roll(`1d20 + ${token.actor.data.data.skills.arc.total}`).roll().total
                DC = aoSalvaging.find(i => i.rarity == selection).dc

            }
        }
    }
})
dInitialDialog.render(true);