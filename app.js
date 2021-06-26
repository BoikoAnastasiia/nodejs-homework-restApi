const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const HttpCodes = require('./helpers/httpCodes');

const usersRouter = require('./routes/api/users');
const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((_req, res) => {
  res.status(HttpCodes.NOT_FOUND).json({ message: 'Not found' });
});

app.use((err, _req, res, _next) => {
  res
    .status(err.status || HttpCodes.SERVER_ERROR)
    .json({ message: err.message || 'unknown error' });
});

module.exports = app;
