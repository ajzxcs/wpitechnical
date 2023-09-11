import React, { useState } from "react";
import {
  BoxContainer,
  FormContainer,
  Input,
  SubmitButton,
  BoldLink
} from "./common";
import { Marginer } from "../marginer";
import { useNavigate } from "react-router-dom";

// validation and Authentication
import { userSchema } from '../../Features/Authentication/Validation'
import { LoginSession } from "../../Features/Authentication/Authentication";

function LoginForm() {

  const navigate = useNavigate(); // Initialize useNavigate

  const handleBackToHomepage = () => {
    navigate("/"); // Navigate to the homepage ("/" route)
  };

  const [showPasswordCheckbox, setShowPasswordCheckbox] = useState(false);

  const handleShowPasswordCheckbox = () => {
    setShowPasswordCheckbox(
      (prevShowPasswordCheckbox) => !prevShowPasswordCheckbox
    )
  };

  // Login details
  const [users,setUser] = useState({
    email: "",
    password: ""
  })

  // Add email validation state
  const [isEmailValid, setIsEmailValid] = useState(true);

  // for email
  const handleforEmail = e =>{
    setUser({...users, email: e.target.value});
    
    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(e.target.value));
  }

  // for password
  const handleforPassword = e =>{
    setUser({...users, password: e.target.value})
  }

  // for Login Button
  const loginButton = e =>{
    e.preventDefault()
    // Login in firebase
    isValid(users.email, users.password)
  }

  // validation
  const isValid = async(Email,Password) =>{
    try{
      await userSchema.validate({ email: Email, password: Password }, { abortEarly: false });

      // Login in firebase
      LoginSession(users).then(result=>{

        // if success
        alert(result)
        navigate("/Forum")
      }).catch((error) => {

        // if Login Fiale
        alert(error); // Error message
      })
    }catch(validationError){

      // Extract specific error messages for email and password
      const emailError = validationError.inner.find((error) => error.path === 'email');
      const passwordError = validationError.inner.find((error) => error.path === 'password');

      alert( !!emailError + " | " + emailError && emailError.message )
      alert( !!passwordError + passwordError && passwordError.message )

      // email and password
      // !!emailError = If TRUE mean error occurred
      // emailError && emailError.message = error messages

      // !!passwordError = If TRUE mean error occurred
      // passwordError + passwordError && passwordError.message = error messages
    }
  }

  return (
    <div>
      <BoxContainer>
        <FormContainer>

        {/* Email */}
          <Input 
            type="text" 
            placeholder="Email" 
            required 
            value={users.email}
            onChange={handleforEmail}
            style={!isEmailValid ? { border: "1px solid red" } : {}}
          />
 {/* Invalid Email */}
          {!isEmailValid && (
            <div style={{ color: "red", fontSize: "13px", marginTop: "5px" }}>
              Invalid email address
            </div>
          )}

        {/* Password */}
          <Input
            type={showPasswordCheckbox ? "text" : "password"}
            placeholder="Password"
            required
            value={users.password}
            onChange={handleforPassword}
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

          {/* Login Button */}
          <SubmitButton type="button" onClick={loginButton}>
            Sign in
          </SubmitButton>

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
