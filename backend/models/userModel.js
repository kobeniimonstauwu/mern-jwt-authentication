import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({

name: {
    type: String, 
    required: true // Strictly a string only
},

email: {
    type: String, 
    required: true,
    unique: true      // This means that there is no matching data/email in our database
},

password: {
    type: String, 
    required: true
}

}, 
// THIS COMMA IS FOR SETTING UP THE TIMESTAMPS (RIGHT AFTER THE SCHEMA)
{
    timestamps: true
}

)
//BEFORE CREATING A USER
userSchema.pre('save', async function (next){ //An async middleware function
    if(!this.isModified('password')){
        // "this" in this situation is the created user itself from the register controller used in user.create({})
        // !this.isModified() means that "if the password isn't changed", then it'll move to the next piece of middleware
        // This is BEFORE THE UPDATE of password
        next()
    }
    //THIS IS BEFORE THE CREATION OF PASSWORD
    const salt = await bcrypt.genSalt(10) // salt is the variable needed to hash a password, along with it is setting up the no. of characters it generates
    this.password = await bcrypt.hash(this.password, salt) // changing plain text through hash method with parameters as the plain text password and the
                                                            // salt which is what kind of hashing it would do
})

userSchema.methods.matchPassword = async function(enteredPassword){ // This will take in the value of the password entered in the login form
    return await bcrypt.compare(enteredPassword, this.password) // the compare method will take in 2 values, which is the existing hashed password, and the enetered password
                                                // IT WILL COMPARE THE 2 IF IT MATCHES - RETURNS TRUE
                                                // IF IT DOESN'T - RETURNS FALSE
                                                
}

const User = mongoose.model('User', userSchema)

export default User