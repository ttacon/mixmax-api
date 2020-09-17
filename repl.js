const argv = require("yargs").argv;
const repl = require("repl");

const Mixmax = require("./index");

repl.start("mixmax::> ").context.mixmax = new Mixmax(argv.token);
