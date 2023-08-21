const { User, Room } = require("../db");



const updateUser = async function (email, role, fullname, profile, avatar, birthdate){

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