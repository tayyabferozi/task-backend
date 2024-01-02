const mongoose = require("mongoose");

const rechordSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sectors: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = Record = mongoose.model("Record", rechordSchema);
