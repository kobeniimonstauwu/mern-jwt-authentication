import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// This variable will protect the routes, where you're only gonna be able to access certain routes (getUserProfile & updateUserProfile) when you're logged in/authenticated
const protect = asyncHandler(async (req, res, next) => {
    let token

    token = req.cookies.jwt // Requests, checks, and stores the created cookie through this variable. 
                            // Note: This method is made possible by the cookie-parser

    if(token){  //Checking if the cookie is there / if the user is authenticated (through login / register - logged in) or not
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET) // If the created token exists successfully, it will check if the created token
                                                                            // matches the format of the encoding (if it the same with what we created when logged in / registered)
            req.user = await User.findById(decoded.userId).select('-password') // We will request the user itself based on the userId that is matched and found
                                                            //(from the payload) within the checked token
                                                            // select('-password') - means that the password won't be included in the requested user data
            
            next() // This has next() due to it being MIDDLEWARE and having the next lines of code which might be "else"
        }
        catch(error){
            res.status(401)
            throw new Error('Not Authorized, Invalid token') // The token is there, the token is just invalid due to errors
            
        }
    }
    else{
        res.status(401) // Unauthorized Status, meaning if the JSON Webtoken isn't there, it will show this status
        throw new Error('Not Authorized, No Token') // Not Registered
    }
})

export { protect }