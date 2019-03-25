
const config = require("./config");
const superagent = require("superagent");

const _fetch = (command) => {
  return superagent
    .get(`${config.url}${command}`)
    .then(res => res.body)
    .catch(e => e.response.body)
}

// returns an array of search result
exports.search = (query) => {
  return _fetch(`search/quote?query=${query}`);
}

// fetch data by id
exports.search_by_id = (id) => {
  return _fetch(`quote/${id}`)
}

// returns a list of ids for  - chains with expor
exports.get_id_list = (body) => {
  const quotes = body._embedded.quotes;
  let id_list = []
  for (let i = 0; i < quotes.length; i++) {
    id_list.push(quotes[i].quote_id);
  }
  return id_list;
}

exports.get_txt_value = (id) => {
  return id.value;
}
