const express = require("express");
const router = express.Router();

const contactsController = require("../../controller/contactController");
const { validateCreateContact, validateUpdateContact } = require("../../model/contact");

// const checkContactId = (contact, contactId, res) => {
//   if (!contact) {
//     return res.status(404).json({ message: `Contact with id=${contactId} was not found.` });
//   }
// };

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsController.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (contactId.length !== 24) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const contact = await contactsController.getContactById(contactId);
    //checkContactId(contact, contactId, res);

    if (!contact) {
      return res.status(404).json({ message: `Contact with id=${contactId} was not found.` });
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = validateCreateContact(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const newContact = await contactsController.addContact(req.body);

    res.status(200).json(newContact);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (contactId.length !== 24) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const contact = await contactsController.removeContact(contactId);

    if (!contact) {
      return res.status(404).json({ message: `Contact with id=${contactId} was not found.` });
    }

    res.status(200).json({ message: `Contact with id=${contactId} was deleted.` });
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (contactId.length !== 24) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const { error, value } = validateUpdateContact(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const contact = await contactsController.updateContact(contactId, req.body);

    // checkContactId(contact, contactId, res);

    res.status(200).json(contact);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (contactId.length !== 24) {
      return res.status(400).json({ message: "Invalid id" });
    }

    if (!req.body.hasOwnProperty("favorite")) {
      return res.status(400).json({ message: "missing field favorite" });
    }

    const contact = await contactsController.updateContactStatus(contactId, req.body);

    // checkContactId(contact, contactId, res);

    res.status(200).json(contact);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
