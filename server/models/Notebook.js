const { Schema, model } = require('mongoose');

//import note schema 
const noteSchema = require('./Note');

//create notebook schema
const notebookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    //connect to note schema as an array of data 
    savedNotes: [noteSchema]
},
    {
        toJson: {
            virtuals: true
        },
    }
)


//show saved notes 
notebookSchema.virtual('noteCount').get(function () {
    return this.savedNotes.length;
});

const Notebook = model('Notebook', notebookSchema)

module.exports = Notebook;