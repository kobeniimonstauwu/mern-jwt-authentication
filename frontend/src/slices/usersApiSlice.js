import { apiSlice } from './apiSlice'

const USERS_URL = '/api/users' // All Backend Endpoints start with the URL of the correspinding API Slice (In our case it's this since this is where
// every URL in our backend/api starts with)
// ALSO SETS UP THE URL IN ORDER TO CONNECT AND MATCH WITH THE BACKEND

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({ //It also has endpoints set up inside
        // This is where queries, mutations, and other things are set up
        login: builder.mutation({
            query: (data) => ({
            //It takes in the value of data since we're handling and passing in with data such as email, name, etc. - to be used in the front-end
            url: `${USERS_URL}/auth`, //It should be the same to the route of the login 
            method: 'POST', // Specify Request from the backend
            body: data, // This is the same data that is passed in from the query (email, name, etc.)
            
            }),     
        }),

        register: builder.mutation({
            query: (data) => ({
            url: `${USERS_URL}`, 
            method: 'POST', 
            body: data, 
            }),     
        }),
        
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),

        updateUser: builder.mutation({
            query: (data) => ({
            url: `${USERS_URL}/profile`, 
            method: 'PUT', 
            body: data, 
            }),     
        }),
    }),
}) //Injects the endpoints from "apiSlice.js"

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation } = usersApiSlice // Inside the brackets is the naming convention for the mutation we created from
                                                                                        // the created injection for usersApiSlice