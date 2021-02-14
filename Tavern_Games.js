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
// Define Global Variables
let DTmessage = ``
// CROWN & ANCHOR
// Quantity Text Input Field
let tiQuantity = `  <form>
                        <div class="form-group">
                            <input id="quan" name="quan" type="number" min="0"></input>
                        </div>
                    </form>`
// Currency Dropdown
let ddCurrency = `<form action="/action_page.php">
                <select name="curency" id="curency">
                    <option value="nowager">NO WAGER</option>
                    <option value="copper">Copper</option>
                    <option value="silver">Silver</option>
                    <option value="electrum">Electrum</option>
                    <option value="gold">Gold</option>
                    <option value="platinum">Platinum</option>
                </select>
            </form>`
// Dialog
let dCrownAnchor = new Dialog ({
    title: "",
    content: `<style type="text/css">
                table.tableizer-table {
                    font-size: 12px;
                    border: 1px solid #CCC; 
                    font-family: Arial, Helvetica, sans-serif;
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
            <thead><tr class="tableizer-firstrow"><th>Number</th><th>Quantity</th><th>Currency</th></tr></thead><tbody>
                <tr><td>1</td><td>${tiQuantity}</td><td>${ddCurrency}</td></tr>
                <tr><td>2</td><td>${tiQuantity}</td><td>${ddCurrency}</td></tr>
                <tr><td>3</td><td>${tiQuantity}</td><td>${ddCurrency}</td></tr>
                <tr><td>4</td><td>${tiQuantity}</td><td>${ddCurrency}</td></tr>
                <tr><td>5</td><td>${tiQuantity}</td><td>${ddCurrency}</td></tr>
                <tr><td>6</td><td>${tiQuantity}</td><td>${ddCurrency}</td></tr>
            </tbody></table>`,
    buttons: {
        ok: {
            id: 1,
            label: 'OK',
            callback(html){

            }
        }
    }
})


// PRIMARY DIALOG FUNCTIONS AND DIALOG
// Create the initial dialog where the user selects the Tavern Game they wish to play
let dropdownInitial = `<form action="/action_page.php">
                <label for="game">Choose a Downtime Activity:</label>
                <select name="game" id="game">
                    <option value="dCrownAnchor">Crown & Anchor</option>
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

let dDowntimeActivity = new Dialog ({
    title: "Downtime Activity",
    content: `Please select the downtime activity you wish to perform. <BR> ${dropdownInitial}`,
    buttons: {
        ok: {
            id: "14",
            label: "OK",
            callback (html) {
                let game = html.find('#game').val();
                let vgame = eval(game);
                let sel = document.getElementById("game");
                let activity = sel.options[sel.selectedIndex].text;
                console.log(`ACTIVITY LOG
                             Value: ${vgame}
                             Activity: ${activity}`)
                DTmessage = `<H2> Downtime Activity: ${activity}</H2> <H3><U>Outcome</U></H3>`;
                vgame.render(true);
            }
        }
    }
})
dDowntimeActivity.render(true)