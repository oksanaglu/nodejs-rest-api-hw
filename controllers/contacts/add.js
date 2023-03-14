
const { Contact, schemas } = require("../../models/contact");

const { RequestError } = require("../../utils");

const add = async (req, res) => {
  const { error } = schemas.addSchema.validate(req.body);
  if (error) {
    throw RequestError(400, "missing required name field");
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = add;