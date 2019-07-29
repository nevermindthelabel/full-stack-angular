const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const router = require('./routes/index');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json({ extended: false }));
app.use(cors());
app.use(router);

mongoose.connect('mongodb://localhost:27017/MEANstack', {
  useNewUrlParser: true,
  useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', () => console.log('DB connected'));

app.listen(PORT, () => console.log(`🏃‍  on http://localhost:${PORT}`));
