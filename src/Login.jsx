import React from 'react'
import styled from "styled-components";
import { motion } from "framer-motion";
import AccountBox from "./component/accountBox/AccountBox";
import './index.css';

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Login = () => {
  return (
    <AppContainer>
    <AccountBox />
    </AppContainer>
  )
}

export default Login