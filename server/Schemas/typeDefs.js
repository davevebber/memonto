const { gql } = require ('apollo-server-express'); 

const typeDefs = gql`
    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        newUser(username: String!, email: String!, password: String!): Auth
        newNotebook()
        newNote()
    }

    type User{
        _id: ID
        username: String
        email: String
        savedNotes: [Note]
    }

    type Note{
        noteId: String
        title: String
        content: String
    }

    type Notebook{
        notebookId: String
        title: String
    }

    type Auth{
        token: ID!
        user: User
    }
`
//not sure if it should be type note or input note 

module.exports = typeDefs; 