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
// Quantity Text Input Fields
let tiQuantity1 = `  <form>
                        <div class="form-group">
                            <input id="quan1" name="quan1" type="number" min="0"></input>
                        </div>
                    </form>`
let tiQuantity2 = `  <form>
                        <div class="form-group">
                            <input id="quan2" name="quan2" type="number" min="0"></input>
                        </div>
                    </form>`
let tiQuantity3 = `  <form>
                        <div class="form-group">
                            <input id="quan3" name="quan3" type="number" min="0"></input>
                        </div>
                    </form>`
let tiQuantity4 = `  <form>
                        <div class="form-group">
                            <input id="quan4" name="quan4" type="number" min="0"></input>
                        </div>
                    </form>`
let tiQuantity5 = `  <form>
                        <div class="form-group">
                            <input id="quan5" name="quan5" type="number" min="0"></input>
                        </div>
                    </form>`
let tiQuantity6 = `  <form>
                        <div class="form-group">
                            <input id="quan6" name="quan6" type="number" min="0"></input>
                        </div>
                    </form>`
// Currency Dropdowns
let ddCurrency1 = `<form action="/action_page.php">
                <select name="currency1" id="currency1">
                    <option value="nowager">NO WAGER</option>
                    <option value="copper">Copper</option>
                    <option value="silver">Silver</option>
                    <option value="electrum">Electrum</option>
                    <option value="gold">Gold</option>
                    <option value="platinum">Platinum</option>
                </select>
            </form>`
let ddCurrency2 = `<form action="/action_page.php">
                <select name="currency2" id="currency2">
                    <option value="nowager">NO WAGER</option>
                    <option value="copper">Copper</option>
                    <option value="silver">Silver</option>
                    <option value="electrum">Electrum</option>
                    <option value="gold">Gold</option>
                    <option value="platinum">Platinum</option>
                </select>
            </form>`
let ddCurrency3 = `<form action="/action_page.php">
                <select name="currency3" id="currency3">
                    <option value="nowager">NO WAGER</option>
                    <option value="copper">Copper</option>
                    <option value="silver">Silver</option>
                    <option value="electrum">Electrum</option>
                    <option value="gold">Gold</option>
                    <option value="platinum">Platinum</option>
                </select>
            </form>`
let ddCurrency4 = `<form action="/action_page.php">
                <select name="currency4" id="currency4">
                    <option value="nowager">NO WAGER</option>
                    <option value="copper">Copper</option>
                    <option value="silver">Silver</option>
                    <option value="electrum">Electrum</option>
                    <option value="gold">Gold</option>
                    <option value="platinum">Platinum</option>
                </select>
            </form>`
let ddCurrency5 = `<form action="/action_page.php">
                <select name="currency5" id="currency5">
                    <option value="nowager">NO WAGER</option>
                    <option value="copper">Copper</option>
                    <option value="silver">Silver</option>
                    <option value="electrum">Electrum</option>
                    <option value="gold">Gold</option>
                    <option value="platinum">Platinum</option>
                </select>
            </form>`
let ddCurrency6 = `<form action="/action_page.php">
                <select name="currency6" id="currency6">
                    <option value="nowager">NO WAGER</option>
                    <option value="copper">Copper</option>
                    <option value="silver">Silver</option>
                    <option value="electrum">Electrum</option>
                    <option value="gold">Gold</option>
                    <option value="platinum">Platinum</option>
                </select>
            </form>`
