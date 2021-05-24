const { Schema, model } = require('mongoose');

// //import note schema 
// const noteSchema = require('./Note');

//create notebook schema
const notebookSchema = new Schema({
    username: {
        type: String, 
        required: true
    }, 

    title: {
        type: String,
        required: true
    },
    //connect to note schema as an array of data 
    savedNotes: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Note'}
    ]
},
    {
        toJson: {
            virtuals: true,
            getters: true
        },
    }
)


//show saved notes 
notebookSchema.virtual('noteCount').get(function () {
    return this.savedNotes.length;
});

const Notebook = model('Notebook', notebookSchema)

module.exports = Notebook;