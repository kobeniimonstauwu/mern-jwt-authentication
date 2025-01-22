import { useState, useEffect } from 'react' // Importing for use of local component states
import { Form, Button } from 'react-bootstrap' // UI
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer' 
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { useUpdateUserMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice' // showing the UI when the credentials are reset/edited

 
const ProfileScreen = () => {
  //Initialize States 
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('') // Just a confirmation (conditional)

  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth) // Basically gets the data of the user

  const [updateProfile, { isLoading }] = useUpdateUserMutation() //Variable created for the submitHandler, and set the loader before the UPDATE BUTTON

  useEffect(() =>{
    setName(userInfo.name)
    setEmail(userInfo.email) // THIS WILL MAKE SURE THAT THESE 2 TEXTBOXES ARE FILLED RIGHT WHEN IT'S IN EDIT
  }, [userInfo.name, userInfo.email] // Add these 2 values as dependencies into the useEffect - the useEffect needs this
)

  const submitHandler = async (e) => { //Function for submit button (to be used on the "onSubmit" property) for the form
    e.preventDefault()
    if(password !== confirmPassword){
      toast.error('Passwords do not match') // It will have validations first, and as much as possible, passwords are always on top of every condition
                                            //and not part of the try and catch blocks for security purposes 
    }
    else{
      try{
        const res = await updateProfile({
          _id: userInfo._id, //ID is here just to make sure that it stays the same
          name,
          email,
          password
          // While the other ones will be updated based on the value of the textbox
        }).unwrap()

        dispatch(setCredentials(res)) //passes data to the local storage from the updated database info
        
        toast.success('Profile Updated');
        
      }
      catch(err){
        toast.error(err?.data?.message || err.error)
      }
    }
  }
  return (

    <FormContainer>
        <h1> Update Profile  </h1>
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
            {// UPDATE
            }
            <Button type = 'submit' variant = 'primary' className = 'mt-3'>
              Update
            </Button>
            
        </Form>
    </FormContainer>
  )
}

export default ProfileScreen