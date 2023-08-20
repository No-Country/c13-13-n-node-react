const { Router } = require('express');
// Importar todos los routers;
const ChatRouter= require('./chats');
const Users = require('./users');
const Auth = require('./auth')

const router = Router();

// Configurar los routers
router.use('/chats', ChatRouter);
router.use('/users', Users);
router.use('/auth', Auth);

module.exports = router;