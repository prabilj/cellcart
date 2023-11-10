import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoutes = () => {

    const utoken = localStorage.getItem("userToken")
    const isadmin = localStorage.getItem("isadmin")
    console.log("isadmin", isadmin);


    return (
        utoken && (isadmin == "false") ? (<Outlet />) : (<Navigate to='/login' />)
    )
}
export const AdminPrivateRoutes = () => {

    const utoken = localStorage.getItem("userToken")
    const isadmin = localStorage.getItem("isadmin")

    return (
        utoken && (isadmin == "true") ? (<Outlet />) : (<Navigate to='/login' />)
    )
}


