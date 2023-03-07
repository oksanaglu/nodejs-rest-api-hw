const contacts = require("../../models/contacts");

const { RequestError } = require("../../middlewares/index");

const { contactSchema } = require("../../schemas/contacts");

const updateById = async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw RequestError(400, "missing fields");
  }
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateById;