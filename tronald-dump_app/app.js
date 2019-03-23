
const superagent = require("superagent")
const inquirer = require("inquirer")

async function get_quote(search = "", random = true, num = 1) {

  if (search != "") {
    random = false
  }
  const api_base = "https://api.tronalddump.io";
  const search_base = "search/quote?query=";
  const fetch_base = "quote"

  const default_search = "obama"

  const search_response = await superagent.get(`${api_base}/${!random ? search_base + search: search_base + default_search}`)

  let count = search_response.body.total
  console.log("\nThere are a total of", count, "quotes\n")
  //console.log(search_response.body)
  //console.log(search_response.body._embedded.quotes)
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
