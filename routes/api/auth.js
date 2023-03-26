const express = require("express");
const router = express.Router();
const { ctrlWrapper } = require("../../utils");
// const { auth: ctrl } = require("../../controllers");
const ctrl = require("../../controllers/auth");
const { authCurrent, upload } = require("../../middlewares");


router.post("/register", ctrlWrapper(ctrl.register));

router.post("/login", ctrlWrapper(ctrl.login));

router.get("/current", authCurrent, ctrlWrapper(ctrl.current));

router.get("/logout", authCurrent, ctrlWrapper(ctrl.logout));

router.patch("/avatars", authCurrent, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));


module.exports = router;