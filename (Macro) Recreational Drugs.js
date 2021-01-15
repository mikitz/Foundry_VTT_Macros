// Get the name of the called macro
let macroName = this.name
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
	ChatMessage.create(chatData,{})
}
// Get the selected tokens name and format it
let name = `<B>${token.actor.name}</B>`
// Roll 1d100 and assign its total to an object
let rConSave = new Roll(`1d20 + ${token.actor.data.data.abilities.con.save}`).roll().total
let r1d4 = new Roll(`1d4`).roll().total
let r1d6 = new Roll(`1d6`).roll().total
let r1d8 = new Roll(`1d8`).roll().total
let r1d10 = new Roll(`1d10`).roll().total
let r1d12 = new Roll(`1d12`).roll().total
// Define some objects that will be used later
let drug = ''
let drugName = ''
let quality = ''
let qualityName = ''
let gathered = ''
let DC = ''
// Define the needed Object Arrays
let oaButchering = [
    {id: 15, result: '1 common'},
    {id: 16, result: '1 common'},
    {id: 17, result: '2 common'},
    {id: 18, result: '1 uncommon'},
    {id: 20, result: '1 rare'},
    {id: 22, result: '2 rare'},
    {id: 24, result: '1 very rare'},
    {id: 30, result: '1 legendary'},
]
let oaDC = [
    {dc: 15, quality: 'low-quality'},
    {dc: 12, quality: 'medium-quality'},
    {dc: 9, quality: 'high-quality'}
]
// The Dropdown menu for Skill Levels
let ddInitial1 = `<form action="/action_page.php">
                    <label for="narcotics">Choose a Narcotic:</label>
                    <select name="narcotics" id="narcotics"> 
                        <option value="bath-salts">Bath Salts</option>
                        <option value="cocaine">Cocaine</option>
                        <option value="ecstasy">Ecstasy</option>
                        <option value="flakka">Flakka</option>
                        <option value="heroin">Heroin</option>
                        <option value="krokodil">Krokodil</option>
                        <option value="lsd">LSD</option>
                        <option value="marijuana">Marijuana</option>
                        <option value="methamphetamines">Methamphetamines</option>
                        <option value="mushrooms">Mushrooms</option>
                        <option value="salvia">Salvia</option>
                        <option value="spice">Spice</option>
                        <option value="dragon-tears">Dragon Tears</option>
                    </select>
                </form>`;
let ddInitial2 = `<form action="/action_page.php">
                    <label for="drug-quality">Select the Quality:</label>
                    <select name="drug-quality" id="drug-quality"> 
                        <option value="low-quality">Low Quality</option>
                        <option value="medium-quality">Medium Quaity</option>
                        <option value="high-quality">High Quality</option>
                    </select>
                </form>`;
// Create the initial dialog where the user selects the drug to be injested
let dInitial = new Dialog ({
    title: "Recreational Drugs",
    content: ddInitial1 + ddInitial2,
    buttons: {
        ok: {
            id: "1",
            label: "Next",
            callback (html) {
                // Get the drug name and its value from user dropdown selection
                drug = html.find('#narcotics').val()
                drugName = document.getElementById("narcotics")
                drugName = drugName.options[drugName.selectedIndex].text
                // Get the drug quality name and its value from user dropdown selection
                quality = html.find('#drug-quality').val()
                qualityName = document.getElementById("drug-quality")
                qualityName = qualityName.options[qualityName.selectedIndex].text
                // Set the Difficulty Class based on quality
                DC = oaDC.find(i => i.quality == quality).dc

                // Log all variables to the console for debugging purposes
                console.log(`USER INPUTS
                            Drug: ${drug}
                            Drug Name: ${drugName}
                            Quality: ${quality}
                            Quality Name: ${qualityName}
                            Con. Save: ${rConSave}
                            DC: ${DC}`)
            }
        }
    }
})

dInitial.render(true)