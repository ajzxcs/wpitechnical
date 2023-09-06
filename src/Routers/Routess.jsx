import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { statusLogin } from '../Features/Authentication/Authentication'

const Homepage = React.lazy(()=>import('../Pages/Homepage'))
const Login = React.lazy(()=>import('../Pages/Login'))
const Forum = React.lazy(()=>import('../Pages/Forum'))
const Routess = () => {
  // check the status login
  const [status,setStatus] = React.useState(true)
  React.useEffect(()=>{
    statusLogin().then(res=>setStatus(!res))

    return (()=>{
      // cleanupp function
    })
  },[])

  return (
    
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>

        {/*  */}
        <Routes>

          <Route path="/" element={ <Homepage/>}/> 

          {status && <Route path="/Login" element={ <Login/>}/> }


          <Route path="/Forum" element={ <Forum/>}/> 
          <Route path="*" element={<Navigate to="/"/>}/>

        </Routes>
      </React.Suspense>
    </div>
  );
};

export default Routess;
