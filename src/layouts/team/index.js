import React, { useState } from "react";
// import Grid from "@mui/material/Grid";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import "./Notif.css"; // You can create a CSS file for custom styling

import { teamsUpload } from "../../firebase/Storage"
import { updateTeams,viewTeams } from "../../firebase/Database"
import { Avatar } from "@mui/material";

function Team() {

    // Create state variables for input values
    const [input1, setInput1] = useState({ name: "", position: "", image: null });
    const [input2, setInput2] = useState({ name: "", position: "", image: null });
    const [input3, setInput3] = useState({ name: "", position: "", image: null });
    const [input4, setInput4] = useState({ name: "", position: "", image: null });
  
    const [images,setImages] = useState({
      input1: "",
      input2: "",
      input3: "",
      input4: "",
    })

  React.useState(()=>{
      const fecthedData = async () => {
        const data = await viewTeams()
        console.log(data.person1)

        setInput1({
          name: data.person1.Name, 
          position: data.person1.Position, 
          image: null
        })

        setInput2({
          name: data.person2.Name, 
          position: data.person2.Position, 
          image: null
        })

        setInput3({
          name: data.person3.Name, 
          position: data.person3.Position, 
          image: null
        })

        setInput4({
          name: data.person4.Name, 
          position: data.person4.Position, 
          image: null
        })

        setImages({
          input1: data.person1.Image,
          input2: data.person2.Image,
          input3: data.person3.Image,
          input4: data.person4.Image,
        })
      }

      fecthedData()
  },[])


  // Function to handle input changes for name and position
  const handleInputChange = (input,setInput, event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  // Function to handle file input for images
  const handleFileChange = (input,setInput, event) => {

    let filereader = new FileReader();
    filereader?.readAsDataURL(event.target.files[0])

    filereader.onload = (events) => {

      // setImages({...images,input1:events.target.result})

      const file = event.target?.files[0];
      setInput({ ...input, image: event.target?.files[0] });

      console.log(file);

    }

  };

  // Function to handle button click for each input set
  const handleUpload = (input,person) => {

    teamsUpload(input.image,input.name).then(url=>{

      const dats = {
        "Name" : input.name,
        "Position": input.position,
        "Image" : url
      }
      updateTeams(person,dats)
      .then(e=>{
        alert(e);
        window.location.reload()
      })
    })
    // console.log("Name:", input.name);
    // console.log("Position:", );
    // console.log("Image:", input.image);
  };

  return (
    <DashboardLayout>
      <h1 style={{ marginBottom: "20px" }}>Teams</h1> {/* Forum Header */}
      <div className="input-grid">


        {/* Input Set 1 */}
        <div className="input-set">
        
        <Avatar alt="Person " src={images.input1}  sx={{ width: 56, height: 56 }} />
          <p>Person 1</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={input1.name}
            onChange={(e) => handleInputChange(input1,setInput1, e)}
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={input1.position}
            onChange={(e) => handleInputChange(input1,setInput1, e)}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => handleFileChange(input1,setInput1, e)}
          />
          <MDButton
            variant="contained"
            color="primary"
            onClick={() => handleUpload(input1,"person1")}
          >
            Upload
          </MDButton>
        </div>

        {/* Input Set 2 */}
        <div className="input-set">

        <Avatar alt="Person " src={images.input2}  sx={{ width: 56, height: 56 }} />
          <p>Person 2</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={input2.name}
            onChange={(e) => handleInputChange(input2,setInput2, e)}
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={input2.position}
            onChange={(e) => handleInputChange(input2,setInput2, e)}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => handleFileChange(input2,setInput2, e)}
          />
          <MDButton
            variant="contained"
            color="primary"
            onClick={() => handleUpload(input2,"person2")}
          >
            Upload
          </MDButton>
        </div>

        {/* Input Set 3 */}
        <div className="input-set">

        <Avatar alt="Person " src={images.input3}  sx={{ width: 56, height: 56 }} />
          <p>Person 3</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={input3.name}
            onChange={(e) => handleInputChange(input3,setInput3, e)}
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={input3.position}
            onChange={(e) => handleInputChange(input3,setInput3, e)}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => handleFileChange(input3,setInput3, e)}
          />
          <MDButton
            variant="contained"
            color="primary"
            onClick={() => handleUpload(input3,"person3")}
          >
            Upload
          </MDButton>
        </div>

        {/* Input Set 4 */}
        <div className="input-set">
        <Avatar alt="Person " src={images.input4}  sx={{ width: 56, height: 56 }} />
          <p>Person 4</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={input4.name}
            onChange={(e) => handleInputChange(input4,setInput4, e)}
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={input4.position}
            onChange={(e) => handleInputChange(input4,setInput4, e)}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => handleFileChange(input4,setInput4, e)}
          />
          <MDButton
            variant="contained"
            color="primary"
            onClick={() => handleUpload(input4,"person4")}
          >
            Upload
          </MDButton>
        </div>
      </div>

      <Footer />
    </DashboardLayout>
  );
}

export default Team;
