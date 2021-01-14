// Use this to see the actor data
// console.log(canvas.tokens.controlled[0].actor.getRollData());

// Get the actor 
let s_actor = canvas.tokens.controlled[0]?.actor || game.user.character;
// Get the selected targets
let targets = game.user.targets;

let radiosKnowledge = `<p><B>How knowledgable is the caster of the target?</B></p>
            <form>
                <div class="form-group">
                    <label for="secondhand">Secondhand (you have heard of the target)</label>
                    <input id="secondhand" value="secondhand" name="knowledge" type="radio"></input>
                    <label for="firsthand">Firsthand (you have met the target)</label>
                    <input id="firsthand" value="firsthand" name="knowledge" type="radio"></input>
                    <label for="familiar">Familiar (you know the target well)</label>
                    <input id="familiar" value="familiar" name="knowledge" type="radio"></input>
                </div>
            </form>`;

let radiosConnection = `<p><B>How is the caster making a connection with the target?</B></p>
            <form>
                <div class="form-group">
                    <label for="likeness">Likeness or picture</label>
                    <input id="likeness" value="likeness" name="connection" type="radio"></input>
                    <label for="possession">Possession or garment</label>
                    <input id="possession" value="possession" name="connection" type="radio"></input>
                    <label for="body part">Body part, lock of hair, bit of nail, or the like</label>
                    <input id="body part" value="body part" name="connection" type="radio"></input>
                </div>
            </form>`;

let distanceInput = `
                    <p>Please input how far away the intended destination is from the caster in miles.</p>
                    <form>
                        <div class="form-group">
                            <label for="distance">Distance (miles): </label>
                            <input id="distance" name="num" type="number" min="0"></input>
                        </div>
                    </form>`;

let familiarityDescriptions = `
                            <B>Permanent circle</B> means a permanent teleportation circle whose sigil sequence you know.</P> 
                            <B>Associated object</B> means that you possess an object taken from the desired destination within the last six months, such as a book from a wizard's library, bed linen from a royal suite, or a chunk of marble from a lich's secret tomb.</P> 
                            <B>Very familiar</B> is a place you have been very often, a place you have carefully studied, or a place you can see when you cast the spell. </P> 
                            <B>Seen casually</B> is someplace you have seen more than once but with which you aren't very familiar. </P> 
                            <B>Viewed once</B> is a place you have seen once, possibly using magic.</P> 
                            <B>Description</B> is a place whose location and appearance you know through someone else's description, perhaps from a map.</P> 
                            <B>False destination</B> is a place that doesn't exist. Perhaps you tried to scry an enemy's sanctum but instead viewed an illusion, or you are attempting to teleport to a familiar location that no longer exists.`

