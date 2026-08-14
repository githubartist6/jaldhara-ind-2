const express = require("express");

const router = express.Router();

const {
  saveContact,
  getAllContacts,
  deleteContact,
} = require("../controllers/contactController");

// contact post
router.post("/contact", saveContact);

// contact get
router.get("/getcontact", getAllContacts);

// contact dlete
router.delete("/getcontact/:id", deleteContact);

module.exports = router;
