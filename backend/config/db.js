import mongoose from 'mongoose'

const connectDB = async () => { // The connection would be an asynchronous function
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI) // The connect method would have a value of the URI we just copy and pasted, which is
                                                                // easily used through an environment variable
        console.log(`MongoDB Connected: ${conn.connection.host}`) // It should show the host specifically in the connection
    }
    catch(error){
        console.error(`Error: ${error.message}`) // It should specifically output the error message it has 
        process.exit(1) // Exits with failure status
    }
}

export default connectDB // This is needed, similar with the router earlier since it uses built in methods (ex: router, connections - It needs to be
                                                                                                                                //defaultly exported) 