import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";


const Homepage = React.lazy(()=>import('../Pages/Homepage'))
const Login = React.lazy(()=>import('../Pages/Login'))
const Forum = React.lazy(()=>import('../Pages/Forum'))
const Routess = () => {

  return (
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>

        {/*  */}
        <Routes>

          <Route path="/" element={ <Homepage/>}/> 
          <Route path="/Login" element={ <Login/>}/> 
          <Route path="/Forum" element={ <Forum/>}/> 
          <Route path="*" element={<Navigate to="/"/>}/>

        </Routes>
      </React.Suspense>
    </div>
  );
};

export default Routess;
