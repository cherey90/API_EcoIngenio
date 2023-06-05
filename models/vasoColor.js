const mongoose = require("mongoose");

const vasoColorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hexCode: {
      type: String,
      required: true,
    },
    tipo: { 
      type: String, 
      enum: ['opaco', 'transparente'], 
      required: true,
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const vasoColor = mongoose.model("vasoColor", vasoColorSchema);

module.exports = vasoColor;
