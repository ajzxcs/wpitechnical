import React from "react";
import { viewTeams } from '../Features/firebase/Database'
export const Team = (props) => {

  const [teams,setTeams] = React.useState([])
  React.useEffect(()=>{

    const fetcheData = async () =>{
      const data = await viewTeams()
    
      setTeams(Object.values(data))
    }

    fetcheData()
  },[])

  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Meet the Team</h2>
          <p>
          Welcome to our technical team. We are a group of dedicated professionals with a shared mission
          </p>
        </div>
        <div id="row">
          {teams
            ? teams.map((data, index) => (
                <div key={index} className="col-md-3 col-sm-6 team">
                  <div className="thumbnail">
                    {data.Image ?    <img src={data.Image} alt="..." className="team-img" />
                    :    <img src="img/team/teams.png" alt="..." className="team-img" />}
                 
                    <div className="caption">
                      <h4>{data.Name}</h4>
                      <p>{data.Position}</p>
                    </div>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
