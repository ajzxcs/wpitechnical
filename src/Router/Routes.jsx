import React from 'react'
import {
  Navigate,
  Route,
  Routes as RouterS
} from 'react-router-dom'

const Homepage = React.lazy(()=> import('../Pages/Home/Homepage'))
const Routes = () => {
  return (
    <div>
      <React.Suspense fallback={<div>Loading....</div>}>
        <RouterS>
          <Route path='/' element={<Homepage/>} />
          <Route path='*' element={<Navigate to="/"/>} />
        </RouterS>
      </React.Suspense>
    </div>
  )
}

export default Routes