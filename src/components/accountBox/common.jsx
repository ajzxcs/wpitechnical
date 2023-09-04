import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// forget password link
export const MutedLink = styled.a`
  font-size: 11px;
  color: rgba(83, 78, 78, 0.8);
  font-weight: 500;
  text-decoration: none;
  margin-left: 10px;
`;

// sign-up link highlight
export const BoldLink = styled.a`
  font-size: 12px;
  color: rgb(51, 153, 204);
  text-decoration: none;
  margin: 0 4px;
  font-weight: bold;
`;

export const Input = styled.input`
  outline: none;
  width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.8);
  padding: 0px 10px;
  border-bottom: 1.4px solid transparent;
  transition: all 200ms ease-in-out;
  font-size: 12px;
  border-bottom: 1.5px solid rgba(200, 200, 200, 3);
  border-radius: 10px;
  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }

  &:not(:last-of-type) {
    margin-bottom: 1em;
  }

  &:valid {
    outline: none;
    border-bottom: 2px solid rgb(241, 196, 15);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 11px 15px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: rgb(51, 153, 204);
  background: linear-gradient(
    58deg,
    rgba(51, 153, 204) 20%,
    rgba(34, 102, 136) 100%
  );
  &:hover {
    filter: brightness(1.03);
  }
`;
