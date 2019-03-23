
const yargs = require("yargs");
const app = require("./app")

const flags = yargs
  .usage("$0: Usage <cmd> [options]")
  .command({
    command: "quote",
    desc: "gets a quote",
    builder: (yargs) => {
      return yargs
        .options("s", {
          alias: "search",
          describe: "search for a key word"
        })
        .options("r", {
          alias: "random",
          describe: "gets a random quote"
        })
        .options("n", {
          alias: "num",
          describe: "number of quotes to return (limit is 5)"
        })
    },
    handler: (argv) => {
      app.get_quote(argv.search, argv.random, argv.num);
    }
  })
  .help("help")
  .argv
