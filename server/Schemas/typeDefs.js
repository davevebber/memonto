const { gql } = require('apollo-server-express'); 

const typeDefs = gql`
    type Query {
        me: User
        user(username:String!): User
        notebook(username: String!): [Notebook]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        newNotebook(title: String!): Notebook
        removeNotebook(notebookId: ID!): Notebook
        newNote(notebookId: ID, title: String, content: String): Notebook
        updatedNote(notebookId: ID, noteId: ID, title: String, content: String): Notebook
        removeNote(noteId: ID): Notebook
    }

    type User{
        _id: ID
        username: String
        email: String
        password: String
        savedNotebook: [Notebook]
    }

    type Notebook{
        _id: ID
        title: String
        savedNotes: [Note]
    }

    type Note{
        _id: ID
        title: String
        content: String
        username: String
    }

    type Auth{
        token: ID!
        user: User
    }
`
//not sure if it should be type note or input note 

module.exports = typeDefs; 