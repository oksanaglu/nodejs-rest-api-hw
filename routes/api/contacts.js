const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../utils");
const { isValidId } = require("../../middlewares");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", ctrlWrapper(ctrl.add));

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeById));

router.put("/:id", isValidId, ctrlWrapper(ctrl.updateById));

router.patch("/:id/favorite", isValidId, ctrlWrapper(ctrl.updateFavorite));


module.exports = router;
