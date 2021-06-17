const ObjectId = require('mongodb').ObjectID;

const getСontacts = async (req, res) => {
  const contacts = await req.db.contacts.find({}).toArray();
  res.json({ contacts });
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const Contact = await req.db.contacts.findOne({ _id: new ObjectId(id) });

  if (!Contact) {
    return res.status(400).json({
      status: `failure, no contacts with id '${id}' found!`,
    });
  }

  res.json({ Contact, status: 'success' });
};

const addContact = async (req, res) => {
  const { name, email, phone, favorite } = req.body;

  await req.db.contacts.insert({ name, email, phone, favorite });

  res.json({ status: 'success' });
};

const changeContact = async (req, res) => {
  const { name, email, phone, favorite } = req.body;

  await req.db.contacts.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { name, email, phone, favorite } }
  );

  res.json({ status: 'success' });
};

const deleteContact = async (req, res) => {
  await req.db.contacts.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ status: 'success' });
};

module.exports = {
  getСontacts,
  getContactById,
  addContact,
  changeContact,
  deleteContact,
};
