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
// Define the Roll objects
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
let duration = ''
let durationUnit = ''
let nat1 = '';
let failure = ''
let passCheckExact = ''
let passCheck5 = ''
let nat20 = ''
let result = ''
let message = `<H2>D.A.R.E</H2>`
// Define the needed Object Arrays
let oaDC = [
    {dc: 15, quality: 'low-quality'},
    {dc: 12, quality: 'medium-quality'},
    {dc: 9, quality: 'high-quality'}
]
let oaDrugs = [
    {"name":"Bath Salts","weight":"","low quality (dc 15)":"","medium quality (dc 12)":"","high quality (dc 9)":"","duration":"","duration_unit":"","nat_1":"• Unconscious\n• Exhaustion (1 Level)","failure":"• Poisoned","pass_check_(exactly_on_dc)":"• Dependency\n• Poisoned","pass_check_(5_or_above_dc)":"•","nat_20":"•"},
    {"name":"Cocaine","weight":"100mg","low quality (dc 15)":"1 sp","medium quality (dc 12)":"2 sp","high quality (dc 9)":"4 sp","duration":"1d4 * 10","duration_unit":"minutes","nat_1":"• Unconscious\n• Exhaustion (1 Level)","failure":"• Poisoned","pass_check_(exactly_on_dc)":"• Dependency\n• Poisoned","pass_check_(5_or_above_dc)":"• Advantage on Charisma checks","nat_20":"• Advantage on Charisma checks\n• Charisma checks have minimum of 10"},
    {"name":"Ecstasy","weight":"","low quality (dc 15)":"","medium quality (dc 12)":"","high quality (dc 9)":"","duration":"","duration_unit":"","nat_1":"• Incapacitated\n• Exhaustion (1 Level)","failure":"• Poisoned","pass_check_(exactly_on_dc)":"• Dependency\n• Poisoned","pass_check_(5_or_above_dc)":"• Advantage on Charisma checks","nat_20":"• Advantage on Charisma checks\n• Charisma checks have minimum of 10"},
    {"name":"Flakka","weight":"","low quality (dc 15)":"","medium quality (dc 12)":"","high quality (dc 9)":"","duration":"","duration_unit":"","nat_1":"• Unconscious\n• Exhaustion (1 Level)\n• 1d8 slashing damage as you claw at yourself","failure":"• Poisoned","pass_check_(exactly_on_dc)":"• Dependency\n• Poisoned","pass_check_(5_or_above_dc)":"•","nat_20":"•"},
    {"name":"Heroin","weight":"","low quality (dc 15)":"","medium quality (dc 12)":"","high quality (dc 9)":"","duration":"","duration_unit":"","nat_1":"•","failure":"• Poisoned","pass_check_(exactly_on_dc)":"• Dependency\n• Poisoned","pass_check_(5_or_above_dc)":"•","nat_20":"•"},
    {"name":"Krokodil","weight":"","low quality (dc 15)":"","medium quality (dc 12)":"","high quality (dc 9)":"","duration":"","duration_unit":"","nat_1":"•","failure":"• Poisoned","pass_check_(exactly_on_dc)":"• Dependency\n• Poisoned","pass_check_(5_or_above_dc)":"•","nat_20":"•"},
    {"name":"LSD","weight":"1 tablet","low quality (dc 15)":"2 sp","medium quality (dc 12)":"4 sp","high quality (dc 9)":"8 sp","duration":"1d12","duration_unit":"hours","nat_1":"• Incapacitated\n• Exhaustion (1 Level)","failure":"• Poisoned","pass_check_(exactly_on_dc)":"• Dependency\n• Poisoned","pass_check_(5_or_above_dc)":"• Advantage on saving throws against Illusion spells","nat_20":"• Advantage on saving throws against Illusion spells\n• Saving throws against Illusion spells have minimum of 10"},
    {"name":"Marijuana","weight":"1g","low quality (dc 15)":"1 sp","medium quality (dc 12)":"2 sp","high quality (dc 9)":"4 sp","duration":"1d6 * 10","duration_unit":"minutes","nat_1":"• Incapacitated\n• Exhaustion (1 Level)","failure":"• Poisoned","pass_check_(exactly_on_dc)":"• Dependency\n• Poisoned","pass_check_(5_or_above_dc)":"• Advantage on checks made with Tools, excluding Vehicles","nat_20":"• Advantage on checks made with Tools, excluding Vehicles\n• Tool checks have a minimum of 10"},
    {"name":"Methamphetamines","weight":"","low quality (dc 15)":"","medium quality (dc 12)":"","high quality (dc 9)":"","duration":"","duration_unit":"","nat_1":"•","failure":"• Poisoned","pass_check_(exactly_on_dc)":"• Dependency\n• Poisoned","pass_check_(5_or_above_dc)":"•","nat_20":"•"},
    {"name":"Mushrooms","weight":"1g","low quality (dc 15)":"1 sp","medium quality (dc 12)":"2 sp","high quality (dc 9)":"4 sp","duration":"1d6","duration_unit":"hours","nat_1":"• Incapacitated\n• Exhaustion (1 Level)","failure":"• Poisoned","pass_check_(exactly_on_dc)":"• Dependency\n• Poisoned","pass_check_(5_or_above_dc)":"• Advantage on saving throws against being frightened","nat_20":"• Advantage on saving throws against being frightened\n• Saving throws against being frightened have minimum of 10"},
    {"name":"Salvia","weight":"","low quality (dc 15)":"","medium quality (dc 12)":"","high quality (dc 9)":"","duration":"","duration_unit":"","nat_1":"•","failure":"• Poisoned","pass_check_(exactly_on_dc)":"• Dependency\n• Poisoned","pass_check_(5_or_above_dc)":"•","nat_20":"•"},
    {"name":"Spice","weight":"","low quality (dc 15)":"","medium quality (dc 12)":"","high quality (dc 9)":"","duration":"","duration_unit":"","nat_1":"•","failure":"• Poisoned","pass_check_(exactly_on_dc)":"• Dependency\n• Poisoned","pass_check_(5_or_above_dc)":"•","nat_20":"•"},
{"name":"Dragon Tears","weight":"","low quality (dc 15)":"","medium quality (dc 12)":"","high quality (dc 9)":"","duration":"","duration_unit":"","nat_1":"•","failure":"• Poisoned","pass_check_(exactly_on_dc)":"• Dependency\n• Poisoned","pass_check_(5_or_above_dc)":"•","nat_20":"•"}
];
// The dropdown menu for the drug
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
// The dropdown menu for the drug quality
let ddInitial2 = `<form action="/action_page.php">
                    <label for="drug-quality">Select the Quality:</label>
                    <select name="drug-quality" id="drug-quality"> 
                        <option value="low-quality">Low Quality</option>
                        <option value="medium-quality">Medium Quaity</option>
                        <option value="high-quality">High Quality</option>
                    </select>
                </form>`;
