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
// Get the selected tokens name and format it
let name = `<B>${token.actor.name}</B>`;
// Roll 1d100 and assign its total to an object
let roll = new Roll(`1d100`).roll().total;
// Define some objects that will be used later
let skillLevel = '';
let color = '';
let message = '';
// The Dropdown menu for Skill Levels
let dropdownInitial = `<form action="/action_page.php">
                    <label for="skill-level">Choose a Skill Level:</label>
                    <select name="skill-level" id="skill-level">
                        <option value="shift-0">Shift 0</option>
                        <option value="feeble">Feeble</option>
                        <option value="poor">Poor</option>
                        <option value="typical">Typical</option>
                        <option value="good">Good</option>
                        <option value="excellent">Excellent</option>
                        <option value="remarkable">Remarkable</option>
                        <option value="incredible">Incredible</option>
                        <option value="amazing">Amazing</option>
                        <option value="monstrous">Monstrous</option>
                        <option value="unearthly">Unearthly</option>
                        <option value="shift-150">Shift 150</option>
                        <option value="shift-250">Shift 250</option>
                        <option value="shift-500">Shift 500</option>
                    </select>
                </form>`
// The function that outputs the roll total and color
function fSkillLevelRoll(white, green, yellow, red) {
    // Apply the appropriate color to the color object
    if (roll <= white) {
        color = 'White';
    } else if (roll <= green && roll > white) {
        color = 'Green';
    } else if (roll <= yellow && roll > green) {
        color = 'Yellow';
    } else if (roll <= red && roll > yellow) {
        color = 'Red';
    }
    // Return the variables used in the message
    return color, roll;
}
// Initial dialog
let dDowntimeActivity = new Dialog ({
    title: "Skill Challenge",
    content: `Please select the the level of the skill you intend to use. <BR> ${dropdownInitial}`,
    buttons: {
        ok: {
            id: "14",
            label: "Roll!",
            callback (html) {
                // Get the selected skill level
                skillLevel = html.find('#skill-level').val();
                // Get the label for the selected element from the dropdown
                let sel = document.getElementById("skill-level");
                let skill = sel.options[sel.selectedIndex].text;
                // Run the appropriate function based on the selected Skill Level
                if (skillLevel == 'shift-0') {
                    color, roll = fSkillLevelRoll(65, 94, 99, 100);
                } else if (skillLevel == 'feeble') {
                    color, roll = fSkillLevelRoll(60, 90, 99, 100);
                } else if (skillLevel == 'poor') {
                    color, roll = fSkillLevelRoll(55, 85, 99, 100);
                } else if (skillLevel == 'typical') {
                    color, roll = fSkillLevelRoll(50, 80, 97, 100);
                } else if (skillLevel == 'good') {
                    color, roll = fSkillLevelRoll(45, 75, 97, 100);
                } else if (skillLevel == 'excellent') {
                    color, roll = fSkillLevelRoll(40, 70, 94, 100);
                } else if (skillLevel == 'remarkable') {
                    color, roll = fSkillLevelRoll(35, 65, 94, 100);
                } else if (skillLevel == 'incredible') {
                    color, roll = fSkillLevelRoll(30, 60, 90, 100);
                } else if (skillLevel == 'amazing') {
                    color, roll = fSkillLevelRoll(25, 55, 90, 100);
                } else if (skillLevel == 'monstrous') {
                    color, roll = fSkillLevelRoll(20, 50, 85, 100);
                } else if (skillLevel == 'unearthly') {
                    color, roll = fSkillLevelRoll(15, 45, 85, 100);
                } else if (skillLevel == 'shift-150') {
                    color, roll = fSkillLevelRoll(10, 40, 80, 100);
                } else if (skillLevel == 'shift-250') {
                    color, roll = fSkillLevelRoll(6, 40, 80, 100);
                } else if (skillLevel == 'shift-350') {
                    color, roll = fSkillLevelRoll(3, 35, 75, 100);
                }
                // Log the variables to the console for debugging purposes
                console.log(`VARIABLES
                            Name: ${name}
                            Skill Level: ${skillLevel}
                            Roll: ${roll}
                            Color: ${color}`);
                // Define the message to be sent to chat
                message = `<span style="font-size:large">${name} rolls at <I>${skillLevel}</I>: ${roll} <span style="background-color: ${color}">(${color})</span>`;
                //message = `${name} rolls at <I>${skill}</I> and got a ${roll} (${color})`;
                // Print the message to chat
                printMessage(message);
            }
        }
    }
})
dDowntimeActivity.render(true)