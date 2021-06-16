const ObjectId = require('mongodb').ObjectID;

const getcontacts = async (req, res) => {
  const contacts = await req.db.contacts.find({}).toArray();
  res.json({ contacts });
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await req.db.contacts.findOne({ _id: new ObjectId(id) });

  if (!post) {
    return res.status(400).json({
      status: `failure, no contacts with id '${id}' found!`,
    });
  }

  res.json({ post, status: 'success' });
};

const addPost = async (req, res) => {
  const { topic, text } = req.body;

  await req.db.contacts.insert({ topic, text });

  res.json({ status: 'success' });
};

const changePost = async (req, res) => {
  const { topic, text } = req.body;

  await req.db.contacts.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { topic, text } }
  );

  res.json({ status: 'success' });
};

const deletePost = async (req, res) => {
  await req.db.contacts.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ status: 'success' });
};

module.exports = {
  getcontacts,
  getPostById,
  addPost,
  changePost,
  deletePost,
};
