import { Navigate, Outlet } from 'react-router-dom'
// import { useAuth } from '../contexts/AuthContexts';
// import { useContext } from 'react';

const PrivateRoutes = () => {

    // const { token } = useAuth()
    // let auth = { 'token': false }
    let utoken = localStorage.getItem("userToken")

    return (
        utoken ? <Outlet /> : <Navigate to='/login' />
    )
}


export default PrivateRoutes