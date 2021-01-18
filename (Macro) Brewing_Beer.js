// Get the name of the called macro
let vMacroName = this.name;
// Display a UI message if no actor is selected
if (!actor) {
    ui.notifications.warn(`An actor must be selected prior to calling the ${vMacroName} macro.`);
}
// Define the print message function
function fPrintMessage(message){
	let chatData = {
	    user : game.user._id,
	    content : message,
	};
	ChatMessage.create(chatData,{});
}
// Get the selected tokens name and format it
let vName = `<B>${token.actor.name}</B>`;
// Define some global variables
let vHours = ''
let vBonus = 0
let vQuality = ''
let vPrice = ''
let vMessage = ''
let vModifier = ''
let vDieBonus = 0
// Define the quality object array
let oaQuality = [
    {quality: "Low", price: "3 gp"},
    {quality: "Medium", price: "5 gp"},
    {quality: "High", price: "8 gp"},
    {quality: "Very-high", price: "10 gp"}
]
// Define the modifier object array
let oaModifier = [
    {hours: "8-hours", mod: ""},
    {hours: "16-hours", mod: "kh"},
    {hours: "24-hours", mod: "kh + 5"}
]
// INITIAL DIALOG
// Dropdown for hours spent
let ddInitial = `<form action="/action_page.php">
                    <label for="hours">Duration:</label>
                        <select name="hours" id="hours">
                            <option value="8-hours">8 hours</option>
                            <option value="16-hours">16 hours</option>
                            <option value="24-hours">24 hours</option>
                        </select>
                </form>`
let ddDieBonus = `<form action="/action_page.php">
                    <label for="sitbonus">Situational Die Bonus:</label>
                        <select name="sitbonus" id="sitbonus">
                            <option value="0">0</option>
                            <option value="1d4">1d4</option>
                            <option value="1d6">1d6</option>
                            <option value="1d8">1d8</option>
                            <option value="1d10">1d10</option>
                            <option value="1d12">1d12</option>
                        </select>
                </form>`
// Define the dialog
let dInitial = new Dialog ({
    title: "Beer Brewing",
    content: `The more hours you spend on a single 40 gallon barrel of beer, 
            the better your chances of getting a higher quality beer.
            <P> ${ddInitial} <P> ${ddDieBonus}`,
    buttons: {
        ok: {
            id: "1",
            label: "Brew!",
            title: "Beer Brewing",
            callback (html) {
                // Get the selected hours
                vHours = html.find('#hours').val()
                // Get the selected die bonus
                vDieBonus = html.find('#sitbonus').val()
                // Set the modifier based on the hours
                vModifier = oaModifier.find(i => i.hours == vHours).mod
                // Get the label for the selected element from the dropdown
                let sel = document.getElementById("hours");
                let vHoursName = sel.options[sel.selectedIndex].text;
                // Roll a normal brewing check
                let v1d20 = new Roll(`1d20${vModifier}`).roll().total
                let vBrewingCheck = new Roll(`${vDieBonus} + ${v1d20} + ${token.actor.data.data.attributes.prof}`).roll().total
                // Determine the variables based on the roll
                if (v1d20 == 20) {
                    // Set the quality of the beer
                    vQuality = 'Very-high'
                    // Pull the price from the Quality object array
                    vPrice = oaQuality.find(i => i.quality == vQuality).price
                } else if (vBrewingCheck <= 14) {
                    // Set the quality of the beer
                    vQuality = 'Low'
                    // Pull the price from the Quality object array
                    vPrice = oaQuality.find(i => i.quality == vQuality).price
                } else if (vBrewingCheck >= 15 && vBrewingCheck <= 19) {
                    // Set the quality of the beer
                    vQuality = 'Medium'
                    // Pull the price from the Quality object array
                    vPrice = oaQuality.find(i => i.quality == vQuality).price
                } else if (vBrewingCheck >= 20 && vBrewingCheck <= 24) {
                    // Set the quality of the beer
                    vQuality = 'High'
                    // Pull the price from the Quality object array
                    vPrice = oaQuality.find(i => i.quality == vQuality).price
                } else if (vBrewingCheck >= 25) {
                    // Set the quality of the beer
                    vQuality = 'Very-high'
                    // Pull the price from the Quality object array
                    vPrice = oaQuality.find(i => i.quality == vQuality).price
                }
                // Print the message
                vMessage = `${vName} spends <I>${vHoursName}</I> brewing beer and 
                            produces 1 barrel of <I>${vQuality}-quality</I> beer 
                            which can be sold for around <I>${vPrice}</I>.`
                fPrintMessage(vMessage)
                // Log the variables to console for debugging
                console.log(`CONSOLE LOG
                            1d20: ${v1d20}
                            Die Bonus: ${vDieBonus}
                            Modifier: ${vModifier}
                            Brewing Check: ${vBrewingCheck}
                            Hours: ${vHours}
                            Hours Name: ${vHoursName}
                            Quality: ${vQuality}
                            Price: ${vPrice}`)
            }
        }
    }
})
dInitial.render(true)