const { validationResult } = require("express-validator");

const Contact = require("../models/contact");
const User = require("../models/user");
var mongoose = require("mongoose");

exports.createContact = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const name = req.body.name;
    const phoneNumbers = req.body.phoneNumbers;
    const contact = new Contact({
      name: name,
      phoneNumbers: phoneNumbers,
      creator: req.userId,
    });
    const user = await User.findById(req.userId);
    user.contacts.push(contact);
    let result = await user.save();
    result = await contact.save();
    res.status(200).json({
      message: "Contact created successfully!",
      contact: result,
      // creator: { _id: user._id, name: user.name },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getContacts = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("Invalid data.");
      error.statusCode = 404;
      throw error;
    }

    const userContactsPromises = user.contacts.map(async (cId) => {
      return await Contact.findById(cId._id.toString());
    });
    const userContacts = await Promise.all(userContactsPromises);

    res.status(200).json({ contacts: userContacts });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }
    const name = req.body.name;
    const phoneNumbers = req.body.phoneNumbers;

    const contact = await Contact.findById(contactId);
    if (!contact) {
      const error = new Error("Could not find contact.");
      error.statusCode = 404;
      throw error;
    }
    if (contact.creator.toString() !== req.userId) {
      const error = new Error("Not authorized!");
      error.statusCode = 403;
      throw error;
    }
    contact.name = name;
    contact.phoneNumbers = phoneNumbers;
    let result = await contact.save();

    res.status(200).json({ message: "Contact updated!", contact: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      const error = new Error("Could not find contact.");
      error.statusCode = 404;
      throw error;
    }
    if (contact.creator.toString() !== req.userId) {
      const error = new Error("Not authorized!");
      error.statusCode = 403;
      throw error;
    }
    let result = await Contact.findByIdAndRemove(contactId);
    const user = await User.findById(req.userId);

    user.contacts.pull(contactId);
    result = await user.save();
    res.status(200).json({ message: "Contact deleted!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
