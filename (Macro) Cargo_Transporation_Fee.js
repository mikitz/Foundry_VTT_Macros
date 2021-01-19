/*
    INPUTS
        Ns = number of shifts:
        UC = unskilled crew:
        UCw = unskilled crew wage per day
        Fuc = cost of food per day per unskilled crew
        SC = skilled crew:
        SCw = unskilled crew wage per day
        Fsc = cost of food per day per skilled crew
        w = cargo weight:
        Rp = price rate per pound
        d = distance:
        Rm = price rate per mile
        s = speed of ship
    OUTPUTS

*/


// Define the print message function
function fPrintMessage(message){
	let chatData = {
	    user : game.user._id,
	    content : message,
	};
	ChatMessage.create(chatData,{});
}
// Define some global variables
let vShifts = ''
let vUSC = ''
let vUSCWage = ''
let vUSCFood = ''
let vSC = ''
let vSCWage = ''
let vSCFood = ''
let vCargoWeight = ''
let vPricePerPound = ''
let vDistance = ''
let vPricePerMile = ''
let vSpeed = ''
let vMessage = '<H2>CARGO TRANSPORTATION</H2> <P>'
// INITIAL DIALOG
// Dropdown for hours spent sailing each day
let ddShifts = `<form action="/action_page.php">
                    <label for="shifts">Number of 8-hour Sailing Shifts:</label>
                        <select name="shifts" id="shifts">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                </form>`
// Dropdown for the ships sailing speed
let ddSpeed = `<form action="/action_page.php">
                    <label for="speed">Speed (MPH):</label>
                        <select name="speed" id="speed">
                            <option value="0.5">0.5</option>
                            <option value="1">1</option>
                        </select>
                </form>`
// Text input for the distance of the journey
let tiDistance = `
            <div class="form-group">
                <label for="distance">Distance to Destination (MPH): </label>
                <input id="distance" name="num" type="number" min="0"></input>
            </div>
        </form>`;      
// Define the initial dialog
let dInitial = new Dialog ({
    title: "Sailing Duration",
    content: `${ddShifts} <P>
                ${ddSpeed}
                ${tiDistance}`,
    buttons: {
        ok: {
            id: "1",
            label: "Calculate!",
            title: "Sailing Duration",
            callback (html) {
                
                // Log to the console for debugging purposes
                console.log(`VARIABLES
                            `)
                // Build the message
                vMessage += ``
                // Print the message
                fPrintMessage(vMessage)
            }
        }
    }
})
dInitial.render(true)