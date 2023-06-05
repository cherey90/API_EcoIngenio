const mongoose = require('mongoose');

const imagenSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  filename: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Imagen = mongoose.model('Imagen', imagenSchema);

module.exports = Imagen;
