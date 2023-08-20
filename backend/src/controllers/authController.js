const bcrypt = require('bcrypt');
const jwtUtils = require('../config/jwt'); 
const { User } = require("../db");


exports.register = async (req, res) => {
  const { email, role, fullname, profile, avatar, birthdate, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'debe ingresar email y password' });
  }else{
const searchUser = await User.findOne({
    where: {
      email: email
    },
  });
  if(searchUser){ 
    res.status(400).json({ error: `${email} email already exists` });
}else{
     try {
        // Si se ingresa email y password y el usuario no existe se creara uno nuevo
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ 
                                        email, 
                                        role,
                                        fullname,
                                        profile,
                                        avatar,
                                        birthdate,
                                        passwordToken: hashedPassword
                                    });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el usuario' });
  }
}
  } 
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'El usuario no existe' });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordToken);
    // console.log(passwordMatch);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const token = jwtUtils.generateToken({ userId: user.id, role:user.role });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
