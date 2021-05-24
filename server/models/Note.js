const { Schema, model } = require('mongoose'); 

//create note schema to reference into user 
const noteSchema = new Schema({
  title: {
      type: String, 
      required: true
  }, 
  content: {
      type: String, 
      required: true 
  }, 
  date: {
      type: Date, 
      default: Date.now
  }
}, 
{
    toJson: {
        getters: true
    },
}
)

const Note = model('Note', noteSchema)

module.exports = Note; 