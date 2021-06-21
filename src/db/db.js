require('dotenv').config();
const mongoose = require('mongoose');
const { DB_URL } = require('../core/config')

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Connected to DB');
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = InitiateMongoServer;
