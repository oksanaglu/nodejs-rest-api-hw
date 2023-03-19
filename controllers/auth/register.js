const bcrypt = require("bcryptjs");
const { User, schemas } = require("../../models/user");
const { RequestError } = require("../../utils");


const register = async (req, res) => {
  const { error } = schemas.registerSchema.validate(req.body);
  if (error) {
    throw RequestError(400, "missing required name field");
  }
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ name, email, password: hashPassword });
  res.status(201).json({
    name: result.name,
    subscription: result.subscription,
  });
};


module.exports = register;
