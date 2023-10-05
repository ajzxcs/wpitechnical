import React from "react";
import { useNavigate } from "react-router-dom";

import { viewForum } from '../Features/firebase/Database'


export const Forum = (props) => {
  const navigate = useNavigate()

  const [forums,setForums] = React.useState([])

  React.useState(()=>{

    const fetchedDta = async () =>{
      const data  = await viewForum()


      setForums(Object.values(data))

      // Object.values(data).map((data,index)=>console.log(data))
    }

    fetchedDta()
  },[])



  return (
    <div id="forum">
      <div className="container">
        <div className="section-title text-center">
          <h2>Forums</h2>
        </div>
        <div className="row">

          {/* {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-4">
                  <div className="forum">
                    <div className="forum-image">
                      {" "}
                      <img src={d.img} alt="" />{" "}
                    </div>
                    <div className="forum-content">
                      <p>"{d.text}"</p>
                      <div className="forum-meta"> - {d.name} </div>
                    </div>
                  </div>
                </div>
              ))
              
            : "loading"} */}

            {forums
            ? forums.map((data, index) => (
                <div key={`${index}`} className="col-md-4">
                  <div className="forum">
                    <div className="forum-image">
                      {" "}
                      <img src={data.Image} alt="" />{" "}
                    </div>
                    <div className="forum-content">
                      <p>"{data.Content}"</p>
                      <div className="forum-meta"> - {data.Name} </div>
                    </div>
                  </div>
                </div>
              ))
            : "loading"}


        </div><br></br><br></br><br></br>
        <div className="text-center">
          <button onClick={()=>navigate("/Forum")} className="btn-forum">View Forum</button>
        </div>
      </div>
    </div>
  );
};
