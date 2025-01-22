import { useState, useEffect } from 'react' // Importing for use of local component states
import { Link, useNavigate } from 'react-router-dom' // Link to register and login pages
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap' // UI
import FormContainer from '../components/FormContainer' 
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
 
const RegisterScreen = () => {
  //Initialize States 
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('') // Just a confirmation (conditional)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth) // Basically gets the data of the user

  const [register, { isLoading }] = useRegisterMutation() //sends a request to the backend in order to pass data to frontend

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
    if(password !== confirmPassword){
      toast.error('Passwords do not match') // It will have validations first, and as much as possible, passwords are always on top of every condition
                                            //and not part of the try and catch blocks for security purposes 
    }
    else{
        try{
          const res = await register( { name, email, password }).unwrap() // This will basically store in the data needed for the POST REQUEST for register
          dispatch(setCredentials({ ...res })) // This gets the data from res (email and password, etc.)
                                               // Stores the res data to this action, this is why we're able to add the localStorage
                                               // And it also persistently checks the localStorage because of the initialState
                                               // It will also log the user in because of the authSlice, and the auth State has the info of the user from the database
                                               // Which is needed for the login 
          navigate('/') //It will simply redirect to the homepage

          //SO BASICALLY, IT WILL REGISTER THE USER, AND IT WILL ALSO PASS THE DATA FOR SETCREDENTIALS IN ORDER TO LOG THE USER IN
          //SINCE THEY ALREADY HAVE A TOKEN, AND THEY ARE ALREADY LOGGED IN (SO userInfo EXISTS)
        }
      catch(err){
        toast.error(err?.data?.message || err.error)
      }
    }
  }
  return (

    <FormContainer>
        <h1> Sign Up </h1>
        <Form onSubmit = { submitHandler }> {
          // THIS PROPERTY WILL RUN THE FUNCTION AS THE SUBMIT BUTTON IS CLICKED
        }
            {
                //There will be A GROUP FOR EACH INPUT, THIS IS THE FIRST GROUP
            }

            <Form.Group className = 'my-2' controlId = 'name'> { // Group for the First Name Field, with the corresponding ID (1ST GROUP)
            }
            <Form.Label> { 
                    //Label for the First Name
                } 
                Full Name
            </Form.Label>
            <Form.Control type = 'text' placeholder = 'Enter Full Name' value = { name } onChange = { (e) => setName(e.target.value) }>
            </Form.Control>
            </Form.Group>

            <Form.Group className = 'my-2' controlId = 'email'> { // Group for the Email Field, with the corresponding ID (2ND GROUP)
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
                  //THIRD GROUP
                }
            <Form.Group className = 'my-2' controlId = 'password'> { // Group for the Password Field, with the corresponding ID (3RD GROUP)
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
                {
                    //FOURTH GROUP
                }
            <Form.Group className = 'my-2' controlId = 'confirmPassword'> { // Group for the Confirm Password Field, with the corresponding ID (4TH GROUP)
            }
            <Form.Label> { 
                    //Label for Confirm Password
                } 
                Confirm Password
            </Form.Label>
            <Form.Control type = 'password' placeholder = 'Repeat Password' value = { confirmPassword } onChange = { (e) => setConfirmPassword(e.target.value) }>
            </Form.Control>
            </Form.Group>
            { isLoading && <Loader />}




            {// REGISTER BUTTON
            }
            <Button type = 'submit' variant = 'primary' className = 'mt-3'>
              Sign Up
            </Button>
            {
              // LOGIN HYPERLINK FOR OTHER USERS
            }
            <Row className = 'py-3'>
              <Col>
              Already Have An Account? <Link to = '/login'> Login </Link>
              </Col>
            </Row>
        </Form>
    </FormContainer>
  )
}

export default RegisterScreen