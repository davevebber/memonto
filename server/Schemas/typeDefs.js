const { gql } = require('apollo-server-express'); 

const typeDefs = gql`
    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        newNotebook(title: String!): Notebook
        removeNotebook(title: String!): Notebook 
        newNote(title: String!, context: String!): Note
        removeNote(title: String!, context: String!): Note
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
        savedNote: [Note]
    }

    type Note{
        _id: ID
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