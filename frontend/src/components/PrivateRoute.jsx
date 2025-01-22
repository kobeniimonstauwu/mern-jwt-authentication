import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux' //For getting the user data (userInfo) from the database through the auth state

const PrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth)
    
    return userInfo ? <Outlet/> : <Navigate to = '/login' replace/>
}

export default PrivateRoute