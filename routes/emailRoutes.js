const express = require('express');
const router = express.Router();
const { receiveMessage, upload } = require('./messageController');

// Ruta para recibir mensajes
router.post('/message', upload.array('files'), receiveMessage);

module.exports = router;
