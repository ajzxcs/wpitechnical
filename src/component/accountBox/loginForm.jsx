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

function LoginForm() {
  const [showPasswordCheckbox, setShowPasswordCheckbox] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleShowPasswordCheckbox = () => {
    setShowPasswordCheckbox(
      (prevShowPasswordCheckbox) => !prevShowPasswordCheckbox
    );
    setShowPassword(false); // Hide the password when toggling the checkbox
  };

  

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(emailValue));
  };

  const handleSubmit = () => {
    if (!isEmailValid) {
      // Handle invalid email here (e.g., display an error message)
      console.log("Invalid email");
      return;
    }

    // Handle form submission with valid email and password
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div style={{ margin: "0 auto", width: "100%"}}>
    <BoxContainer>
    <FormContainer>
      <Marginer direction="vertical" />
      <Input
        type="text"
        placeholder="Email"
        required
        onChange={handleEmailChange}
        value={email}
        style={!isEmailValid ? { border: "1px solid red" } : {}}
      />
      {!isEmailValid && (
        <div style={{ color: "red", fontSize: "13px", marginTop: "5px" }}>
          Invalid email address
        </div>
      )}
      <Marginer direction="vertical" />
      <Input
        type={showPasswordCheckbox ? "text" : "password"}
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "20px",
          marginLeft: "3px",
          fontSize: "13px",
          color: "#666"
        }}
      >
        <input
          type="checkbox"
          checked={showPasswordCheckbox}
          onChange={handleShowPasswordCheckbox}
          style={{ marginRight: "6px" }}
        />
        <span>Show Password</span>
      </div>
      <Marginer direction="horizontal" margin="10px" />
      
      <Marginer direction="vertical" margin="10px" />
      <SubmitButton type="button" onClick={handleSubmit}>
        Sign in
      </SubmitButton>
      <Marginer direction="vertical" margin="10px" />
      <Marginer direction="vertical" margin="10px" />
          <a href="/"><BoldLink>
            Back To Homepage
          </BoldLink></a>

          <Marginer direction="vertical" margin="10px" />
    </FormContainer>
  </BoxContainer>
</div>
);
}

export default LoginForm;