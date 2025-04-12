//contactServices.js

import db from "../database/database"; 

export const getAllContacts = async () => {
  const result = await db.query("SELECT * FROM contacts");
  return result.rows;
};