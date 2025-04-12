import yargs from "yargs";
import { printHeader, printTable } from "../utils/format.js";
import db from "../database/database.js";

export default {
  command: "search <keyword>",
  describe: "Search contacts by name, phone, or email",
  builder: {
    keyword: {
      demandOption: true,
      type: "string",
      describe: "Keyword to search for (name, phone, or email)",
    },
  },
  handler: async (argv) => {
    const { keyword } = argv;

    // Search the contacts database for the keyword
    const result = await db.query(
      `SELECT * FROM contacts WHERE name ILIKE $1 OR phone ILIKE $1 OR email ILIKE $1`,
      [`%${keyword}%`]
    );

    if (result.rows.length === 0) {
      console.log(`No contacts found matching "${keyword}".`);
      return;
    }

    printHeader();
    printTable(result.rows);
  },
};
