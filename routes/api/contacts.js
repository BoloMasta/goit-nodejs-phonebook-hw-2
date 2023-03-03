const express = require("express");

const router = express.Router();

const contactsFunctions = require("../../models/contacts");

const { validateCreateContact, validateUpdateContact } = require("../../validator");

router.get("/", async (req, res, next) => {
  const contacts = await contactsFunctions.listContacts();
  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsFunctions.getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: `Contact with id=${contactId} was not found.` });
  }
  res.json(contact);
});

router.post("/", async (req, res, next) => {
  const { error, value } = validateCreateContact(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  const newContact = await contactsFunctions.addContact(req.body);
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsFunctions.removeContact(contactId);
  if (!contact) {
    return res.status(404).json({ message: `Contact with id=${contactId} was not found.` });
  }
  res.status(200).json({ message: `Contact with id=${contactId} was deleted.` });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  const { error, value } = validateUpdateContact(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  // if (!req.body.name && !req.body.email && !req.body.phone) {
  //   return res.status(400).json({ message: "Missing required field" });
  // }
  const contact = await contactsFunctions.updateContact(contactId, req.body);
  if (!contact) {
    return res.status(404).json({ message: `Contact with id=${contactId} was not found.` });
  }
  res.status(200).json(contact);
});

module.exports = router;
