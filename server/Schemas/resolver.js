const { User } = require('../models'); 
const { signToken } = require('../utils/auth'); 
const { AuthenticationError } = require('apollo-server-express'); 

const resolvers = {
    Query: {
        me: async(parent, args, context) => {
            if (context.user){
                const userData = await User.findOne({_id: context.user._id})
                .select('-__v -password')

                return userData; 
            }

            throw new AuthenticationError("You are not logged in"); 
        }
    }, 

    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args); 
            const token = signToken(user); 

            return {token, user}
        }, 

        login: async(parent, {email, password})=>{
            const user = await User.findOne({email}); 

            if(!user){
                throw new AuthenticationError('Incorrect credentials'); 
            }

            const correctPassword = await user.isCorrectPassword(password); 

            if (!correctPassword){
                throw new AuthenticationError('Incorrect password'); 
            }

            const token = signToken(user); 
            return { token, user }; 
        }, 

        // saveNotebook: async(parent, args, {user}) => {
        //     if (user){
        //         const updatedUser = await User.findByIdAndUpdate(
        //             {_id: user.id}, 
        //             {$addToSet:{savedNotebook: args}}, 
        //             {new: true}
        //         ); 

        //         return updatedUser; 
        //     }

        //     throw new AuthenticationError('Please login'); 
        // }, 

        // removeNotebook: async(parent, {notebookId}, {user}) => {
        //     if(user){
        //         const updatedUser = await User.findOneAndUpdate(
        //             {_id: user._id}, 
        //             {$pull: {savedNotebook: {notebookId: notebookId}}}, 
        //             {new: true}
        //         ); 

        //         return updatedUser; 
        //     }

        //     throw new AuthenticationError('Please login'); 
        //}
    }
}

module.exports = resolvers; 