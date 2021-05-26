import React from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import SideBarOptions from "../SideBarOptions";

function SideBar() {
  return (
    <SideBarContainer>
      <SideBarHeader>
        <SideBarInfo>
          <h2>Your Company</h2>
          <h3>
            <FiberManualRecordIcon />
            Your Name
          </h3>
        </SideBarInfo>
        <CreateIcon />
      </SideBarHeader>
      <SideBarOptions />
    </SideBarContainer>
  );
}

const SideBarContainer = styled.div`
  background-color: var(--color-original);
  flex: 0.29; // Use it accounted for 29% of 100% width
  color: white;
  border-top: 1px solid #000;
  max-width: 300px;
  margin-top: 60px;
`;

const SideBarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #000;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 10px;
    color: var(--color-original);
    font-size: 18px;
    background-color: white;
    border-radius: 50%;
  }
`;

const SideBarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }
  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 600;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;

export default SideBar;
