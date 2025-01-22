import jwt from 'jsonwebtoken'

const generateToken = (res, userId) =>{ //It takes in the response (from what is posted), and it's corresponding ID (ID for validating token)
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' }) // TOKEN CREATION
    //User ID is needed to validate the token 


    res.cookie('jwt', token, { // jwt is the assigned name of the cookie, while token is the data that is inside it

    //OPTIONS
        httpOnly: true, // Since it's an HTTPONLY COOKIE TYPE (For Security)
        secure: process.env.NODE_ENV !== 'development', // HTTPS is what this means, and it'll only be for production
        sameSite: 'strict', // It's a preventative measure against csrf token attacks
        maxAge: 30 * 24 * 60 * 60 * 1000 // This is the formula for 30 days in miliseconds - should be the same as the token
    }) // STORING TOKEN IN A COOKIE
}

export default generateToken