let dSpell = new Dialog ({
    title: "Select the Spell You Want to Roll",
    content: "For which spell do you want to export results to the chat?",
    buttons: {
        teleport: {
            id: "1",
            label: "Teleport",
            callback () {
                dTeleport.render(true);
                
            }   
        },
        scrying: {
            id: "2",
            label: "Scrying",
            callback () {
                dScrying.render(true);
            }   
        },
        reincarnate: {
            id: "3",
            label: "Reincarnate",
            callback () {
                const table = game.tables.entities.find(t => t.name === "Reincarnate").draw();
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

function teleportOutcome(off_target, similar_area, mishap, html, label){
    // Roll 1d100 to determine the outcome of the teleport
    let d100 = new Roll('1d100').roll().total;
    // Get the distance to the intended target from the text input field
    let distance = Number(html.find("#distance")[0].value);
    // Calculate the percentage off as determined by the Off Target entry in the Teleport spell
    let percent_off = new Roll('1d10 * 1d10').roll().total;
    // Calculate the distance off by multiplying the distance by the percent off
    let distance_off = Math.ceil(distance * (percent_off / 100)/3.0)*3;
    // Create a list of all possible directions
    let directionsList = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'];
    // Determine the direction in which the Teleport drops the caster and their group
    let direction = directionsList[Math.floor(Math.random() * directionsList.length)];
    // Alert the user to an empty Distance text input
    if (distance == '') {
        ui.notifications.warn("Please input the distance.");
        dTeleport.render(true);
    } else {
        console.log(`1d100 roll: ${d100}`);
        if (d100 >= off_target + 1) {
            // On target
            let result = 'on target';
            printMessage(`<H2>${label}</H2></P> The caster and their group were <B>${result}</B> and arrive safely at the intended destination.`)
        } else if (d100 >= similar_area + 1 && d100 <= off_target) {
            // Off target
            console.log(`Percent Off: ${percent_off}`);
            let result = 'off target';
            printMessage(`<H2>${label}</H2></P> The caster and their group were <B>${result}</B>, resulting in the group being teleported <B><I>${distance_off} miles ${direction}</I></B> of the intended distination.`);
        } else if (d100 >= mishap + 1 && d100 <= similar_area) {
            // Similar Area
            let result = 'similar area';
            printMessage(`<H2>${label}</H2></P> The caster and their group wind up in a different <B>${result}</B> that's visually and/or thematically similar to the intended destination.`);
        } else if (d100 <= mishap) {
            // Mishap
            let result = 'mishap';
            let dmg = new Roll('3d10').roll().total;
            let d100 = new Roll('1d100').roll().total;
            printMessage(`<H2>${label}</H2></P> The caster had a teleportation <B>${result}</B>, resulting in everyone who teleported suffering <B><I>${dmg}</I></B> force damage. </P> THE GM MUST ROLL AGAIN ON THE TELEPORT OUTCOME TABLE!`)
        }
    }
}
let dTeleport = new Dialog({
    title: "Teleport",
    content: '<H1>Distance</H1>' + distanceInput + '<H1>Familiarity</H1></P>' + familiarityDescriptions + "</P><I>How familiar is the caster with the intended destination?</I>",
    buttons: {
        permCircle: {
            id: "1",
            label: "Permanent Circle",
            callback () {
                let result = 'on target';
                printMessage(`<H2>${this.label}</H2></P> The caster and their group were <B>${result}</B> and arrive safely at the intended destination.`)
            }   
        },
        assocObject: {
            id: "2",
            label: "Associated Object",
            callback () {
                let result = 'on target';
                printMessage(`<H2>${this.label}</H2></P> The caster and their group were <B>${result}</B> and arrive safely at the intended destination.`)
            }   
        },
        veryFamiliar: {
            id: "3",
            label: "Very Familiar",
            callback (html) {
                teleportOutcome(24, 13, 5, html, this.label)
            }   
        },
        seenCasually: {
            id: "4",
            label: "Seen Casually",
            callback (html) {
                teleportOutcome(53, 43, 33, html, this.label)
            }   
        },
        viewedOnce: {
            id: "5",
            label: "Viewed Once",
            callback (html) {
                teleportOutcome(73, 53, 43, html, this.label)
            }   
        },
        description: {
            id: "6",
            label: "Description Only",
            callback (html) {
                teleportOutcome(73, 53, 43, html, this.label)
            }   
        },
        falseDestination: {
            id: "7",
            label: "False Destination",
            callback (html) {
                teleportOutcome(101, 100, 50, html, this.label)
            }   
        },
    }
})

let dScrying = new Dialog({
    title: "Scrying",
    content: radiosKnowledge + radiosConnection,
    buttons: {
        cast: {
            id: "1",
            label: "Scry on your target!",
            callback (html) {
                // Get the selected radio from the Connection group
                let rbConn = $('input[name="connection"]:checked').val();
                // Get the selected radio from the Knowledge group
                let rbKnow = $('input[name="knowledge"]:checked').val();
                // Set up the base save modifiers
                let saveModConn = 0;
                let saveModKnow = 0;
                // Set the Connecion save modifier based on what was selected
                if (rbConn == "likeness") {
                    saveModConn = -2;
                } else if (rbConn == "possession") {
                    saveModConn = -4;
                } else if (rbConn == "body part") {
                    saveModConn = -10;
                }
                // Set the Knowledge save modifier based on what was selected
                if (rbKnow == "secondhand") {
                    saveModKnow = 5
                } else if (rbKnow == "firsthand") {
                    saveModKnow = 0
                } else if (rbKnow == "familiar") {
                    saveModKnow = -5
                }
                // Set the save modifier
                let saveMod = saveModConn + saveModKnow
                // Get the actor's spell save DC
                let spellSaveDC = actor.data.data.attributes.spelldc;
                // Roll the target's Wisdom saving throw
                targets.forEach(target => {
                    let name = target.actor.data.name;
                    let wisSave = target.actor.data.data.abilities.wis.save;
                    let saveRoll = new Roll(`1d20 + ${wisSave} + ${saveMod}`);
                    if (saveRoll >= spellSaveDC) {
                        printMessage(`${actor.name} attempts to scry on ${name} to no avail! You may not scry on the same target agains for 24 hours.`)
                    } else {
                        printMessage(`${actor.name} scries on ${name} successfully!`)
                    }
                })
            }
        }
    }
})

dSpell.render(true);