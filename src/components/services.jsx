import React, { useState } from "react";

import { viewSERVICES } from '../Features/firebase/Database'
import { object } from "prop-types";
import { async } from "@firebase/util";

export const Services = (props) => {
  const [data,setData] = useState([])
  React.useEffect(()=>{

    const fetchData = async () => {

      const fetching = await viewSERVICES()
      // fetching && Object.values(fetching).map((data,index)=>Object.values(data).map((key,index)=>console.log(key)))

      setData(fetching)
    }



    fetchData()

  },[])

  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">

          {/* <button onClick={()=>}>click</button> */}
          <h2>Our Services</h2>
          <p>
          Our dedication to our services is unwavering, and our commitment to excellence will continue to drive us forward.
          </p>
        </div>
        <div className="row">



          {data
            ? Object.values(data).map((datas, key) => (
                <div key={key} className="col-md-4">
                  {" "}

                  {/* ICONS */}
                  <i className="fa fa-calendar"></i>

                  <div className="service-desc" >

                        <h3>{Object.values(datas)[0]}</h3>
                        <p>{Object.values(datas)[1]}</p>
                      </div>
         
               
             
             
                </div>
                
              ))
              
            : "loading"}

        </div>
        <a href="https://wellnessproinc-ticket-request.web.app/">
        <button className="btn-forum">Submit a Ticket?</button></a>
      </div>
    </div>
  );
};
