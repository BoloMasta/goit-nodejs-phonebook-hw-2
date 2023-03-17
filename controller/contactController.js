const { Contact } = require("../models/contact");

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (_id) => {
  const contact = await Contact.find({ _id });
  return contact;
};

const removeContact = async (_id) => {
  await Contact.findOneAndDelete({ _id });
};

const addContact = async (body) => {
  const contact = new Contact(body);
  await contact.save();
  return contact;
};

const updateContact = async (_id, body) => {
  await Contact.findByIdAndUpdate(_id, body);
  const updatedContact = await getContactById(_id);
  return updatedContact;
};

const updateContactStatus = async (_id, body) => {
  await Contact.findByIdAndUpdate(_id, body);
  const updatedContact = await getContactById(_id);
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
};
