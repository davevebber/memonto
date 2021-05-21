// const { User } = require('../models'); 
// const { signToken } = require('../utils/auth'); 

// module.exports = {
//     //get single user by username or id
//     async getOneUser({user = null, params}, res){
//         const singleUser = await User.findOne({
//             $or: [{_id: user ? user._id : params.id}, 
//             {username: params.username}],
//         }); 

//         if(!singleUser){
//             return res.status(400).json({ message: "Cannot find user"}); 
//         }

//         res.json(singleUser); 
//     }, 

//     //creating a user 
//     async createUser({body}, res){
//         const user = await User.create(body); 

//         if(!user){
//             return res.status(400).json({message: 'Something went wrong'}); 
//         }

//         const token = signToken(user); 
//         res.json({token, user}); 
//     }, 

//     //login a user 
//     async login({body}, res){
//         const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
//         if (!user) {
//           return res.status(400).json({ message: "Cannot find this user" });
//         }
    
//         const isCorrectPassword = await user.isCorrectPassword(body.password);
    
//         if (!isCorrectPassword) {
//           return res.status(400).json({ message: 'Password is incorrect' });
//         }
//         const token = signToken(user);
//         res.json({ token, user });
//     }, 
 
//     //save notebook to user 
//     async saveNotebook({user, body}, res) {
//         try{
//             const updatedUser = await User.findOneAndUpdate(
//                 {_id: user.id}, 
//                 {$addToSet: {savedBooks: body}}, 
//                 {new: true, runValidators: true}
//             ); 
//             return res.json(updatedUser); 
//         } catch (err){
//             console.log(err); 
//             return res.status(400).json(err); 
//         }
//     }, 

//     //remove notebook from User
//     async deleteNotebook({user, params}, res){
//         const updatedUser = await User.findOneAndUpdate(
//             {_id: user.id}, 
//             {$pull: {savedNotebook: {notebookId: params.notebookID}}}, 
//             {new: true}
//         ); 
//         if (!updatedUser){
//             return res.status(400).json({message: "Could not find user"}); 
//         }
//         return res.json(updatedUser); 
//     },
// }; 