import React from 'react'
import { LogoutSession } from '../../../firebase/Authentication'
const TheOffice = () => {
    React.useEffect(()=>{
        let mounted = true;

        mounted && LogoutSession();

        return ()=>mounted=false
    },[])
  return (
    <div></div>
  )
}

export default TheOffice