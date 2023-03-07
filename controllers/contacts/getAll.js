const contacts = require("../../models/contacts");

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  console.log(result);
  res.json(result);
};

module.exports = getAll;