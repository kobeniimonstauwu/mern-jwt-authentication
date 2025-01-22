import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' // Needed for setting up the RTK Query

const baseQuery = fetchBaseQuery({ baseUrl: '' }) // Since we're using a proxy, we won't need to set the base URL to localhost:5000 (Probably the environment
                                                                                                                            //variables we set up in postman)
export const apiSlice = createApi({
    baseQuery, // The created baseQuery previously
    tagTypes: ['User'], // caching - for blog posts or similar (to avoid redundant fetching of data || It reuses data through caching)
    endpoints: (builder) => ({
        
     }) //builder is built in, IT CREATES REQUESTS (IT ACTS AS A PARENT TO THE API SLICES which can be used for different API tagtypes, such as products apiSlice
                                                                                            // orders apiSlice, etc. - all of those have their own endpoints)
                                                                                            // It is REQUIRED - PARENT THAT INTERACT WITH THE BACKEND
})
// The created API in this slice will be exported directly through a variable

