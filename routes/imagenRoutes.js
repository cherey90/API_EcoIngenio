const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const imagenController = require('../controllers/imagenController');

// Ruta para subir una imagen
router.post('/', upload.single('image'), imagenController.uploadImage);

// Ruta para eliminar una imagen por su ID
router.delete('/:id', imagenController.deleteImage);

// Ruta para obtener todas las imágenes
router.get('/', imagenController.getAllImages);

// Ruta para obtener una imagen por su ID
router.get('/:id', imagenController.getImageById);

module.exports = router;
