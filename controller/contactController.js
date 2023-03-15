//const fs = require("fs/promises");
const { Contact } = require("../model/contact");

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;

  // const data = await fs.readFile("./controller/contacts.json", "utf-8");
  // const contacts = JSON.parse(data);
  // return contacts;
};

const getContactById = async (_id) => {
  const contact = await Contact.find({ _id });
  return contact;

  // const contacts = await listContacts();
  // const contact = contacts.find((item) => item.id === contactId);
  // return contact;
};

const removeContact = async (_id) => {
  await Contact.findOneAndDelete({ _id });

  // const contacts = await listContacts();
  // const index = contacts.findIndex((item) => item.id === contactId);
  // if (index === -1) {
  //   return null;
  // }
  // const [contact] = contacts.splice(index, 1);
  // await fs.writeFile("./controller/contacts.json", JSON.stringify(contacts));
  // return contact;
};

const addContact = async (body) => {
  const contact = new Contact(body);
  await contact.save();
  return contact;

  // const contacts = await listContacts();
  // const newContact = { id: `${contacts.length + 1}`, ...body };
  // contacts.push(newContact);
  // await fs.writeFile("./controller/contacts.json", JSON.stringify(contacts));
  // return newContact;
};

const updateContact = async (_id, body) => {
  await Contact.findByIdAndUpdate(_id, body);

  return body;

  // const contacts = await listContacts();
  // const index = contacts.findIndex((item) => item.id === contactId);
  // if (index === -1) {
  //   return null;
  // }
  // contacts[index] = { ...contacts[index], ...body };
  // await fs.writeFile("./controller/contacts.json", JSON.stringify(contacts));
  // return contacts[index];
};

const updateContactStatus = async (_id, body) => {
  await Contact.findByIdAndUpdate(_id, body);

  return body;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
};
