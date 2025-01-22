import { useState, useEffect } from 'react' // Importing for use of local component states
import { Link, useNavigate } from 'react-router-dom' // Link to register and login pages
import { Form, Button, Row, Col } from 'react-bootstrap' // UI
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { useLoginMutation } from '../slices/usersApiSlice' 
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

const LoginScreen = () => {
  //Initialize States
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation() //sends a request to the backend in order to pass data to frontend

  const { userInfo } = useSelector((state) => state.auth) // We were able to setCredentials due to this (pass email and password data)
                                                          // It finds what user matches based on the URL of our API and it gives the data from the database
                                                          // The userInfo is also recognized where it was created (in "auth" state that was created)


  useEffect(() =>{
    if(userInfo){
      navigate('/') // THEY WON'T BE ABLE to go back to the /login if they are already logged in, even through URL.
                    // This is the use of useEffect, to create persistent side effects (condition) where the user is logged in / exists
                    // This makes sure that the user will always redirect here, especially in situations that they shouldn't be in other URLs/APIs
    }  // This basically redirects the user to the home page/screen if logged in.
  }, [navigate, userInfo] // Add these 2 values as dependencies into the useEffect - the useEffect needs this
)

  const submitHandler = async (e) => { //Function for submit button (to be used on the "onSubmit" property) for the form
    e.preventDefault()
    try{
      const res = await login( { email, password }).unwrap() // Makes the request to the API we just created (on the Login Route)
                                                    // The email and password values takes in data from the form and makes a request from the backend
                                                    // At the same time, and res takes in the info of the user (specifically email and password)
                                                    // unwrap a promise (since we're dealing with a database)
      dispatch(setCredentials({ ...res })) // This gets the data from res (email and password, etc.)
                                           // Stores the res data to this action, this is why we're able to add the localStorage
                                           // And it also persistently checks the localStorage because of the initialState
      navigate('/') //It will simply redirect to the homepage
    }
    catch(err){
      toast.error(err?.data?.message || err.error)
      //Toast will show the error in the page itself ( top-right )
    }
  }
  return (

    <FormContainer>
        <h1> Sign In </h1>
        <Form onSubmit = { submitHandler }> {
          // THIS PROPERTY WILL RUN THE FUNCTION AS THE SUBMIT BUTTON IS CLICKED
        }
            {
                //There will be A GROUP FOR EACH INPUT, THIS IS THE FIRST GROUP
            }
            <Form.Group className = 'my-2' controlId = 'email'> { // Group for the Email Field, with the corresponding ID (1ST GROUP)
            }
            <Form.Label> { 
                    //Label for the Email Address
                } 
                Email Address 
            </Form.Label>
            <Form.Control type = 'email' placeholder = 'Enter E-mail' value = { email } onChange = { (e) => setEmail(e.target.value) }>
                {
                    //This is from React-Bootstrap - Form.Control, which is the INPUT
                    //Note: The value is its corresponding state
                    //onChange has a function where it will set the value for the Email - which is whatever you type on the field 
                                                                              //due to its event changing the value of the Email 
                                                                              //and having the state as its target
                }
            </Form.Control>
            </Form.Group>
            
                {
                  //SECOND GROUP
                }
            <Form.Group className = 'my-2' controlId = 'password'> { // Group for the Password Field, with the corresponding ID (2ND GROUP)
            }
            <Form.Label> { 
                    //Label for the Password
                } 
                Password
            </Form.Label>
            <Form.Control type = 'password' placeholder = 'Enter Password' value = { password } onChange = { (e) => setPassword(e.target.value) }>
                {
                    // ** Exactly the same process as email ** 
                }
            </Form.Control>
            </Form.Group>
            { isLoading && <Loader />}
            { // THIS ONE ^ APPEARS RIGHT AFTER THE PASSWORD INPUT BOX
            // LOGIN BUTTON 
            }
            <Button type = 'submit' variant = 'primary' className = 'mt-3'>
              Sign In
            </Button>
            {
              // REGISTER HYPERLINK FOR NEW USERS
            }
            <Row className = 'py-3'>
              <Col>
              New Customer? <Link to = '/register'> Register </Link>
              </Col>
            </Row>
        </Form>
    </FormContainer>
  )
}

export default LoginScreen