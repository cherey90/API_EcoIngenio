require('dotenv').config();

console.log(process.env.JWT_SECRET);

module.exports = {
  require: 'dotenv/config',
  recursive: true,
};
