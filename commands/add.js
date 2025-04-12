import { describe } from "yargs";
import addContact from "../services/contactF";

export default {
  command: 'add',
  describe: 'Add a new contact',
  builder: {
    name: { demandOption: true, type: 'string' },
    phone: { demandOption: true, type: 'string' },
    email: { type: 'string' },
    notes: {type: 'string'}
  },

  handler: async (argv) => {
    await addContact(argv);
  }
}