/*
    NOTE
        There are some things you need to do to get this to work:
            1.) You must replace TABLE NAME with the name of the appropriate table.
            2.) The names of the d6 tables that fall under each book subject must be
                the same as they are in the Reddit post. 
                    E.G. The name of the d6 table for 'Alchemy and potions' 
                    must be "Alchemy and potions"
*/
// Define the fPrintMessage function
function fPrintMessage(message){
	let chatData = {
	    user : game.user._id,
	    content : message,
	};
	ChatMessage.create(chatData,{})
}
// Define objects to be used later
const tBookSubject = game.tables.entities.find(t => t.name === "TABLE NAME")
    /*  It's important that the results within this table are exactly as 
        they are in the reddit post you provided. The results in this table must be
        the table names of the subject details. 
            E.G. If in this table, one of the results is 'Alchemy and potions', then
            the name of the d6 table for alchemy and potions must also be 'Alchemy 
            and potions'. 
    */
const tBookCondition = game.tables.entities.find(t => t.name === "TABLE NAME")
const tBookCover = game.tables.entities.find(t => t.name === "TABLE NAME")
const tBookVolume = game.tables.entities.find(t => t.name === "TABLE NAME")
const tBookSubjectDetail = game.tables.entities.find(t => t.name === tBookSubject)

// Define the message
let message = `This is a book about ${tBookSubject}, specifically ${tBookSubjectDetail}.
                The cover is ${tBookCondition}. The book's cover is ${tBookCover} and 
                it is a ${tBookVolume}.`
// Print the message
fPrintMessage(message)