import React, { useContext, useState } from "react";
import {
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
  BoldLink
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useNavigate } from "react-router-dom";


function LoginForm() {

  let { switchToSignup } = useContext(AccountContext);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleBackToHomepage = () => {
    navigate("/"); // Navigate to the homepage ("/" route)
  };

  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [showPasswordCheckbox, setShowPasswordCheckbox] = useState(false);
  

  const handleGoogleSignIn = () => {
    setShowPopup(true); // Show the popup when the button is clicked
    // Implement your Google sign-in logic here
  };

  // const togglePasswordVisibility = () => {
  //   setShowPassword((prevShowPassword) => !prevShowPassword);
  // };

  const handleShowPasswordCheckbox = () => {
    setShowPasswordCheckbox(
      (prevShowPasswordCheckbox) => !prevShowPasswordCheckbox
    );
    // setShowPassword(false); // Hide the password when toggling the checkbox
  };

  return (
    <div>
      <BoxContainer>
        <FormContainer>
          <Input type="text" placeholder="Email" required />
          <Input
            type={showPasswordCheckbox ? "text" : "password"}
            placeholder="Password"
            required
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "8px",
              marginLeft: "3px",
              fontSize: "11px",
              color: "#666"
            }}
          >
          {/* Hello Friend */}
            <input
              type="checkbox"
              checked={showPasswordCheckbox}
              onChange={handleShowPasswordCheckbox}
              style={{ marginRight: "10px" }}
            />
            <span style={{ fontWeight: "bold" }}>Show Password</span>

          </div>
          <Marginer direction="vertical" margin="20px" />
          <Marginer direction="vertical" margin="20px" />
          <SubmitButton type="button">Sign in</SubmitButton>
          <Marginer direction="vertical" margin="10px" />
            <BoldLink onClick={handleBackToHomepage}>
              Back To Homepage
            </BoldLink>
      
          <Marginer direction="vertical" margin="10px" />
        
          <div></div>
        </FormContainer>
      </BoxContainer>
    </div>
  );
}

export default LoginForm;
