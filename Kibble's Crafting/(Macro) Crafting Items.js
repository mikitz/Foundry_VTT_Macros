// This macro codifies crafting mechanics present in Kibble's Crafting PDF 
    // PDF Doc: https://www.gmbinder.com/share/-MGivvBo5k0a2tjzWX4l
// Get the name of the called macro
let vMacroName = this.name;
// Display a UI message if no actor is selected
if (!actor) {
    ui.notifications.warn(`An actor must be selected prior to calling the ${vMacroName} macro.`);
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
// Define some variables to be used later
let vName = `<B>${token.actor.name}</B>`;
let vToolProfs = token.actor.data.data.traits.toolProf.value;
let vSkill = ''
let vBonus = 0;

// DICTIONARIES
// Define the necessary dictionaries


// INITIAL DIALOG
// Define the dropdown for the intial dialog
let ddInitial = `<form action="/action_page.php">
                    <label for="crafting">Choose a Skill:</label>
                    <select name="crafting" id="crafting">
                        <option value="alchemy">Alchemy</option>
                        <option value="blacksmithing">Blacksmithing</option>
                        <option value="cooking">Cooking</option>
                        <option value="enchanting">Enchanting</option>
                        <option value="scroll-scribing">Scroll Scribing</option>
                        <option value="wand-wittling">Wand Wittling</option>
                    </select>
                </form>`
// Define the content for the initial dialog

// Define the dialog for the initial dialog
let dInitial = new Dialog ({
    title: "Kibble's Crafting",
    content: ddInitial,
    buttons: {
        next: {
            id: "1",
            label: "Next",
            callback (html) {
                vSkill = html.find('#crafting').val()
                // Determine if the actor has the necessary tool proficiency
                if (vToolProfs.includes("herb")) vBonus = token.actor.data.data.attributes.prof;
            }
        }
    }
})
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
dInitial.render(true)