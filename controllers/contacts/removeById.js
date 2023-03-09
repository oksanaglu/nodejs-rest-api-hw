const contacts = require("../../models/contacts");

const { RequestError } = require("../../utils");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

module.exports = removeById;