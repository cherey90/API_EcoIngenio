const mongoose = require("mongoose");

const imprentaColorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hexCode: {
      type: String,
      required: true,
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const imprentaColor = mongoose.model("imprentaColor", imprentaColorSchema);

module.exports = imprentaColor;
