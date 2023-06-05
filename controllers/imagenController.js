const Imagen = require('../models/Imagen');
const fs = require('fs');
const path = require('path');

// Controlador para subir una imagen
const uploadImage = async (req, res) => {
  try {
    const { name, category } = req.body;
    const { filename, mimetype, size } = req.file;

    const image = new Imagen({
      name,
      category,
      filename,
      mimetype,
      size,
    });

    const savedImage = await image.save();

    res.status(201).json(savedImage);
  } catch (error) {
    res.status(500).json({ error: 'Error al subir la imagen' });
  }
};

// Controlador para eliminar una imagen
const deleteImage = async (req, res) => {
  try {
    const imageId = req.params.id;
    const image = await Imagen.findById(imageId);

    if (!image) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }

    const imagePath = path.join(__dirname, '../uploads/img', image.filename);

    fs.unlink(imagePath, async (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al eliminar la imagen' });
      }

      await image.deleteOne();
      res.json({ message: 'Imagen eliminada correctamente' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la imagen' });
  }
};

// Controlador para obtener todas las imágenes
const getAllImages = async (req, res) => {
  try {
    const images = await Imagen.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las imágenes' });
  }
};

// Controlador para obtener una imagen por su ID
const getImageById = async (req, res) => {
  try {
    const imageId = req.params.id;
    const image = await Imagen.findById(imageId);

    if (!image) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }

    res.json(image);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la imagen' });
  }
};

module.exports = { uploadImage, deleteImage, getAllImages, getImageById };
