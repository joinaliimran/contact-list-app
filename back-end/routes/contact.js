const express = require("express");
const { body } = require("express-validator");

const contactController = require("../controllers/contact");
const isAuth = require("../middleware/is-auth");

const router = express.Router();
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

router.post(
  "/contact",
  isAuth,
  [
    body("name").notEmpty().withMessage("Required"),
    body("phoneNumbers").notEmpty().matches(phoneRegExp).isLength({ min: 8 }),
  ],
  contactController.createContact
);

router.get("/contact", isAuth, contactController.getContacts);

router.put(
  "/contact/:contactId",
  isAuth,
  [
    body("name").notEmpty().withMessage("Required"),
    body("phoneNumbers").notEmpty().matches(phoneRegExp).isLength({ min: 8 }),
  ],
  contactController.updateContact
);

router.delete("/contact/:contactId", isAuth, contactController.deleteContact);
module.exports = router;
