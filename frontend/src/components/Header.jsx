import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap' //Needed components for this web-app
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa' //Icons
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'

const Header = () => {
    const { userInfo } = useSelector((state) => state.auth) //Needed for getting the userInfo through this state that is set

    const dispatch = useDispatch() // For the logout action
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation() //Function that calls out the mutation

    const logoutHandler = async () => {
      try{
        await logoutApiCall().unwrap() // The mutation/link will be called through this function
          dispatch(logout()) // At the same time it will remove the local storage that is set in the local side through the action in the authSlice
          navigate('/') //After clicking LOGOUT, it will go to the home page (in Logged Out User POV)
      }
      catch(err){
        console.log(err)
      }
    } // This runs when the logout link is clicked
    return (
      <header>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect> { // Property values are changed here directly,
        // As for expand the hamburger menu will be gone when the screen is large
        }
          <Container>
            <LinkContainer to = '/'>
            <Navbar.Brand>MERN Auth</Navbar.Brand>
            </LinkContainer>
               {//Logo
              }
            <Navbar.Toggle aria-controls='basic-navbar-nav' />{// Hamburger menu toggle (For toggle and collapse) - it targets a class

            }
            <Navbar.Collapse id='basic-navbar-nav'>
              {
                //Nav itself has links when opened which is the login and signup
                
              }
              <Nav className='ms-auto'>
                { userInfo ? (
                  <>
                    <NavDropdown title = { userInfo.name } id = 'username'>
                        <LinkContainer to = '/profile'>
                        <NavDropdown.Item> Profile </NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick = { logoutHandler }> 
                        Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                  <LinkContainer to = '/login'>
                <Nav.Link>
                    <FaSignInAlt /> Sign In
                  </Nav.Link >
                </LinkContainer>
                <LinkContainer to = '/register'>
                <Nav.Link>
                    <FaSignOutAlt /> Sign Up
                </Nav.Link>
                </LinkContainer>
                  </>
                )}
                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );
  };
  
  export default Header