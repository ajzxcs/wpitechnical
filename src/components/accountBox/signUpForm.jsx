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

function SignUp() {
  // -- destructure the object function
  let { switchToSignin } = useContext(AccountContext);
  const [showPasswordCheckbox, setShowPasswordCheckbox] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPasswordCheckbox = () => {
    setShowPasswordCheckbox(
      (prevShowPasswordCheckbox) => !prevShowPasswordCheckbox
    );
    setShowPassword(false); // Hide the password when toggling the checkbox
  };
  return (
    <div>
      <BoxContainer>
        <FormContainer>
          <Input type="text" placeholder="Full Name" required />
          <Input type="text" placeholder="Email" required />
          <Input type="password" placeholder="Password" required />
          <Input
            type={showPasswordCheckbox ? "text" : "Confirm password"}
            placeholder="Confirm Password"
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
            <input
              type="checkbox"
              checked={showPasswordCheckbox}
              onChange={handleShowPasswordCheckbox}
              style={{ marginRight: "6px" }}
            />
            <span>Show Password</span>
          </div>
          <Marginer direction="vertical" margin="10px" />
          <MutedLink href="#">Forget Your Password ?</MutedLink>
          <Marginer direction="vertical" margin="10px" />
          <SubmitButton type="button">Sign Up</SubmitButton>
          <Marginer direction="vertical" margin="10px" />
          <MutedLink>
            Already An account?
            <BoldLink href="#" onClick={switchToSignin}>
              Sign In
            </BoldLink>
          </MutedLink>
        </FormContainer>
      </BoxContainer>
    </div>
  );
}

export default SignUp;
