#!/usr/bin/env node

import { Command } from "commander";
const program = new Command();

program
  .name("p-contact")
  .description("A simple person contact CLI tool built with Node.js")
  .version("1.0.0");

program
  .command("add <name>")
  // .command("edit <")
  .description("Add user name")
  // .option()
  .action((name) => {
    console.log(`Add User Name ${name}`);
  });

program.parse(process.argv);
