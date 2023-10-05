import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";

import "./inputStyles.css";
import MDButton from "components/MDButton";

import { updateServices,viewServices } from "../../firebase/Database";

function Serve() {
  // const [Rows, setRows] = useState();

  const [section1Title, setSection1Title] = useState("");
  const [section1Content, setSection1Content] = useState("");

  const [section2Title, setSection2Title] = useState("");
  const [section2Content, setSection2Content] = useState("");

  const [section3Title, setSection3Title] = useState("");
  const [section3Content, setSection3Content] = useState("");

  const [section4Title, setSection4Title] = useState("");
  const [section4Content, setSection4Content] = useState("");

  const [section5Title, setSection5Title] = useState("");
  const [section5Content, setSection5Content] = useState("");

  const [section6Title, setSection6Title] = useState("");
  const [section6Content, setSection6Content] = useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await viewServices();
        console.log()

        // service 1
        setSection1Title(data.service1.section1Title)
        setSection1Content(data.service1.section1Content)

        // service 2
        setSection2Title(data.service2.section2Title)
        setSection2Content(data.service2.section2Content)

        // service 3
        setSection3Title(data.service3.section3Title)
        setSection3Content(data.service3.section3Content)

        // service 4
        setSection4Title(data.service4.section4Title)
        setSection4Content(data.service4.section4Content)

        // service 5
        setSection5Title(data.service5.section5Title)
        setSection5Content(data.service5.section5Content)

        // service 6
        setSection6Title(data.service6.section6Title)
        setSection6Content(data.service6.section6Content)

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Function to check and limit the word count in a given text
  const limitWordCount = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      // Truncate the text to the specified word count
      return words.slice(0, maxWords).join(" ");
    }
    return text;
  };


  const hanldeSave = e => {
    e.preventDefault();
    const data = {
      "service1":{
        section1Title,
        section1Content
      },
      "service2":{
        section2Title,
        section2Content
      },
      "service3":{
        section3Title,
        section3Content
      },
      "service4":{
        section4Title,
        section4Content
      },
      "service5":{
        section5Title,
        section5Content
      },
      "service6":{
        section6Title,
        section6Content
      }
    }

    console.log(data)

    updateServices(data)
  }

 // ...

return (
  <DashboardLayout>
    <MDBox pt={6} pb={3}>
      <Grid item xs={12}>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              Services
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <div className="input-container">
              {/* Section 1 */}
              <div className="input-section">
                <MDTypography variant="subtitle1" color="textPrimary">
                &nbsp;&nbsp;&nbsp;Service 1
                </MDTypography>
                <input
                  className="input-box"
                  type="text"
                  placeholder="Title"
                  value={section1Title}
                  onChange={(e) => setSection1Title(e.target.value)}
                />
                <textarea
                  className="input-box"
                  placeholder="Content (Limit: 30 words)"
                  value={section1Content}
                  onChange={(e) => {
                    const limitedText = limitWordCount(
                      e.target.value,
                      30 // Limit to 30 words
                    );
                    setSection1Content(limitedText);
                  }}
                />
              </div>
              {/* Section 2 */}
              <div className="input-section">
                <MDTypography variant="subtitle1" color="textPrimary">
                  Service 2
                </MDTypography>
                <input
                  className="input-box"
                  type="text"
                  placeholder="Title"
                  value={section2Title}
                  onChange={(e) => setSection2Title(e.target.value)}
                />
                <textarea
                  className="input-box"
                  placeholder="Content"
                  value={section2Content}
                  onChange={(e) => {
                    const limitedText = limitWordCount(
                      e.target.value,
                      30 // Limit to 30 words
                    );
                    setSection2Content(limitedText);
                  }}
                />
              </div>
              {/* Section 3 */}
              <div className="input-section">
                <MDTypography variant="subtitle1" color="textPrimary">
                  Service 3
                </MDTypography>
                <input
                  className="input-box"
                  type="text"
                  placeholder="Title"
                  value={section3Title}
                  onChange={(e) => setSection3Title(e.target.value)}
                />
                <textarea
                  className="input-box"
                  placeholder="Content"
                  value={section3Content}
                  onChange={(e) => {
                    const limitedText = limitWordCount(
                      e.target.value,
                      30 // Limit to 30 words
                    );
                    setSection3Content(limitedText);
                  }}
                />
              </div>
              {/* Section 4 */}
              <div className="input-section">
                <MDTypography variant="subtitle1" color="textPrimary">
                &nbsp;&nbsp;&nbsp;Service 4
                </MDTypography>
                <input
                  className="input-box"
                  type="text"
                  placeholder="Title"
                  value={section4Title}
                  onChange={(e) => setSection4Title(e.target.value)}
                />
                <textarea
                  className="input-box"
                  placeholder="Content"
                  value={section4Content}
                  onChange={(e) => {
                    const limitedText = limitWordCount(
                      e.target.value,
                      30 // Limit to 30 words
                    );
                    setSection4Content(limitedText);
                  }}
                />
              </div>
              {/* Section 5 */}
              <div className="input-section">
                <MDTypography variant="subtitle1" color="textPrimary">
                  Service 5
                </MDTypography>
                <input
                  className="input-box"
                  type="text"
                  placeholder="Title"
                  value={section5Title}
                  onChange={(e) => setSection5Title(e.target.value)}
                />
                <textarea
                  className="input-box"
                  placeholder="Content"
                  value={section5Content}
                  onChange={(e) => {
                    const limitedText = limitWordCount(
                      e.target.value,
                      30 // Limit to 30 words
                    );
                    setSection5Content(limitedText);
                  }}
                />
              </div>
              {/* Section 6 */}
              <div className="input-section">
                <MDTypography variant="subtitle1" color="textPrimary">
                  Service 6
                </MDTypography>
                <input
                  className="input-box"
                  type="text"
                  placeholder="Title"
                  value={section6Title}
                  onChange={(e) => setSection6Title(e.target.value)}
                />
                <textarea
                  className="input-box"
                  placeholder="Content"
                  value={section6Content}
                  onChange={(e) => {
                    const limitedText = limitWordCount(
                      e.target.value,
                      30 // Limit to 30 words
                    );
                    setSection6Content(limitedText);
                  }}
                />
              </div>
            </div>

            <div className="bottom-btn">
 
              <MDButton variant="contained" color="primary" className="save-button" onClick={hanldeSave}>
                Save
              </MDButton>
            </div>
          </MDBox>
        </Card>
      </Grid>
    </MDBox>
    <Footer />
  </DashboardLayout>
);

}

export default Serve;
