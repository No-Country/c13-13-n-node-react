const { User, Room } = require("../db");


const updateUser = async function (id, email, role, fullname, profile, avatar, status, birthdate) {

    if (!email, !role, !fullname) {
      throw new Error('You must complete fields')
    }
    const searchUser = await User.findOne({
      where: {
        id: id,
      },
    });
  
    if (searchUser) {
      const updateUser = await User.update({
        email: email,
        role: role,
        fullname: fullname,
        profile: profile,
        avatar: avatar,
        status: status,
        birthdate: birthdate
      }, {
        where: {
          id: id,
        }
      });
  
     //envio email usuario baneado 
     if(status === 'suspended'){
     await userBaned(email, fullname)
     }
      return `New User ${email} was created and added successfully`
    } else {
  
      return `${email} email already exists`
    }
  }
const getAllUsers = async function(){

    const users = await User.findAll();
    console.log(users);
    return users
}
 
const getUserID = async function (id) {
    if (id) {
        const user = await User.findOne({
            where: {
                id: id,
            },
            include: 
            [    { model: Room }
            ]
        })
        if (user) {
            return user
        } else {
            return "User is not registered in the database"
        }
    }else{
         const allUsers = await User.findAll()
    return allUsers;
    }
   
}

// const createUser = async function (email, role, fullname, profile, avatar, birthdate) {
//   if (!email) {
//     throw new Error('You must complete email, role and fullname')
//   }
//   const searchUser = await User.findOne({
//     where: {
//       email: email,
//     },
//   });
//   if (!searchUser) {
//     const newUser = await User.create({
//       email: email,
//       role: role,
//       fullname: fullname,
//       profile: profile,
//       avatar: avatar,
//       birthdate: birthdate
//     });

//     return `New User ${email} was created successfully`
//   } else {

//     return `${email} email already exists`
//   }
// }



module.exports = { getAllUsers, getUserID };