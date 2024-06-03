const express = require("express");
const router = express.Router();
const {
  userRegister,
  userLogin,
  userLogout,
} = require("../Controllers/UserController");

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/logout").get(userLogout);

module.exports = router;
