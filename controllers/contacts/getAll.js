const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  console.log(req.query)
  const { page = 1, limit = 10, ...query } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner, ...query }, "name email phone", {
    skip,
    limit,
  }).populate("owner", "name email");

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAll;