// MACRO START
/*

*/
// Get the name of the called macro
let macroName = this.name;
// Display a UI message if no actor is selected
if (!actor) {
    ui.notifications.warn(`An actor must be selected prior to calling the ${macroName} macro.`);
}
// FUNCTIONS
// Define the print message function
function printMessage(message){
    let chatData = {
        user : game.user._id,
        content : message,
    };
    ChatMessage.create(chatData,{});
}
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
    console.log(`ROLL TYPE LOG
                Roll Type: ${rollType}
                Check A: ${checkA}
                Check B: ${checkB}`)
    return check
}
// Declare a function to select a random value from a dictionary
// Source: https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};
// Declare some functions to round numbers
function fRound5(x) { 
    return Math.ceil(x / 5) * 5
} 
function fRound10(x) { 
    return Math.ceil(x / 10) * 10 
} 

// DIALOG
let dCrownAnchor = new Dialog ({
    title: "",
    content: "",
    buttons: {
        ok: {
            id: 1,
            label: 'OK',
            callback(html){
                
            }
        }
    }
})

// DROPDOWN
let dropdownInitial = `<form action="/action_page.php">
                <label for="game">Choose a Downtime Activity:</label>
                <select name="game" id="game">
                    <option value="crownanchor">Crown & Anchor</option>
                    <option value="goblinseye">Goblin's Eye</option>
                    <option value="dragonsbreath">Dragon's Breath</option>
                    <option value="tymorasspinner">Tymora's Spinner</option>
                    <option value="twenty-one">Twenty-one</option>
                    <option value="handoffate">Hand of Fate</option>
                    <option value="racinglizardsgame">Racing Lizards Game</option>
                    <option value="fruitmachine">Fruit Machine</option>
                    <option value="skeletonslots">Skeleton Slots</option>
                    <option value="threesaway">Threes Away</option>
                    <option value="dead-eyedice">Dead-eye Dice</option>
                </select>
            </form>`
// Retreiving the input
let game = html.find('#game').val()

// TEXT INPUT
let contentGambling = `
        <p>Please input the amount of your selected currency you wish to wager.</p>
        <p><i>Note: You will lose whatever you put into this box</i></p>
        <form>
            <div class="form-group">
                <label for="quan">Quantity: </label>
                <input id="quan" name="quan" type="number" min="0"></input>
            </div>
        </form>`;
// Retreiving the input
let quantity = Number(html.find("#quan")[0].value)

// RADIO GROUP
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
// Retreiving the input
let currency = $('input[name="currency"]:checked').val()