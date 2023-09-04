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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons"; // Import the Google icon

function LoginForm() {
  // -- destructure the object function
  let { switchToSignup } = useContext(AccountContext);
  // console.log(switchToSignup)

  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [showPasswordCheckbox, setShowPasswordCheckbox] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);

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
              style={{ marginRight: "6px" }}
            />
            <span style={{ fontWeight: "bold" }}>Show Password</span>

          </div>
          <Marginer direction="vertical" margin="10px" />
          <MutedLink href="#">Forgot Your Password?</MutedLink>
          <Marginer direction="vertical" margin="10px" />
          <SubmitButton type="button">Sign in</SubmitButton>
          <Marginer direction="vertical" margin="10px" />
          <MutedLink>
            Don't have an account?
            <BoldLink href="#" onClick={switchToSignup}>
              Sign Up
            </BoldLink>
          </MutedLink>
          <Marginer direction="vertical" margin="10px" />
          <div>
            <SubmitButton type="button" onClick={handleGoogleSignIn}>
              <FontAwesomeIcon icon={faGoogle} /> Continue with Google
            </SubmitButton>
          </div>
          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <p>
                  This is a beta Test for the TSG.
                  <br />
                  Thank you for testing!
                </p>
                <button
                  className="close-button"
                  onClick={() => setShowPopup(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          <div></div>
        </FormContainer>
      </BoxContainer>
    </div>
  );
}

export default LoginForm;
