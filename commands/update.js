import yargs from "yargs";
import inquirer from "inquirer";
import db from "../database/database.js";

export default {
  command: "update <id>",
  describe: "Update a contact by ID",
  builder: {
    id: {
      demandOption: true,
      type: "number",
    },
  },
  handler: async (argv) => {
    const { id } = argv;

    // Get the contact by ID from the database
    const result = await db.query("SELECT * FROM contacts WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      console.log(`No contact found with ID: ${id}`);
      return;
    }

    const contact = result.rows[0];

    // Prompt the user for updates
    const updates = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter new name (leave blank to keep unchanged):",
        default: contact.name,
      },
      {
        type: "input",
        name: "phone",
        message: "Enter new phone (leave blank to keep unchanged):",
        default: contact.phone,
      },
      {
        type: "input",
        name: "email",
        message: "Enter new email (leave blank to keep unchanged):",
        default: contact.email,
      },
      {
        type: "input",
        name: "notes",
        message: "Enter new notes (leave blank to keep unchanged):",
        default: contact.notes,
      },
      {
        type: "input",
        name: "tags",
        message:
          "Enter new tags (comma-separated, leave blank to keep unchanged):",
        default: contact.tags ? contact.tags.join(", ") : "",
      },
    ]);

    // Update the contact with new values
    const { name, phone, email, notes, tags } = updates;
    const updatedTags = tags
      ? tags.split(",").map((tag) => tag.trim())
      : contact.tags;

    await db.query(
      `UPDATE contacts SET name = $1, phone = $2, email = $3, notes = $4, tags = $5 WHERE id = $6`,
      [
        name || contact.name,
        phone || contact.phone,
        email || contact.email,
        notes || contact.notes,
        updatedTags || contact.tags,
        id,
      ]
    );

    console.log(`Contact with ID ${id} updated successfully!`);
  },
};
