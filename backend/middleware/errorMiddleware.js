const notFound = (req, res, next) =>{ //FOR ROUTES THAT DON'T EXIST
    const error = new Error(`Not found - ${req.originalUrl}`) //Insantiated Error object with a message as the parameter and displaying the URL it got
    res.status(404) // This status is used for errors
    next(error) // Calls the next piece of middleware in order to continue
}

const errorHandler = (err, req, res, next) =>{ //"err" as the first parameter value will be read as a custom error middleware function
    // This converts the error thrown/created to 500, as errors created can still have a value of 200
    let statusCode = res.statusCode === 200 ? 500: res.statusCode // The variable has a value of 
                                                                // a condition where if the statusCode of the error is 200, then change it to 500, 
                                                                // if not 200 (or false), then display it's own unique status code
    //^ Initialization of a custom status code
    let message = err.message

    // HANDLING MONGOOSE CAST ERROR
    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        statusCode = 404
        message = 'Resource not Found'
    }


    res.status(statusCode).json({  // the method chained json is used for the finishing touches, and you can add other things more than
                                    //the message only
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack //Shows error messages if it's other than the production server
        //Basically stack is for the types of servers
    })
    //If the name and kind property has those values it will have its own error handling
    // If the CastError is there, by having the situation where user's ObjectId doesn't exist
    // Then error will pop off.
    // Error message is customized since it's weird by default


    //THIS DOESN'T HAVE NEXT SINCE THERE IS NO CONTINUING FUNCTION AFTER THIS
}
export {notFound, errorHandler}
