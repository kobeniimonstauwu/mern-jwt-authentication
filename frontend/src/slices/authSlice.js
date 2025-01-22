import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null 
} // CHECKS LOCAL STORAGE
// the UserInfo is an object, it will first check the local storage
// If the local storage is there, it will be used and parsed in which 
// JSON.parse() - turns an javascript object instead of a string

//IN INITIAL STATE OBJECT WILL HAVE:
//BASICALLY, THE LOCAL STORAGE WILL BE CHECKED FIRST IN THE USERINFO KEY, AND IF IT IS THERE IT WILL HAVE A VALUE THAT IS A JAVASCRIPT OBJECT BASED ON THE
//LOCAL STORAGE IT FOUND
//IT WILL GO TO THE LOGIN ACTION FIRST IN THE AUTH STATE, AND IF THE USERINFO IS VALIDATED BY THE BACKEND PROCESSES, IT WILL RESPOND WITH THE USERINFO
//WHICH IS CHECKED IN THE INITAL STATE AND THEN CONTINUES TO CHECK IT IN THE SYSTEM IF THE USERINFO EXISTS / THE USER IS LOGGED IN - IT IS PERSISTENT
//IF NOT, IT'LL BE A NULL VALUE

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    //This reducer object will have reducer functions
    //This slice has 2 FUNCTIONS
    setCredentials: (state, action) =>{
        // The state will contain the retrieved data from the action.payload (email, id, name / USER DATA)
        state.userInfo = action.payload 
        localStorage.setItem('userInfo', JSON.stringify(action.payload)) // The data will also be saved into the local storage at the same time
    },
    // Logout in the front-end side / Clears or Destroys the local storage passed from setCredentials
    logout: (state, action) => {
        //Removing both data from the state and localStorage
        state.userInfo = null
        localStorage.removeItem('userInfo')
        }
    }
})

export const { setCredentials, logout } = authSlice.actions // These are the ones needed in order to be CALLED in the LoginScreen, since these are actions

export default authSlice.reducer // This is needed to export the changedStates (Changed States are called reducers)