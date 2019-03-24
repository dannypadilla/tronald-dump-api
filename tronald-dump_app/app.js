
//const superagent = require("superagent")
const dump = require("tronald-dump")
const inquirer = require("inquirer")

async function get_quote(search = "", random = true, num = 1) {

  if (search != "") {
    random = false
  }

  const query = await dump.search(search);
  //const quotes = await dump.get_quotes(query);
  let ids = await dump.get_id_list(query);
  //console.log(quotes);
  console.log(ids);
  //console.log("\nThere are a total of", count, "quotes\n")

  let prompt_quote = await another_quote();
  //console.log(prompt_quote);

  while (prompt_quote.quote) {
    console.log("\nok\n")
    prompt_quote = await another_quote();
  }

}

async function another_quote() {
  return inquirer.prompt([{
    type: "confirm",
    name: "quote",
    message: "Would you like to see another quote?"
  }])
}

module.exports = {get_quote}
