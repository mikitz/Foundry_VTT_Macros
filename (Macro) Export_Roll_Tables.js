// This macro exports all of your roll tables as .TXT files.
// See Tools.ipynb for a script to convert them all to JSONs
let table_JSON = [];
let wait = async (ms) => new Promise((resolve)=> setTimeout(resolve, ms));

game.tables.forEach(table=> table_JSON.push({name : table.name, data : JSON.stringify(table.data) }));

(async ()=>{
  for(let table of table_JSON)
  {
    saveDataToFile(table.data, `JSON`, table.name);
    await wait(1000);
  }
})();