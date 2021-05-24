const { User, Notebook, Note } = require('../models'); 
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
        }, 
    user: async (parent, {username}) => {
        return User.findOne({username})
        .select('-__v -password')
    }, 
    notebook: async (parent, {username}) =>{
        const params = username ? {username} : {}; 
        return Notebook.find(params)
    }, 
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

        //add a new notebook 
        newNotebook: async(parent, args, context) => {
            if (context.user){
                const notebook = await Notebook.create({...args, username: context.user.username}
                )
                await User.findByIdAndUpdate(
                    {_id: context.user._id}, 
                    {$addToSet:{savedNotebook: notebook._id}}, 
                    {new: true}
                )

                return notebook; 
            }

            throw new AuthenticationError('Please login'); 
        }, 

        //delete a notebook 
        removeNotebook: async(parent, {notebookId}, context) => {
            if (context.user){
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id}, 
                    {$pull:{savedNotebook: {notebookId: notebookId}}}, 
                    {new: true}
                )

                return updatedUser; 
            }

            throw new AuthenticationError('Please login'); 
        }, 

        //add a note into a notebook 
        newNote: async (parent, args, context) => {
            if (context.notebook){
                const updatedNotebook = await Note.create({...args, username: context.user.username}
                )
                await Notebook.findByIdAndUpdate(
                    {_id: context.notebook._id}, 
                    {$addToSet:{savedNotes: note._id}}, 
                    {new: true}
                )

                return note; 
            }

            throw new AuthenticationError('Please login'); 
        }, 

        //remove a note inside a notebook 
        removeNote: async(parent, {notebookId}, context) => {
            if (context.notebook){
                const updatedNotebook = await User.findOneAndUpdate(
                    {_id: context.notebook._id}, 
                    {$pull:{savedNotes : {notebookId: notebookId}}}, 
                    {new: true}
                )

                return updatedNotebook; 
            }

            throw new AuthenticationError('Please login'); 
        }, 
    }
}

module.exports = resolvers; 