const { Router } = require("express");
// Importar todos los routers;
const RoomRouter = require("./rooms");
const UsersRouter = require("./users");
const AuthRouter = require("./auth");
const MessageRouter = require("./message");

const router = Router();

// Configurar los routers
router.use("/rooms", RoomRouter);
router.use("/users", UsersRouter);
router.use("/auth", AuthRouter);
router.use("/message", MessageRouter);

module.exports = router;
