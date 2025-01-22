import express from 'express' //Importing express node framework
import dotenv from 'dotenv' //Importing dotenv from the installed dependency, which will be used for the ".env" file
import userRoutes from './routes/userRoutes.js' //Imports the route + the controller that it uses
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
dotenv.config() //Running the config based from the file changes in ".env"
const port = process.env.port || 5000 // Server-side port - It will run the port value from the config file

connectDB()

const app = express() //Setting up express

app.use(express.json()) // Parses raw json (Body Parser)
app.use(express.urlencoded({ extended: true })) // Allows to send FORM DATA

app.use(cookieParser())

app.use('/api/users', userRoutes) //FIRST PARAMETER WRAPS AROUND THE "userRoutes.js" and runs it

//Setting up if SERVER is successful 
app.get('/', (req, res) => res.send('Server is ready!!')) //Setting up the route for the directory (parameters for the URL)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`)) //Setting up the server - let's you know that connection to server is successful