import db from "../database/database";

async function addContact(name, phone, email, address) {
  await db.query(
    'INSERT INTO contacts (name, phone, email, address) VALUES ($1, $2, $3, $4)',
    [name, phone, email, address]
  );
  console.log('Contact added!');
}

export default addContact;