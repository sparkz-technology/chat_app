const User = require("../models/user.js");

const isFieldUnique = (field, message) => async (value) => {
  try {
    const user = await User.findOne({ [field]: value });
    if (user) {
      return Promise.reject(message);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = isFieldUnique;
