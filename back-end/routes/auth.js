const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");
const authController = require("../controllers/auth");

const router = express.Router();

router.post(
  "/signup",
  [
    body("name").notEmpty(),
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("Email is invalid.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email address already exists.");
          }
        });
      })
      .normalizeEmail(),
    body("password").notEmpty().trim().isLength({ min: 8 }),
  ],
  authController.signup
);

router.post(
  "/signin",
  [
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("Email is invalid.")
      .normalizeEmail(),
    body("password").notEmpty().trim().isLength({ min: 8 }),
  ],
  authController.signin
);

module.exports = router;
