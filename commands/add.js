//add.js
export default async function addContact({ name, phone, email, notes, tags }) {
  await db.query(
    "INSERT INTO contacts (name, phone, email, notes, tags) VALUES ($1, $2, $3, $4, $5)",
    [name, phone, email, notes, tags]
  );
  console.log("Contact added!");
}