// Create the initial dialog where the user selects the drug to be ingested
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
                // Pull from oaDrugs based on drugName
                duration = oaDrugs.find(i => i.name == drugName).duration
                durationUnit = oaDrugs.find(i => i.name == drugName).duration_unit
                nat1 = oaDrugs.find(i => i.name == drugName).nat_1
                failure = oaDrugs.find(i => i.name == drugName).failure
                passCheckExact = oaDrugs.find(i => i.name == drugName)["pass_check_(exactly_on_dc)"]
                passCheck5 = oaDrugs.find(i => i.name == drugName)["pass_check_(5_or_above_dc)"]
                nat20 = oaDrugs.find(i => i.name == drugName).nat_20
                // Get the result based on rConSave and DC
                if (rConSave == 20) {
                    result = nat20 + `<P>• Yo high as a kite, mo'fucka!`
                } else if (rConSave == 1) {
                    result = nat1
                } else if (rConSave == DC) {
                    result = passCheckExact + `<P>• Yo high as a kite, mo'fucka!`
                } else if (rConSave >= DC + 5) {
                    result = passCheck5 + `<P>• Yo high as a kite, mo'fucka!`
                } else if (rConSave >= DC) {
                    result = `• Yo high as a kite, mo'fucka!`
                } else if (rConSave < DC) {
                    result = failure
                }
                // Log all variables to the console for debugging purposes
                console.log(`USER INPUTS
                            Drug: ${drug}
                            Drug Name: ${drugName}
                            Quality: ${quality}
                            Quality Name: ${qualityName}
                            Con. Save: ${rConSave}
                            DC: ${DC}
                            Duration: ${duration}`)
                message += `<P>${name} ingests <I>${qualityName} ${drugName}</I> and suffers/benefits from the following effects for the next [[${duration}]] ${durationUnit}:<P>
                            ${result}`
                printMessage(message)
            }
        }
    }
})
dInitial.render(true)