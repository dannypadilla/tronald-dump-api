
const dump = require("tronald-dump");
const inquirer = require("inquirer");

// hardcoded queries to handle random or missing search queries
const search_queries = ["obama", "hillary", "mexico", "cnn", "putin"]


// helper function to search the API based on input query
async function get_results(query) {
  return dump.search(query)
}


// gets the actual txt value - searches by id
async function get_txt(results) {
  let txt = []
  for (let i = 0; i < results.length; i++) {
    const msg = await dump.search_by_id(results[i]);
    const txt_value = await dump.get_txt_value(msg);
    txt.push(txt_value);
    txt.push(new inquirer.Separator())
  }
  return txt;
}


// return a random search query
function get_random_search_query() {
  const rand = Math.floor(Math.random() * search_queries.length);
  return search_queries[rand];
}


// prompter - from examples
async function prompt(txt_list) {
  return inquirer.prompt([{
    type: 'list',
    message: "Choose a quote to display?",
    name: "search",
    choices: txt_list,
    pageSize: 10
  }])
}


// print to console helper
function print(search, txt) {
  console.clear();
  console.log("\n\n------------------------------------------\n")
  console.log("* Here's what Trump said about", search.toUpperCase(), ":\n")
  console.log("*\t" + txt)
  console.log("\n-------------------------------------------\n\n\n")
}


// runs the program
async function search(search = "", random = false, debug=false) {
  console.clear();

  if (debug) {
    console.log("\n::Debug::")
    debug_print();

  } else {

    if (search == "" || random) {
      console.log("\nGetting random search...");
      search = get_random_search_query();
    }
    console.log("\n\tSearching for", search.toUpperCase(), "\n" );

    const result_body = await get_results(search); // returns body results
    // HANDLE - NO SEARCH RESULTS
    const result_ids = await dump.get_id_list(result_body); // searches body for id

    //result_quotes = result_body._embedded.quotes

    const result_txt = await get_txt(result_ids); // using id searches
    const choice_txt = await prompt(result_txt)

    print(search, choice_txt["search"])
  }
}

module.exports = {
  search
}


/* *** DEBUG ***  */
const debug_query = search_queries[0] // obama
async function debug_print() {
  console.log("\n\tSearch query:", debug_query.toUpperCase(), "\n")
  const result = await get_results(debug_query)
  console.log(result)
  console.log("\n\n\n\tSingle quote:\n\n", result._embedded.quotes[0])
}
