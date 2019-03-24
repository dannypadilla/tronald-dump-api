
const config = require("./config");
const superagent = require("superagent");

const quotes = "._embedded.quotes";
const total_num_of_quotes = ".body.total"
const search_queries = ["obama", "hillary", "mexico", "cnn", "russia"]

const _fetch = (command) => {
  return superagent
    .get(`${config.url}${command}`)
    .then(res => res.body)
    .catch(e => e.response.body)
}

exports.search = (query) => {
  if (query != "") {
    return _fetch(`search/quote?query=${query}`);
  } else {
    const rand = Math.floor(Math.random() * search_queries.length); // calclate random val
    return _fetch(`search/quote?query=${search_queries[rand]}`); // get random query
  }
}

exports.get_id_list = (query) => {
  const quotes = query._embedded.quotes;
  let id_list = []
  for (let i = 0; i < quotes.length; i++) {
    id_list.push(quotes[i].quote_id);
  }
  return id_list;

}

exports.get_ids = (query) => {

}

exports.search_by_id = (id) => {
  return _fetch(`quote/${id}`)
}
