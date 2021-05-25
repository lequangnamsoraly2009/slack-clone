import { Avatar } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search"
import EcoIcon from '@material-ui/icons/Eco';


function Header() {
  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar alt="" src="" />
        <AccessTimeIcon />
      </HeaderLeft>
      <HeaderMain>
        <SearchIcon />
        <input placeholder="Searching" />
      </HeaderMain>
      <HeaderRight>
        <EcoIcon />
      </HeaderRight>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--color-original);
  color: white;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex: 0.3;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;

// Cách add 1 components của marterial-ui vào 1 styled components
const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.75;
  }
`;

const HeaderMain = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: rgb(169,220,245);
  text-align: center;
  display: flex;
  padding: 0 50px;
  color: gray;
  border: 1px solid gray;

  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0;
    color: #000;
  }

`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  > .MuiSvgIcon-root{
    margin-left: auto;
    margin-right: 20px;
  }

`;

export default Header;
