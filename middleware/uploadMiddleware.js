const multer = require('multer');

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/img/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = file.originalname.split('.').pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
  }
});

// Configuración de Multer para aceptar solo ciertos formatos de archivo
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Formato de archivo no válido. Solo se permiten imágenes JPEG y PNG.'));
  }
};

// Configuración de Multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // Tamaño máximo del archivo: 5MB
  },
  fileFilter: fileFilter
});

module.exports = upload;
