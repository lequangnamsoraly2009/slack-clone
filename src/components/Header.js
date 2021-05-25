import { Avatar } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import AccessTimeIcon from "@material-ui/icons/AccessTime"

function Header() {
  return (
    <div>
      <HeaderContainer>
        <HeaderLeft>
          <HeaderAvatar alt="" src=""/>
          <AccessTimeIcon/>
        </HeaderLeft>
      </HeaderContainer>
    </div>
  );
}

const HeaderContainer = styled.div`
    display: flex;
`;

const HeaderLeft = styled.div`
    display: flex;
    flex: 0.3;
    align-items: center;
    margin-left: 20px;

    > .MuiSvgIcon-root{
        margin-left: auto;
        margin-right: 30px;
    }
`;

// Cách add 1 components của marterial-ui vào 1 styled components
const HeaderAvatar = styled(Avatar)`
    cursor: pointer;
    :hover{
        opacity: 0.75;
    }
`;

export default Header;
