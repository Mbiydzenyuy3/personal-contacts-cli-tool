//contactServices.js

import db from "../database/database.js"; 

 async function addContact({ name, phone, email, notes, tags }) {
  await db.query(
    "INSERT INTO contacts (name, phone, email, notes, tags) VALUES ($1, $2, $3, $4, $5)",
    [name, phone, email, notes, tags]
  );
  console.log("Contact added!");
}

 const getAllContacts = async () => {
  const result = await db.query("SELECT * FROM contacts");
  return result.rows;
 };

 export { addContact, getAllContacts}