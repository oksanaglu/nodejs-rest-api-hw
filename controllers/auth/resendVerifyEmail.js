const { User, schemas } = require("../../models/user");
const { RequestError, createVerifyEmail, sendEmail } = require("../../utils");

const resendVerifyEmail = async (req, res) => {
  const { error } = schemas.verifyEmailSchema.validate(req.body);
  if (error) {
    throw RequestError(400, "missing required name field");
  }

  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(400, "Email not found");
  }

  const mail = createVerifyEmail(email, user.verificationToken);
  await sendEmail(mail);

  res.json({
    message: "Verify email resend",
  });
};

module.exports = resendVerifyEmail;