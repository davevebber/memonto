const { gql } = require('apollo-server-express'); 

const typeDefs = gql`
    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        newNotebook(title: String!): User
    }

    type User{
        _id: ID
        username: String
        email: String
        savedNotebook: [Notebook]
    }

    type Notebook{
        notebookId: String
        title: String
        savedNote: [Note]
    }

    type Note{
        noteId: String
        title: String
        content: String
    }

    type Auth{
        token: ID!
        user: User
    }
`
//not sure if it should be type note or input note 

module.exports = typeDefs; 