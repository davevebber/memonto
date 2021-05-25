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
                const notebook = await Notebook.create({...args}
                )
                const updatedUser = await User.findByIdAndUpdate(
                    
                    {_id: context.user._id}, 
                    {$addToSet:{savedNotebook: notebook._id}}, 
                    {new: true}
                )
                    console.log(updatedUser, notebook)
                return notebook; 
            }

            throw new AuthenticationError('Please login'); 
        }, 

        // newNotebook: async(parent, {title}, context) => {
        //     if(context.user){
        //         const updatedUser = await User.findOneAndUpdate(
        //             {_id: context.user._id}, 
        //             {$push: {savedNotebook: {title}}}, 
        //             //{new: true, runValidators: true},

        //             function (error, success){
        //                 if(error) {
        //                     console.log(error); 
        //                 } else {
        //                     console.log(success); 
        //                 }
        //             }
        //         )
        //         //console.log(updatedUser)
        //         return updatedUser
        //     }
        //     throw new AuthenticationError('Please login'); 
        // }, 

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
 

        //add a new note into notebook 
        newNote: async(parent, {notebookId, title, content}, context) => {
            if(context.user){
                const updatedNotebook = await Notebook.findByIdAndUpdate(
                    {_id: notebookId}, 
                    {$push: {savedNotes: {title, content, username: context.user.username}}}, 
                    {new: true, runValidators: true}
                )
                return updatedNotebook
            }
            throw new AuthenticationError('Please login'); 
        }, 


        //updating a note
        updatedNote: async (parent, {notebookId, noteId, title, content}, context) => {
            if(context.user){
                const updatedNote = await Notebook.findOne(
                   {_id: notebookId}
                )
                console.log(updatedNote)
                let update = updatedNote.savedNotes.find((note)=> {
                console.log(note._id, noteId)
                return note._id == noteId
                })
                console.log(update); 
                update.title = title 
                update.content = content
                const updated = await updatedNote.save(); 

                return updated
            }
            throw new AuthenticationError('Please login')
        },

        //remove a note inside a notebook 
        removeNote: async(parent, {notebookId, noteId}, context) => {
            if (context.user){
                const deleteNotebook = await Notebook.findOneAndUpdate(
                    {_id: notebookId}, 
                    {$pull: {savedNotes: {noteId: noteId}}}, 
                    {new: true}
                )

                return deleteNotebook; 
            }

            throw new AuthenticationError('Please login'); 
        }, 
    }
}

module.exports = resolvers; 