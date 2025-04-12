import yargs from "yargs";
import db from "../database/database.js";

export default {
  command: "delete <id>",
  describe: "Delete a contact by ID",
  handler: async (argv) => {
    const { id } = argv;
    const result = await db.query("SELECT * FROM contacts WHERE id = $1", [id]);
    if (result.rowCount.length > 0) {
      const confirm = await askForConfirmation();
      if (confirm) {
        await db.query("DELETE FROM contacts WHERE id = $1", [id]);
        console.log(`Contact with ID ${id} deleted!`);
      } else {
        console.log("Contact deletion canceled.");
      }
    } else {
      console.log("No contact found with that ID.");
    }
  },
};

async function askForConfirmation() {
  // Implement a simple confirmation prompt (e.g., using inquirer or readline)
  const confirm = await prompt(
    "Are you sure you want to delete this contact? (y/n): "
  );
  return confirm.toLowerCase() === "y";
}
