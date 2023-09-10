const { Router } = require("express");
require("dotenv").config();
const { createUser, getAllUsers, getUserID,updateUser } = require("../controllers/Usercontroller");
const router = Router();
const authController = require('../controllers/authController');
const User = require("../models/User");
const cloudinary = require('cloudinary').v2;
const { CLOU_NAME, API_KEY, API_SECRET} = process.env;
cloudinary.config({
  cloud_name: CLOU_NAME, // Reemplaza 'tu_cloud_name' con tu nombre de nube de Cloudinary
  api_key: API_KEY, // Reemplaza 'tu_api_key' con tu clave de API de Cloudinary
  api_secret: API_SECRET// Reemplaza 'tu_api_secret' con tu secreto de API de Cloudinary
});

router.post('/registro', authController.register);
router.post('/login', authController.login);


// crear usuario
router.post("/newuser", async (req, res) => {
  try {
    const { email, role, fullname, profile, avatar, birthdate } = req.body;
    let result = await createUser(
      email,
      role,
      fullname,
      profile,
      avatar,
      birthdate
    );
    // emailUser(email, fullname)
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).send(users)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await getUserID(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// //eliminar permanentemente usuario (proximamente)
// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     let result = await deleteUser(id);
//     res.status(200).send(result);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// //modificar datos del usuario
router.put("/", async (req, res) => {
  try {
    const { id, email, role, fullname, profile, avatar, status, birthdate } = req.body;

    let result = await updateUser( id, email, role, fullname, profile, avatar, status, birthdate);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(console.log(error.message));
  }
});


//http://localhost:3001/users/eliminar-imagen/:publicId
// Ruta para eliminar una imagen por su public_id
router.delete('/eliminar-imagen/:publicId', async (req, res) => {
  const { publicId } = req.params;
  const Id = `TellMe/${publicId}`;
  try {
    // Utiliza la API de Cloudinary para eliminar la imagen
    const result = await cloudinary.uploader.destroy(Id);
    // console.log(result)
    if (result.result === 'ok') {
      // La imagen se eliminó con éxito
      res.status(200).json({ message: 'Imagen eliminada con éxito' });
    } else {
      // Hubo un problema al eliminar la imagen
      res.status(500).json({ error: 'Error al eliminar la imagen' });
    }
  } catch (error) {
    console.error('Error al eliminar la imagen:', error);
    res.status(500).json({ error: 'Error al eliminar la imagen' });
  }
});



module.exports = router;
