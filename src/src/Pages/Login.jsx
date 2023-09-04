import React, { useState } from "react";
import styled from "styled-components";
import LoginForm from "../components/accountBox/loginForm";
import { motion } from "framer-motion";
import { AccountContext } from "../components/accountBox/accountContext";
import SignUp from "../components/accountBox/signUpForm";
import "../App.css";

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("Healthcare-1.jpg");
  background-size: cover;
  z-index: -1;
`;


const BoxContainer = styled.div`
  width: 95%;
  max-width: 400px; /* Adjust this value as needed */
  min-height: 610px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 1px 1px 15px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1.8em;
`;

const BackDrop = styled(motion.div)`
  position: absolute;
  top: -370px;
  left: -155px;
  width: 300%; /* Adjust this value to match the adjusted BoxContainer width */
  height: 600px;
  display: flex;
  flex-direction: column;
  border-radius: 100%;
  background: rgb(51, 153, 204);
  background: linear-gradient(
    58deg,
    rgba(51, 153, 204) 20%,
    rgba(34, 102, 136) 90%
  );
  transform: rotate(90deg);
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  top: 0;
  padding-left: 1.5em;
  margin-bottom: 20px;
`;

const HeaderText = styled.h2`
  font-size: 25px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled.h5`
  color: #fff;
  font-weight: 50;
  font-size: 12px;
  z-index: 10;
  margin-left: 0;
  margin-top: 3px;
`;

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

const backDropVariants = {
  expanded: {
    width: "240%",
    height: "1100px",
    borderRadius: "20%",
    transform: "rotate(55deg)"
  },
  collapsed: {
    width: "170%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(75deg)"
  }
};

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30
};

const { expanded, collapsed } = backDropVariants;

const Login = () => {
  const [isExapanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");

  const playExapandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, 1000);
  };

  const switchToSignup = () => {
    playExapandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 1000);
  };

  const switchToSignin = () => {
    playExapandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 1000);
  };

  // add these 2 functions in one variable that variable pass in provider value
  //2 functioneyum object formatil oru variable'il assign cheythu
  const contextValue = {
    switchToSignup,
    switchToSignin
  };

  const LogoImage = styled.img`
    width: 200px;
    height: auto;
    z-index: 10;
    position: relative;
    margin-bottom: 10px;
    margin-right: 10px; /* Add this line to control bottom margin */
  `;

  const Logo = ({ imageUrl }) => {
    return <LogoImage src={imageUrl} alt="Logo" />;
  };

  return (
    <>
    <AppContainer>
      <AccountContext.Provider value={contextValue}>
      <Background />
        <BoxContainer>
   
          <TopContainer>
            <BackDrop
              initial={false}
              transition={expandingTransition}
              animate={isExapanded ? expanded : collapsed}
              variants={backDropVariants}
            />

            {active === "signin" && (
              <HeaderContainer>
                <Logo imageUrl={"/WPI 1.png"} />
                <HeaderText>Welcome Back!</HeaderText>
                <SmallText>To keep connected with us</SmallText>
                <SmallText>please login with your personal info</SmallText>
              </HeaderContainer>
            )}

            {active === "signup" && (
              <HeaderContainer>
                <Logo imageUrl={"./WPI 1.png"} /> {/* Use the imported image */}
                <HeaderText>Hello, Friend!</HeaderText>
                <SmallText>Enter your personal details and</SmallText>
                <SmallText>start journey with us</SmallText>
              </HeaderContainer>
            )}
          </TopContainer>
          <BottomContainer>
            {active === "signin" && <LoginForm />}
            {active === "signup" && <SignUp />}
          </BottomContainer>
        </BoxContainer>
      </AccountContext.Provider>
      </AppContainer>
    </>
  );
};

export default Login