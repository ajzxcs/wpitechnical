import React from 'react'
import { 
    Navigate, 
    Route, 
    Routes,
    Outlet
  } from 'react-router-dom'


// import LoginPage from '../pages/Login'



const index = () => {

    const isLoggedIn = sessionStorage.getItem('TOKEN');

  return (
    <>
        {isLoggedIn ? <Request /> : <Login />}
    </>

  )
}

const LoginForm = React.lazy(()=> import('../Pages/Login'))
const Login = () =>{
    return (
        <React.Suspense fallback={<div>Loading</div>}>
    
            <Routes>
                <Route path="/Login" element={<LoginForm/>}/>
                <Route path="*" element={<Navigate to="/Login"/>}/>
            </Routes>
       
        </React.Suspense>
    
      )
}

const RequestForm = React.lazy(()=> import('../Pages/RequestForm'))
const Request = () =>{
    return (
        <React.Suspense fallback={<div>Loading</div>}>
    
            <Routes>
                <Route path="/RequestForm" element={<RequestForm/>}/>
                <Route path="*" element={<Navigate to="/RequestForm"/>}/>
            </Routes>
       
        </React.Suspense>
    
      )
}

export default index