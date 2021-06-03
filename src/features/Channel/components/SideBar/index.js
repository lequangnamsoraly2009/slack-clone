import React from "react";
import styled from "styled-components";
import { useCollection } from "react-firebase-hooks/firestore";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
// import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import AppsIcon from "@material-ui/icons/Apps";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { auth, db } from "../../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import SideBarOptions from "../SideBarOptions";
import { useHistory } from "react-router";

function SideBar() {
  const [channels] = useCollection(db.collection("rooms"));
  const [user] = useAuthState(auth);
  const history = useHistory();
  return (
    <SideBarContainer>
      <SideBarHeader>
        <SideBarInfo>
          <h2>Ăn Chơi Sa Đọa</h2>
          <h3>
            <FiberManualRecordIcon />
            {user.displayName}
          </h3>
        </SideBarInfo>
        <CreateIcon />
      </SideBarHeader>
      <Profile onClick={()=> history.push(`/user/${user.uid}`)}>
        <AccountBoxIcon fontSize="small" style={{ padding: 10 }} />
        <h3>Your Profile</h3>
      </Profile>
      <SideBarOptions Icon={InboxIcon} title="Mentions & Reactions" />
      <SideBarOptions Icon={DraftsIcon} title="Saved Items" />
      <SideBarOptions Icon={BookmarkBorderIcon} title="Channel Browser" />
      <SideBarOptions Icon={PeopleAltIcon} title="People & User Groups" />
      <SideBarOptions Icon={AppsIcon} title="Apps" />
      <SideBarOptions Icon={FileCopyIcon} title="File Browser" />
      <SideBarOptions Icon={ExpandLessIcon} title="Show Less" />
      <hr />
      <SideBarOptions Icon={ExpandMoreIcon} title="Channel" />
      <hr />
      <SideBarOptions Icon={AddIcon} addChannelOption title="Add Channel" />
      {channels?.docs.map((doc) => (
        <SideBarOptions
          key={doc.id}
          id={doc.id}
          title={doc.data().nameChannel}
        />
      ))}
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
  overflow-y: scroll;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #444;
  }
`;

const Profile = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;
  :hover {
    opacity: 0.9;
    background-color: #333;
  }
  > h3 {
    font-weight: 500;
  }
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
