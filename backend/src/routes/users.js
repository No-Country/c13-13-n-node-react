const { Router } = require("express");
const { createUser, getAllUsers, getUserID } = require("../controllers/Usercontroller");
const router = Router();
const authController = require('../controllers/authController');
const User = require("../models/User");

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
// //eliminar permanentemente usuario
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

// router.put("/", async (req, res) => {
//   try {
//     const {
//       id,
//       email,
//       role,
//       fullname,
//       profile,
//       avatar,
//       status,
//       birthdate,
//     } = req.body;

//     let result = await updateUser(
//       id,
//       email,
//       role,
//       fullname,
//       profile,
//       avatar,
//       status,
//       birthdate,
//     );
//     res.status(200).send(result);
//   } catch (error) {
//     res.status(400).send(console.log(error.message));
//   }
// });


// });




module.exports = router;
