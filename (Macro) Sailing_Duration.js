// Inputs
    // Sailing shifts: 1, 2, or 3
    // Ship speed
    // Length of journey
// Outputs
    // Duration if...z
        // 8 hours per day of sailing
        // 16 hours per day of sailing
        // 24 hours per day of sailing

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
let vSpeed = ''
let vDistance = ''
let vHours = ''
let vMilesPerDay = ''
let vDaysToDestination = ''
let vRemaining = ''
let vMessage = '<H2>SAILING DURATION</H2> <P>'
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
                            <option value="1.5">1.5</option>
                            <option value="2">2</option>
                            <option value="2.5">2.5</option>
                            <option value="3">3</option>
                            <option value="3.5">3.5</option>
                            <option value="4">4</option>
                            <option value="4.5">4.5</option>
                            <option value="5">5</option>
                            <option value="5.5">5.5</option>
                            <option value="6">6</option>
                            <option value="6.5">6.5</option>
                            <option value="7">7</option>
                            <option value="7.5">7.5</option>
                            <option value="8">8</option>
                            <option value="8.5">8.5</option>
                            <option value="9">9</option>
                            <option value="9.5">9.5</option>
                            <option value="10">10</option>
                            <option value="10.5">10.5</option>
                            <option value="11">11</option>
                            <option value="11.5">11.5</option>
                            <option value="12">12</option>
                            <option value="12.5">12.5</option>
                            <option value="13">13</option>
                            <option value="13.5">13.5</option>
                            <option value="14">14</option>
                            <option value="14.5">14.5</option>
                            <option value="15">15</option>
                            <option value="15.5">15.5</option>
                            <option value="16">16</option>
                            <option value="16.5">16.5</option>
                            <option value="17">17</option>
                            <option value="17.5">17.5</option>
                            <option value="18">18</option>
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
                // Get the number of sailing shifts from the user input
                vShifts = html.find('#shifts').val()
                // Get the ship speed from the user input
                vSpeed = html.find('#speed').val()
                // Get the distance to destination from the user input
                vDistance = Number(html.find("#distance")[0].value)
                // Calcualte the number of hours sailed per day
                vHours = vShifts * 8
                // Calculate the distance travelled in a day
                vMilesPerDay = vHours * vSpeed
                // Calculate the number of days to destination
                vDaysToDestination = Math.floor(vDistance / vMilesPerDay)
                // Calculate the number of remaining hours from above
                vRemaining = Math.ceil(24 * ((vDistance / vMilesPerDay) - vDaysToDestination))
                // Log to the console for debugging purposes
                console.log(`VARIABLES
                            Shifts: ${vShifts}
                            Speed: ${vSpeed}
                            Distance: ${vDistance}
                            Hours: ${vHours}
                            Miles per Day: ${vMilesPerDay}
                            Time to Destination: ${vDaysToDestination} days and ${vRemaining} hours
                            Days to Destination: ${vDistance / vMilesPerDay}`)
                // Build the message
                vMessage += `While sailing for <I>${vHours} hours</I> per day at a speed of <I>${vSpeed} MPH</I>, 
                            you will cover a distance of <I>${vDistance} miles</I> in about <B>${vDaysToDestination} days and ${vRemaining} hours</B>. 
                            Please note that this assumes nothing will go wrong.`
                // Print the message
                fPrintMessage(vMessage)
            }
        }
    }
})
dInitial.render(true)