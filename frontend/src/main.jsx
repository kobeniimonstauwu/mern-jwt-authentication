import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import store from './store.js'
import { Provider } from 'react-redux'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import PrivateRoute from './components/PrivateRoute.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'

const router = createBrowserRouter( // It first sets up the browser for the router (created)
  createRoutesFromElements( // This starts the creation of creating routes from elements, starting with the main app component as element
                                                                                                           // (Which is the App component)
                                                                               //Its path is an obvious indicator that it's the main route
                                                                               //Every route created will be inside this route below due to its path (main)
                                                                               //The first one will always be the main app component that holds all the routes
    <Route path ='/' element = { <App /> }> 
        <Route index = { true } path = '/' element = { <HomeScreen/>} /> { // SHOWS HOME SCREEN AND IS SERVES AS THE INDEX (LANDING HOME PAGE)
        }
        <Route path = '/login' element = { <LoginScreen/> }></Route>{// SHOWS LOGIN SCREEN, INDEX PROPERTY IS REMOVED
        }
        <Route path = '/register' element = { <RegisterScreen/> }></Route>{// SHOWS REGISTER SCREEN
        }
        { /* Place Private Routes Here*/}
        <Route path = '' element = { <PrivateRoute/> }>
        <Route path = '/profile' element = { <ProfileScreen/> }></Route>{// SHOWS PROFILE SCREEN
        }
        </Route>
      </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = { store }>
  <React.StrictMode>
    <RouterProvider router = { router }/> { //This will pass in the router from above
    }
  </React.StrictMode>,
  </Provider>
)
