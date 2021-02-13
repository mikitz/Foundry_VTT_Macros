// This returns an array containing all the activity objects from Crash's 5e TRAINING Tracking.
// game.actors.getName("Joe Smith").getFlag("5e-training", "trainingItems");

let content = `
        <p>Please input the number of hours you wish to train.</p>
        <form>
            <div class="form-group">
                <label for="hours">Hours: </label>
                <input id="hours" name="num" type="number" min="0"></input>
            </div>
        </form>`;
let radios = `<p>Please select either "Proficiency" or "Expertise".</p>
            <form>
                <div class="form-group">
                    <label for="prof">Proficiency </label>
                    <input id="prof" value="prof" name="level" type="radio"></input>
                    <label for="exp">Expertise </label>
                    <input id="exp" value="exp" name="level" type="radio"></input>
                </div>
            </form>`;
let dLevel = new Dialog ({
    title: "Select What You Are Training",
    content: "Are you training a skill, a tool, a language, a weapon, or armor proficiency/expertise?",
    buttons: {
        skill: {
            id: "1",
            label: "Skill",
            callback () {
                dSkill.render(true);
            }   
        },
        tool: {
            id: "2",
            label: "Tool",
            callback () {
                dTool.render(true);
            }   
        },
        language: {
            id: "3",
            label: "Language",
            callback () {
                dLanguage.render(true);
            }   
        },
        weapon: {
            id: "4",
            label: "Weapon",
            callback () {
                dWeapon.render(true);
            }   
        },
        armor: {
            id: "5",
            label: "Armor",
            callback () {
                dArmor.render(true);
            }
        }
    }
})
function printMessage(message){
	let chatData = {
	    user : game.user._id,
	    content : message,
	};
	ChatMessage.create(chatData,{});
}
function superMessage(vSuccess, vFailures, vTwenties, vOnes, vTotal, label, type, hours) {
    let name = token.data.name
    let message = `<H2>TRAINING REPORT</H2>
    <P><B>Successes: </B>${vSuccess}</P>
    <P><B>Failures: </B>${vFailures}</P>
    <P><B>Nat. 20s: </B>${vTwenties}</P>
    <P><B>Nat. 1s: </B>${vOnes}</P>
    <P><B>Total: </B>${vTotal}</P>` 
    message += `<P><B>${name}</B> trains <I>${label}</I> ${type} hard for ${hours} hours! PUSH IT TO THE LIMIT!</P>`
    return message
}
function printButtonSkill(id, label, abbr) {
    this.id = id;
    this.label = label;
    this.callback = function (html) {
        let hours = Number(html.find("#hours")[0].value);
        let rb = $('input[name="level"]:checked').val();
        let roll = new Roll(`${hours}d20`).roll();
        // Log to console roll
        console.log(roll)
        let vTwenties = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result === 20).length + a, 0);
        let vOnes = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result === 1).length + a, 0);
        let type = ""
        if (rb == "prof") {
            type = "Proficiency"
        } else {
            type = "Expertise"
        }
        if (!rb) {
            ui.notifications.warn("Please select one of the radio buttons.");
            this.render(true);
        } else if (hours == 0) {
            ui.notifications.warn("Please input a number of hours greater than zero(0).");
            this.render(true);
        } else if (rb == "prof") {
            let vSuccess = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result >= 15 - token.actor.data.data.skills[abbr].total).length + a, 0);
            let vTotal = (vTwenties + vSuccess) - vOnes;
            let vFailures = hours - vSuccess;
            var message = superMessage(vSuccess, vFailures, vTwenties, vOnes, vTotal, label, type, hours)
            printMessage(message);
        } else {
            let vSuccess = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result >= 20 - token.actor.data.data.skills[abbr].total).length + a, 0);
            let vTotal = (vTwenties + vSuccess) - vOnes;
            let vFailures = hours - vSuccess;
            var message = superMessage(vSuccess, vFailures, vTwenties, vOnes, vTotal, label, type, hours)
            printMessage(message);
        }
    }
}
function printButtonWeapon(id, label) {
    this.id = id;
    this.label = label;
    this.callback = function (html) {
        let hours = Number(html.find("#hours")[0].value);
        let rb = $('input[name="level"]:checked').val();
        let roll = new Roll(`${hours}d20`).roll()
        // Log to console roll
        console.log(roll)
        let vTwenties = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result === 20).length + a, 0);
        let vOnes = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result === 1).length + a, 0);
        let type = ""
        if (rb == "prof") {
            type = "Proficiency"
        } else {
            type = "Expertise"
        }
        if (rb == "prof") {
            if (!rb) {
                ui.notifications.warn("Please select one of the radio buttons.");
                this.render(true);
            } else if (hours == 0) {
                ui.notifications.warn("Please input a number of hours greater than zero(0).");
                this.render(true);
            } else if (label == 'Finesse/Ranged Weapon' || label === 'Light Armor') {
                let vSuccess = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result >= 15 - token.actor.data.data.abilities.dex.mod).length + a, 0);
                let vTotal = (vTwenties + vSuccess) - vOnes;
                let vFailures = hours - vSuccess;
                var message = superMessage(vSuccess, vFailures, vTwenties, vOnes, vTotal, label, type, hours)
                printMessage(message);
            } else if (label == 'Heavy Armor' || label == 'Non-finesse Weapon') {
                let vSuccess = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result >= 15 - token.actor.data.data.abilities.str.mod).length + a, 0);
                let vTotal = (vTwenties + vSuccess) - vOnes;
                let vFailures = hours - vSuccess;
                var message = superMessage(vSuccess, vFailures, vTwenties, vOnes, vTotal, label, type, hours)
                printMessage(message);
            } else {
                let vSuccess = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result >= 15 - (token.actor.data.data.abilities.dex.mod + token.actor.data.data.abilities.str.mod) / 2).length + a, 0);
                let vTotal = (vTwenties + vSuccess) - vOnes;
                let vFailures = hours - vSuccess;
                var message = superMessage(vSuccess, vFailures, vTwenties, vOnes, vTotal, label, type, hours)
                printMessage(message);
            }
        } else {
            if (!rb) {
                ui.notifications.warn("Please select one of the radio buttons.");
                this.render(true);
            } else if (hours == 0) {
                ui.notifications.warn("Please input a number of hours greater than zero(0).");
                this.render(true);
            } else if (label == 'Finesse/Ranged Weapon' || label === 'Light Armor') {
                let vSuccess = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result >= 20 - token.actor.data.data.abilities.dex.mod).length + a, 0);
                let vTotal = (vTwenties + vSuccess) - vOnes;
                let vFailures = hours - vSuccess;
                var message = superMessage(vSuccess, vFailures, vTwenties, vOnes, vTotal, label, type, hours)
                printMessage(message);
            } else if (label == 'Heavy Armor' || label == 'Non-finesse Weapon') {
                let vSuccess = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result >= 20 - token.actor.data.data.abilities.str.mod).length + a, 0);
                let vTotal = (vTwenties + vSuccess) - vOnes;
                let vFailures = hours - vSuccess;
                var message = superMessage(vSuccess, vFailures, vTwenties, vOnes, vTotal, label, type, hours)
                printMessage(message);
            } else {
                let vSuccess = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result >= 20 - (token.actor.data.data.abilities.dex.mod + token.actor.data.data.abilities.str.mod) / 2).length + a, 0);
                let vTotal = (vTwenties + vSuccess) - vOnes;
                let vFailures = hours - vSuccess;
                var message = superMessage(vSuccess, vFailures, vTwenties, vOnes, vTotal, label, type, hours)
                printMessage(message);
            }
        }
    }
}
function printButtonArmor(id, label) {
    this.id = id;
    this.label = label;
    this.callback = function (html) {
        let hours = Number(html.find("#hours")[0].value);
        let roll = new Roll(`${hours}d20`).roll()
        // Log to console roll
        console.log(roll)
        let vTwenties = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result === 20).length + a, 0);
        let vOnes = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result === 1).length + a, 0);
        let type = ""
        if (hours == 0) {
            ui.notifications.warn("Please input a number of hours greater than zero(0).");
            this.render(true);
        } else if (label == 'Finesse/Ranged Weapon' || label === 'Light Armor') {
            let vSuccess = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result >= 15 - token.actor.data.data.abilities.dex.mod).length + a, 0);
            let vTotal = (vTwenties + vSuccess) - vOnes;
            let vFailures = hours - vSuccess;
            var message = superMessage(vSuccess, vFailures, vTwenties, vOnes, vTotal, label, type, hours)
            printMessage(message);
        } else if (label == 'Heavy Armor' || label == 'Non-finesse Weapon') {
            let vSuccess = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result >= 15 - token.actor.data.data.abilities.str.mod).length + a, 0);
            let vTotal = (vTwenties + vSuccess) - vOnes;
            let vFailures = hours - vSuccess;
            var message = superMessage(vSuccess, vFailures, vTwenties, vOnes, vTotal, label, type, hours)
            printMessage(message);
        } else {
            let vSuccess = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result >= 15 - ((token.actor.data.data.abilities.dex.mod + token.actor.data.data.abilities.str.mod) / 2)).length + a, 0);
            let vTotal = (vTwenties + vSuccess) - vOnes;
            let vFailures = hours - vSuccess;
            var message = superMessage(vSuccess, vFailures, vTwenties, vOnes, vTotal, label, type, hours)
            printMessage(message);
        } 
    }
}
function printButtonLanguage(id, label) {
    this.id = id;
    this.label = label;
    this.callback = function (html) {
        let hours = Number(html.find("#hours")[0].value);
        let type = ""

        if (hours == 0) {
            ui.notifications.warn("Please input a number of hours greater than zero(0).");
            this.render(true);
        } else {
            let roll = new Roll(`${hours}d20`).roll()
            // Log to console roll
            console.log(roll)
            let vTwenties = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result === 20).length + a, 0);
            let vOnes = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result === 1).length + a, 0);
            let vSuccess = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result >= 15 - token.actor.data.data.abilities.int.mod).length + a, 0);
            let vTotal = (vTwenties + vSuccess) - vOnes;
            let vFailures = hours - vSuccess;
            var message = superMessage(vSuccess, vFailures, vTwenties, vOnes, vTotal, label, type, hours)
            printMessage(message);
        }
    }
}
function printButtonTool(id, label) {
    this.id = id;
    this.label = label;
    this.callback = function (html) {
        let hours = Number(html.find("#hours")[0].value);
        let rb = $('input[name="level"]:checked').val();
        let type = ""
        if (rb == "prof") {
            type = "Proficiency"
        } else {
            type = "Expertise"
        }
        if (hours == 0) {
            ui.notifications.warn("Please input a number of hours greater than zero(0).");
            this.render(true);
        } else if (rb == "prof") {
            let roll = new Roll(`${hours}d20`).roll()
            // Log to console roll
            console.log(roll)
            let vTwenties = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result === 20).length + a, 0);
            let vOnes = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result === 1).length + a, 0);
            let vSuccess = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result >= 15 - token.actor.data.data.abilities.int.mod).length + a, 0);
            let vTotal = (vTwenties + vSuccess) - vOnes;
            let vFailures = hours - vSuccess;
            var message = superMessage(vSuccess, vFailures, vTwenties, vOnes, vTotal, label, type, hours)
            printMessage(message);
        } else {
            let roll = new Roll(`${hours}d20`).roll()
            // Log to console roll
            console.log(roll)
            let vTwenties = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result === 20).length + a, 0);
            let vOnes = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result === 1).length + a, 0);
            let vSuccess = roll.dice.reduce((a,v)=> v.results.filter(r=> r.result >= 20 - token.actor.data.data.abilities.int.mod).length + a, 0);
            let vTotal = (vTwenties + vSuccess) - vOnes;
            let vFailures = hours - vSuccess;
            var message = superMessage(vSuccess, vFailures, vTwenties, vOnes, vTotal, label, type, hours)
            printMessage(message);
        } 
    }
}
let dSkill = new Dialog ({
    title: "Training a Skill",
    content: content + radios,
    buttons: {
        acrobatics: new printButtonSkill(1, 'Acrobatics', 'acr'),
        animal_handling: new printButtonSkill(2, 'Animal Handling', 'ani'),
        arcana: new printButtonSkill(3, 'Arcana', 'arc'),
        athletics: new printButtonSkill(4, 'Athletics', 'ath'),
        deception: new printButtonSkill(5, 'Deception', 'dec'),
        history: new printButtonSkill(6, 'History', 'his'),
        insight: new printButtonSkill(7, 'Insight', 'ins'),
        intimidation: new printButtonSkill(8, 'Intimidaiton', 'itm'),
        investigation: new printButtonSkill(9, 'Investigation', 'inv'),
        medicine: new printButtonSkill(10, 'Medicine', 'med'),
        nature: new printButtonSkill(11, 'Nature', 'nat'),
        perception: new printButtonSkill(12, 'Perception', 'prc'),
        performance: new printButtonSkill(13, 'Performance', 'prf'),
        persuasion: new printButtonSkill(14, 'Persuassion', 'per'),
        religion: new printButtonSkill(15, 'Religion', 'rel'),
        sleight_of_hand: new printButtonSkill(16, 'Sleight of Hand', 'slt'),
        stealth: new printButtonSkill(17, 'Stealth', 'ste'),
        survival: new printButtonSkill(18, 'Survival', 'sur')
    }
})
let dTool = new Dialog ({
    title: "Training a Tool",
    content: content + radios,
    buttons: {
        aclhemist: new printButtonTool(1, "a Tool"),
    }
})
let dLanguage = new Dialog ({
    title: "Learning a Language",
    content: content,
    buttons: {
        dwarvish: new printButtonLanguage(1, 'a Language'),
    }
})
let dWeapon = new Dialog ({
    title: "Practicing with a Weapon",
    content: content + radios + `<P><B>Note: You add a different ability modifier depending on the weapon you're training.</B></P>
                        <P><I>Non-finesse:</I> Strength modifier.</P>
                        <P><I>Finesse/Ranged:</I> Dexterity modifier.</P>`,
    buttons: {
        non_finesse: new printButtonWeapon(1, 'Non-finesse Weapon'),
        finesse: new printButtonWeapon(2, 'Finesse/Ranged Weapon')
    }
})
let dArmor = new Dialog ({
    title: "Practicing with Armor",
    content: content + `<P><B>Note: You add a different ability modifier depending on the armor you're  training.</B></P>
                        <P><I>Light:</I> Dexterity modifier.</P>
                        <P><I>Medium:</I> Dexterity modifier plus Strength modifier divided by two.</P>
                        <P><I>Heavy:</I> Strength modifier.</P>`,
    buttons: {
        light: new printButtonArmor(1, 'Light Armor'),
        medium: new printButtonArmor(2, 'Medium Armor'),
        heavy: new printButtonArmor(3, 'Heavy Armor')
    }
})
dLevel.render(true);