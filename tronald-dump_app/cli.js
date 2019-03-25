
const yargs = require("yargs");
const app = require("./app")

const flags = yargs
  .usage("$0: Usage <cmd> [options]")
  .command({
    command: "search",
    desc: "Search what Donald Trump said about a topic via twitter",
    builder: (yargs) => {
      return yargs
        .options("t", {
          alias: "topic",
          describe: "search for a topic",
          type: "string"
        })
        .options("r", {
          alias: "random",
          describe: "gets a random quote",
          type: "boolean"
        })
        .options("d", {
          alias: "debug",
          describe: "runs a query to demo the full body structure",
          type: "boolean"
        })
    },
    handler: (argv) => {
      app.search(argv.topic, argv.random, argv.debug);
    }
  })
  .help("help")
  .argv
