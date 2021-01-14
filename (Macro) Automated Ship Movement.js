// NOT FINISHED - DO NOT USE
// This macro moves a token based on navigation inputs from dialog pop-ups

let speed = 2;

let message = `<H2>LOST AT SEA</H2>
    <P>If the ship is able to see land at some point in their random travels, then they must succeed on a DC 15 Wisdom (Navigation) check to find their place successfully on their charts. If that is passed, a new course is plotted in the correct direction.</P>
    <P><B>DIRECTIONS: </B></P>`;

function printMessage(message){
	let chatData = {
	    user : game.user._id,
	    content : message,
	};
	ChatMessage.create(chatData,{});
}

function direction(die) {
    if (die == 1) {
        return message += 'Northeast</P>';
    } else if (die == 2) {
        return message += 'East</P>';
    } else if (die == 3) {
        return message += 'Southeast</P>';
    } else if (die == 4) {
        return message += 'Southwest</P>';
    } else if (die == 5) {
        return message += 'West</P>';
    } else if (die == 6) {
        return message += 'Northwest</P>';
    }
}

printMessage(direction(new Roll(`1d6`, {}).roll().total))
printMessage(direction(new Roll(`1d6`, {}).roll().total))
printMessage(direction(new Roll(`1d6`, {}).roll().total))