const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User, schemas } = require("../../models/user");
const { RequestError, sendEmail, createVerifyEmail } = require("../../utils");
const { nanoid } = require("nanoid");


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

  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();
  const result = await User.create({ name, email, password: hashPassword, avatarURL, verificationToken });
  const mail = createVerifyEmail(email, verificationToken);
  await sendEmail(mail);
  res.status(201).json({
    name: result.name,
    subscription: result.subscription,
    avatarURL: result.avatarURL,
    verificationToken: result.verificationToken,
  });
};


module.exports = register;
