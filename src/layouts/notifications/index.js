import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import "./Notif.css"; // You can create a CSS file for custom styling
import { Avatar } from "@mui/material";
import { Stack } from "@mui/system";

import { updateForums } from '../../firebase/Database'
import { forumUpload } from '../../firebase/Storage'

function Notifications() {
  // Create state variables for input values
  const [input1, setInput1] = useState({ name: "", content: "", image: null });
  const [input2, setInput2] = useState({ name: "", content: "", image: null });
  const [input3, setInput3] = useState({ name: "", content: "", image: null });
  const [input4, setInput4] = useState({ name: "", content: "", image: null });
  const [input5, setInput5] = useState({ name: "", content: "", image: null });
  const [input6, setInput6] = useState({ name: "", content: "", image: null });

  const [images,setImages] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  })


  // Function to handle input changes for name and content
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
    console.log("Name:", input.name);
    console.log("Content:", input.content);
    console.log("Image File:", input.image);

    forumUpload(input.image,input.name).then(url=>{

      const dats = {
        "Name" : input.name,
        "Content": input.position,
        "Image" : url
      }
      updateForums(person,dats)
      .then(e=>{
        alert(e);
        window.location.reload()
      })
    })


  };

  return (
    <DashboardLayout>
    <h1 style={{ marginBottom: "20px" }}>Forum</h1> {/* Forum Header */}
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "calc(100vh - 100px)" }}
      >
      
        {/* Input Set 1 */}
        <div className="input-set">

        <Avatar alt="Person " src={images.input1}  sx={{ width: 56, height: 56 }} />
          <p>Display 1</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={input1.name}
            onChange={(e) => handleInputChange(input1,setInput1,  e)}
          />
          <input
            type="text"
            name="content"
            placeholder="Content"
            value={input1.content}
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
          <p>Display 2</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={input2.name}
            onChange={(e) => handleInputChange(input2,setInput2, e)}
          />
          <input
            type="text"
            name="content"
            placeholder="Content"
            value={input2.content}
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
          <p>Display 3</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={input3.name}
            onChange={(e) => handleInputChange(input3,setInput1, e)}
          />
          <input
            type="text"
            name="content"
            placeholder="Content"
            value={input3.content}
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
          <p>Display 4</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={input4.name}
            onChange={(e) => handleInputChange(input4,setInput4, e)}
          />
          <input
            type="text"
            name="content"
            placeholder="Content"
            value={input4.content}
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

        {/* Input Set 5 */}
        <div className="input-set">

        
        <Avatar alt="Person " src={images.input5}  sx={{ width: 56, height: 56 }} /> 
          <p>Display 5</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={input5.name}
            onChange={(e) => handleInputChange(input5,setInput5, e)}
          />
          <input
            type="text"
            name="content"
            placeholder="Content"
            value={input5.content}
            onChange={(e) => handleInputChange(input5,setInput5, e)}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => handleFileChange(input5,setInput5, e)}
          />
          <MDButton
            variant="contained"
            color="primary"
            onClick={() => handleUpload(input5,"person5")}
          >
            Upload
          </MDButton>
        </div>

        {/* Input Set 6 */}
        <div className="input-set">

        
        <Avatar alt="Person " src={images.input6}  sx={{ width: 56, height: 56 }} /> 
          <p>Display 6</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={input6.name}
            onChange={(e) => handleInputChange(input6,setInput6, e)}
          />
          <input
            type="text"
            name="content"
            placeholder="Content"
            value={input6.content}
            onChange={(e) => handleInputChange(input6,setInput6, e)}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => handleFileChange(input6,setInput6, e)}
          />
          <MDButton
            variant="contained"
            color="primary"
            onClick={() => handleUpload(input6,"person6")}
          >
            Upload
          </MDButton>
        </div>

        <Grid item xs={12}>

        
          <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          >


            <MDButton
            variant="contained"
              color="warning"
          href="index.html" // Link to the index.html file
        >
          Login as SuperAdmin
        </MDButton>

        </Stack>
        </Grid>

        <Footer />
      </Grid>
    </DashboardLayout>
  );
}

export default Notifications;
