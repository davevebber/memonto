const { Schema, model } = require('mongoose'); 
const bcrypt = require('bcrypt'); 

//import notebook schema 
// const notebookSchema = require('./Notebook'); 

//create user Schema 
const userSchema = new Schema(
    {
        username: {
            type: String, 
            required: true, 
            unique: true 
        }, 
        email: {
            type: String, 
            required: true, 
            unique: true, 
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        }, 

        password: {
            type: String, 
            required: true, 
        }, 
        //connect to note schema as an array of data 
            // savedNotebook: [notebookSchema]
    }, 
        {
            toJson: {
                virtuals: true
            },
        }
); 

//has user password 
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

// compare and validate password 
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

//show saved notebooks 
userSchema.virtual('notebookCount').get(function(){
    return this.savedNotebook.length; 
});


const User = model('User', userSchema); 

module.export = User; 