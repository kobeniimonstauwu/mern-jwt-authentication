import express from 'express' //Set up Express to use the express router
const router = express.Router() //Set up Variable for Express Router
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile } from '../controllers/userController.js' // Import of files is different from the commonjs's require method. In ES6 you'll need ".js" / any extension
import { protect } from '../middleware/authMiddleware.js'

router.post('/', registerUser) // this is already /api/users since it's already wrapped into it
router.post('/auth', authUser) //This is the file where we make REQUESTS and ROUTES | Note: Routes here are already wrapped by a similar main route
//This is why '/auth' IS THE ONLY PATH FOR THE URL
//SINCE /api/users IS WRAPPED IN THIS FILE
//2nd Parameter - make sure authUser is imported
router.post('/logout', logoutUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile) // NOTE: THIS IS ONLY APPLICABLE TO SIMILAR ROUTES BUT DIFFERENT TYPE OF REQUEST
// This uses route method followed by the path, and chained method by different request types with their corresponding values



export default router // This is necessary whenever were using the router