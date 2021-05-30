const { gql } = require('apollo-server-express'); 

const typeDefs = gql`
    type Query {
        me: User
        user(username:String!): User
        notebook(username: String!): [Notebook]
        order(_id: ID): Order
        checkout(order: ID): Checkout
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        newNotebook(title: String!): Notebook
        removeNotebook(notebookId: ID!): Notebook
        newNote(notebookId: ID, title: String, content: String): Notebook
        updatedNote(notebookId: ID, noteId: ID, title: String, content: String): Notebook
        removeNote(notebookId: ID, noteId: ID): Notebook
        addOrder(order: ID): Order
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

    type Checkout {
        session: ID
    }

    type Order {
        _id: ID
        amount: Float
    }
`


module.exports = typeDefs; 