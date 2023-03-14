const { Contact, schemas } = require("../../models/contact");

const { RequestError } = require("../../utils");

const updateById = async (req, res) => {
    const { error } = schemas.addSchema.validate(req.body);
  if (error) {
    throw RequestError(400, "missing fields");
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateById;