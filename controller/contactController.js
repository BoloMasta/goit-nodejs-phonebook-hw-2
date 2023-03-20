const { Contact } = require("../models/contact");

const listContacts = async () => {
  return await Contact.find();
};

const getContactById = async (_id) => {
  return await Contact.findOne({ _id });
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
  return await getContactById(_id);
};

const updateContactStatus = async (_id, body) => {
  await Contact.findByIdAndUpdate(_id, body);
  return await getContactById(_id);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
};
