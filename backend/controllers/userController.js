import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'


// @desc Auth user/set token
// route POST /api/users/auth - URL where the tokens are set
// @access Public (access modifier is public - no need to be logged in to access this route || It will only be needed if it's protected)
const authUser = asyncHandler (async (req, res) => {
    // res.status(401) - "Unauthorized" type of error
    // throw new Error('Something wen\'t wrong') - Error created

    const { email, password } = req.body // Only needs to get data from these 2 keys

    const user = await User.findOne({ email }) //It only needs to find the "one existing/matching email" and doesn't need to check anything else except
                                                                                                                                // for the password
    if (user && (await user.matchPassword(password))){ 

    generateToken(res, user._id) // First response is needed since it'll have a cookie generated (response) / Second response is the specific user ID
                                                                                                                // with their own ID
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        //NOTE: THE TOKEN IS USUALLY POSTED HERE, BUT SINCE WE'RE STORING IT IN AN HTTP-ONLY COOKIE, IT'S A DIFFERENT CASE 

        }) // 201 status means something is created successfully
    }
    else{
       res.status(401) // This means Unauthorized for Logging in due to invalid credentials
       throw new Error('Invalid E-mail or Password') 
    }
    

    //res.status(200).json({ message: 'Auth User' }) //shows what the route will do - it will send back the http status, and a message
})

// @desc Register user
// route POST /api/users - Will be sent to the array of users
// @access Public (access modifier is public - no need to be logged in to access this route || It will only be needed if it's protected)
const registerUser = asyncHandler (async (req, res) => {
    
    //console.log(req.body) - SHOWS THE SENT DATA IN THE BODY IN POSTMAN
    const { name, email, password } = req.body // Gets data through its KEY in the curly brace
    //console.log(name) // Displays the value

    const userExists = await User.findOne({ email }) // It will find one matching email from the database to the registration form

    if(userExists){
        res.status(400)
        throw new Error('User Already Exists')
    }

    const user = await User.create({
        name,
        email,
        password
    }) 

    //Before a user is created, it will hash the password in the user model first using bcrypt

    if (user){

        generateToken(res, user._id) // First response is needed since it'll have a cookie generated (response) / Second response is the specific user ID
                                                                                                                // with their own ID
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            //NOTE: THE TOKEN IS USUALLY POSTED HERE, BUT SINCE WE'RE STORING IT IN AN HTTP-ONLY COOKIE, IT'S A DIFFERENT CASE 

        }) // 201 status means something is created successfully
    }
    else{
       res.status(400)
       throw new Error('Invalid User Data') 
    }
    //res.status(200).json({ message: 'Register User' }) //shows what the route will do - it will send back the http status, and a message
    // ^ This just checks the response of the HTTP Request that is sent
})

// @desc Logout user
// route POST /api/users/logout - posts through this URL once the button is clicked
// @access Public - it doesn't do anything with the data to need a jsonwebtoken
const logoutUser = asyncHandler (async (req, res) => {
    
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0) //It will instantly disappear like this
    }) //  

    // Shows the activity of this route, where the user is logged out
    res.status(200).json({ message: 'User Logged Out' }) //shows what the route will do - it will send back the http status, and a message
            
})

// @desc Get User Profile
// route GET /api/users/profile - gets the user profile data to be displayed once the link is clicked (located in the header of the page)
// @access Private - You'll need a jsonwebtoken to access this
const getUserProfile = asyncHandler (async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    } // The difference between this and the login or register is that this is a request from the existing user, and the other one is a created
        //status response with JSON data being sent back about the newly created user

    res.status(200).json(user) //shows what the route will do - it will send back the http status, and a message
})

// @desc Update User Profile
// route PUT /api/users/profile - Same location as the profile, since it's going to be edited and updated through textboxes
// @access Private - You'll need a jsonwebtoken to access this
const updateUserProfile = asyncHandler (async (req, res) => {
    
    const user = await User.findById(req.user._id) 

    if(user){

        user.name = req.body.name || user.name // It will be changed based on the input of the user, if there's no input, it will retain the name
        user.email = req.body.email || user.email // Email change

        if(req.body.password){ // This has a conditional statement to make it more secure since it is a password
            user.password = req.body.password
        }

        const updatedUser = await user.save() // New saved updated data of user

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email

            //Responds with this JSON DATA
        })
    }
    else{
        res.status(404)
        throw new Error('User Not Found')
    }

    //res.status(200).json({ message: 'Update User Profile' }) //shows what the route will do - it will send back the http status, and a message
})




export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile }