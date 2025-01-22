import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import { apiSlice } from './slices/apiSlice'

const store = configureStore({
    reducer: {
        auth: authReducer, //This was the name of the authSlice we have created (key), although it can be renamed here and have no problems
                            //The value is authReducer which is the name we created for the import

        [apiSlice.reducerPath]: apiSlice.reducer // The way apiSlices are set up is first setting a path of the reducer inside an index, and
                                                                                        // then specifying the reducer itself as the value 

    }, //We don't have any as of now
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware), //The first value will take in the function to get the Default Middleware
                                                                // through the second value that is called
                                                    
    devTools: true // This is needed to allow devTools to run on our site
})

export default store