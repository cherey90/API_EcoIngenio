const Color = require('../models/imprentaColor');

// Obtener todos los colores
const getAllColors = async (req, res) => {
  try {
    const colors = await Color.find();
    res.status(200).json(colors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo color
const createColor = async (req, res) => {
  try {
    const { name, hexCode, activo } = req.body;

    const color = new Color({
      name,
      hexCode,
      activo,
    });

    const newColor = await color.save();
    res.status(201).json(newColor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un color por su ID
const getColorById = async (req, res) => {
  try {
    const color = await Color.findById(req.params.id);
    if (!color) {
      return res.status(404).json({ message: 'Color no encontrado' });
    }
    res.status(200).json(color);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un color por su ID
const updateColor = async (req, res) => {
  try {
    const { name, hexCode, activo } = req.body;

    const updatedColor = await Color.findByIdAndUpdate(
      req.params.id,
      { name, hexCode, activo },
      { new: true }
    );

    if (!updatedColor) {
      return res.status(404).json({ message: 'Color no encontrado' });
    }

    res.status(200).json(updatedColor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un color por su ID
const deleteColor = async (req, res) => {
  try {
    const color = await Color.findByIdAndDelete(req.params.id);
    if (!color) {
      return res.status(404).json({ message: 'Color no encontrado' });
    }
    res.status(200).json({ message: 'Color eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllColors,
  createColor,
  getColorById,
  updateColor,
  deleteColor,
};
