//list.js
import { printHeader, printTable } from "../utils/format.js";
import { getAllContacts } from "../services/contactServices.js";

export default {
  command: 'list',
  describe: 'List all contacts',
  handle: async () => {
    printHeader();
    const contacts = await getAllContacts();
    if (contacts.length > 0) {
      printTable(contacts);
    } else {
      console.log('No contacts found!');
    }
  }
}