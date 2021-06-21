require('dotenv').config();

module.exports = {
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  PORT: process.env.PORT,
  BASE_URL:process.env.BASE_URL,
  DB_URL:process.env.DB_URL,
};