// Dictionaries
let dictCrownAnchor = [
    {"Dice Matches":0,"Winnings":0},
    {"Dice Matches":1,"Winnings":0.5},
    {"Dice Matches":2,"Winnings":1.5},
    {"Dice Matches":3,"Winnings":3}
]
// Dialog
let dCrownAnchor = new Dialog ({
    title: "Crown & Anchor",
    content: `
    <H2>Description</H2>
        <B>Crown & Anchor</B> is a betting game. A character puts any amount of any currency on a grid numbered 1 through 6, then rolls 3d6. 
        The character's winnings depend on how many of their rolled dice match the numbers they picked. See the table below.
    <H2>Outcomes</H2>
        <style type="text/css">
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
        <thead><tr class="tableizer-firstrow"><th>Dice Matches</th><th>Winnings</th></tr></thead><tbody>
            <tr><td>0</td><td>0</td></tr>
            <tr><td>1</td><td>0.5</td></tr>
            <tr><td>2</td><td>1.5</td></tr>
            <tr><td>3</td><td>3</td></tr>
        </tbody></table>
    <H2>User Inputs</H2>
        <style type="text/css">
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
                <tr><td>1</td><td>${tiQuantity1}</td><td>${ddCurrency1}</td></tr>
                <tr><td>2</td><td>${tiQuantity2}</td><td>${ddCurrency2}</td></tr>
                <tr><td>3</td><td>${tiQuantity3}</td><td>${ddCurrency3}</td></tr>
                <tr><td>4</td><td>${tiQuantity4}</td><td>${ddCurrency4}</td></tr>
                <tr><td>5</td><td>${tiQuantity5}</td><td>${ddCurrency5}</td></tr>
                <tr><td>6</td><td>${tiQuantity6}</td><td>${ddCurrency6}</td></tr>
            </tbody></table>`,
    buttons: {
        ok: {
            id: 1,
            label: 'OK',
            callback(html){
                // Roll 3d6 for the game
                let roll = new Roll(`3d6`).roll()
                // Retrieve the Quantities
                let vQuantity1 = Number(html.find("#quan1")[0].value)
                let vQuantity2 = Number(html.find("#quan2")[0].value)
                let vQuantity3 = Number(html.find("#quan3")[0].value)
                let vQuantity4 = Number(html.find("#quan4")[0].value)
                let vQuantity5 = Number(html.find("#quan5")[0].value)
                let vQuantity6 = Number(html.find("#quan6")[0].value)
                // Retrieve the Currencies
                let vCurrency1 = html.find("#currency1").val()
                let vCurrency2 = html.find("#currency2").val()
                let vCurrency3 = html.find("#currency3").val()
                let vCurrency4 = html.find("#currency4").val()
                let vCurrency5 = html.find("#currency5").val()
                let vCurrency6 = html.find("#currency6").val()
                // Get Currency Names
                let sCurrency1 = fGetLabel("currency1")
                let sCurrency2 = fGetLabel("currency2")
                let sCurrency3 = fGetLabel("currency3")
                let sCurrency4 = fGetLabel("currency4")
                let sCurrency5 = fGetLabel("currency5")
                let sCurrency6 = fGetLabel("currency6")
                // Log to Console
                console.log(`CROWN & ANCHOR LOG
                            Roll 1: ${roll.terms[0].results[0].result}
                            Roll 2: ${roll.terms[0].results[1].result}
                            Roll 3: ${roll.terms[0].results[2].result}
                            Quantity 1: ${vQuantity1}
                            Quantity 2: ${vQuantity2}
                            Quantity 3: ${vQuantity3}
                            Quantity 4: ${vQuantity4}
                            Quantity 5: ${vQuantity5}
                            Quantity 6: ${vQuantity6}
                            Currency 1: ${sCurrency1} - ${vCurrency1}
                            Currency 2: ${sCurrency2} - ${vCurrency2}
                            Currency 3: ${sCurrency3} - ${vCurrency3}
                            Currency 4: ${sCurrency4} - ${vCurrency4}
                            Currency 5: ${sCurrency5} - ${vCurrency5}
                            Currency 6: ${sCurrency6} - ${vCurrency6}
                            `)
            }
        }
    }
})

// GOBLIN'S EYE
// Dart Quantity Text Input
let tiDarts = `
                <form>
                    <div class="form-group">
                        <label for="darts">Number of Darts: </label>
                        <input id="darts" name="darts" type="number" min="0"></input>
                    </div>
                </form>`;
// Dialog
let dGoblinsEye = new Dialog ({
    title: "Goblin's Eye",
    content: `
        <H2>Description</H2>
            <B>Goblin's Eye</B> is a game of darts. Characters take turns throwing three darts at the Goblin's Eye board. 
            Each throw of a dart is comprised of two rolls: 1d20 and 1d6+3.
        <H2>Outcomes</H2>
            <style type="text/css">
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
            <thead><tr class="tableizer-firstrow"><th>Die</th><th>Purpose</th></tr></thead><tbody>
                <tr><td>1d20</td><td>Determines what number is hit on the board.</td></tr>
                <tr><td>1d6</td><td>Determines where on the number it hits.</td></tr>
            </tbody></table>
            
            <style type="text/css">
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
            <thead><tr class="tableizer-firstrow"><th>d6 Roll</th><th>Modifier</th></tr></thead><tbody>
                <tr><td>1-4</td><td>1</td></tr>
                <tr><td>5-7</td><td>2</td></tr>
                <tr><td>8-9</td><td>3</td></tr>
                <tr><td>10+</td><td>Goblin's Eye!</td></tr>
            </tbody></table>
        <H2>User Inputs</H2>
            ${tiDarts}`,
    buttons: {
        ok: {
            id: 1,
            label: "OK",
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
                    <option value="dGoblinsEye">Goblin's Eye</option>
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