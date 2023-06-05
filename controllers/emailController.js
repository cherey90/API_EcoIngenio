const Message = require('../models/Message');
const multer = require('multer');

// Configuración de multer para el almacenamiento de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directorio de destino para almacenar los archivos
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const filename = `${timestamp}_${file.originalname}`;
    cb(null, filename); // Nombre de archivo personalizado
  },
});

// Función de filtrado para aceptar solo ciertos tipos de archivos
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Formato de archivo no válido'), false);
  }
};

// Configuración de multer para la carga de archivos
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Controlador para recibir un mensaje y adjuntar un archivo
const createMessage = (req, res) => {
  const { name, email, telefono, mensaje } = req.body;

  // Crear una nueva instancia del modelo Message
  const newMessage = new Message({
    name,
    email,
    telefono,
    mensaje,
    archivo: req.file ? req.file.filename : null, // Nombre del archivo adjunto si existe
  });

  // Guardar el mensaje en la base de datos
  newMessage.save((err, message) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al guardar el mensaje' });
    } else {
      res.status(201).json({ message });
    }
  });
};

module.exports = {
  createMessage,
};
