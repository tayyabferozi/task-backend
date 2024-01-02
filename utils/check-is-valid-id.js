const mongoose = require("mongoose");

module.exports = async (value) => {
  console.log(value);
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error("Invalid ID");
  }
};
