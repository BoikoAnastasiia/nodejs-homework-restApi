require('dotenv').config();
const mongoose = require('mongoose');
const DB_CONNECT = process.env.DB_CONNECT;

const db = mongoose.connect(DB_CONNECT, {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () =>
  console.log('Mongoose connected to db')
);
mongoose.connection.on('error', error =>
  console.log(`Mongoose connection error: ${error.message}`)
);
mongoose.connection.on('disconnected', () =>
  console.log('Mongoose disconnected')
);

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed and app exit');
  process.exit(1);
});

module.exports = db;
