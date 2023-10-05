import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { AppBar, ImageListItem, ImageListItemBar, Toolbar } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
import ImageList from '@mui/material/ImageList';


import ListSubheader from '@mui/material/ListSubheader';


// firebase
import { getAllGallery,galleryUpload, deleteFileByNameGallery } from '../../firebase/Storage'

function Gallery() {

  const [imageUrls, setImageUrls] = React.useState([]);

  const handleFileChange = (event) => {

    let filereader = new FileReader();
    filereader.readAsDataURL(event.target.files[0])


    // console.log(filereader)

    filereader.onload = (events) => {


      console.log(events.target.result);

      galleryUpload(event.target.files[0],String(new Date().getTime()))
      .then(()=>{
        alert("success upload");
        window.location.reload()
      })
      .catch(()=>alert("cant upload"));

    }


  };


  React.useEffect(()  => {
    // let isMounted = true; // A flag to track whether the component is mounted
    const loadImages = async () => {
      const urls = await getAllGallery();
      setImageUrls(urls);
    };

  //  if (isMounted){
    loadImages()
  //  }

    // Cleanup function
    // return () => {
    //   // isMounted = false; // Mark the component as unmounted
    // };
  }, []);

  const handleDeleteBrand = e => {
    e.preventDefault();
    deleteFileByNameGallery(String(click))
  };

// image is clicked
const [click, setClick] = React.useState()

// handle for onlick each images
const onlickImage = (index) =>{
  setClick(index);
}

  return (
    <DashboardLayout>
    
    <DashboardNavbar/>
     
      <AppBar position="static" color="primary">
        <Toolbar>
        <MDTypography variant="h6" color="white">Gallery</MDTypography>
        </Toolbar>
      </AppBar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100vh",
        }}
      >
        <MDBox p={4}>

        {/* upload */}
          <input
            type="file"
            accept=".jpg, .png, .jpeg"
            style={{ display: "none" }}
            onChange={handleFileChange}
            id="fileInput"
          />
          <label htmlFor="fileInput">
            <MDButton
              variant="outlined"
              color="primary"
              component="span"
            >
              Upload Photo 
            </MDButton>&nbsp;&nbsp;&nbsp;&nbsp;
          </label>
          
          {/* delete brand */}
          <MDButton
          variant="outlined"  // Set the variant to "outlined"
          color="primary"    // Set the color to "primary"
          onClick={handleDeleteBrand}
          mt={2}
          >
          Delete a Brand
        </MDButton>


            <MDBox mt={2}>
              <MDTypography variant="body2">

                Selected File to delete: <strong>{click}</strong>
              </MDTypography>
            </MDBox>


        </MDBox>

        {/* for images List */}
        <ImageList sx={{ width: "100%", height: 500 }} cols={3}>

          <ImageListItem key="Subheader" cols={3}>
            <ListSubheader component="div">Brands</ListSubheader>
          </ImageListItem>

          {!imageUrls ? <div>Loading</div> : 
          
            imageUrls?.reverse().map((imageUrl,index) => (
              <ImageListItem key={index} onClick={() => onlickImage(imageUrl.name)}>

                <img
                src={`${imageUrl.url}?w=248&fit=crop&auto=format`}
                srcSet={`${imageUrl.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={`asdsd`}
                loading="lazy"
                />

                  <ImageListItemBar
                  title={`Image ${imageUrl.name}`}
                  subtitle={`Image ${index}`}
                  // actionIcon={
                  //   <IconButton
                  //   sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  //   aria-label={`info about ${index}`}
                  //   >
                  //     <ArchiveIcon />
                  //   </IconButton>              
                  // }

                  />
              </ImageListItem>
          ))}
    </ImageList>


      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default Gallery;
