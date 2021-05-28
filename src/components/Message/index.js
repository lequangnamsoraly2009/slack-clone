import React from "react";
import styled from "styled-components";
// import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { selectRoomId } from "../../features/App/appSlice";

function Message({ message, timestamp, userName, userImage, userUid , messageUid }) {
  // console.log(messageUid);
  const roomId = useSelector(selectRoomId);
  const deleteMessage = (e) => {
    e.preventDefault();
    if (!userUid) return;
    db.collection('rooms').doc(roomId).collection('messages').doc(messageUid).delete().then(()=>{
      console.log("Delete message success ~~~ ");
    })
  };

  return (
    <MessageContainer>
      <MessageLeft>
        <img src={userImage} alt="user" />
        <MessageInfo>
          <h4>
            {userName}
            <span>{new Date(timestamp?.toDate()).toLocaleString()}</span>
          </h4>

          <p>{message}</p>
        </MessageInfo>
      </MessageLeft>
      <MessageRight>
        <MoreVertIcon />
        <MessageOptions>
          <span>Edit</span>
          <span onClick={(e) => deleteMessage(e)}>Delete</span>
        </MessageOptions>
      </MessageRight>
    </MessageContainer>
  );
}

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`;

const MessageInfo = styled.div`
  padding-left: 10px;
  max-width: 95%;
  /* display: flex;
    flex-direction: column;
    justify-content: space-between; */
  @media (max-width: 768px) {
    max-width: 80%;
  }
  > h4 {
    font-weight: 600;
  }
  > h4 > span {
    color: gray;
    font-weight: 300;
    margin-left: 4px;
    font-size: 10px;
  }
  > p {
    margin-top: 10px;
    font-weight: 400;
    word-wrap: break-word;
  }
`;

const MessageLeft = styled.div`
  display: flex;
  > img {
    height: 50px;
    border-radius: 50%;
  }
`;

const MessageOptions = styled.div`
  position: absolute;
  height: 50px;
  background-color: white;
  border-radius: 5px;
  width: 60px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.16), 0 1px 3px rgba(0, 0, 0, 0.36);
  top: 11px;
  right: 10px;
  display: flex;
  flex-direction: column;
  /* display: block; */
  display: none !important;
  > span {
    font-size: 12px;
  }
`;

const MessageRight = styled.div`
  margin-top: -20px;
  /* content: ""; */
  position: relative;
  > .MuiSvgIcon-root {
    place-items: top center;
    cursor: pointer;
    margin-top: -20px;
  }
  &:hover {
    ${MessageOptions} {
      /* display: block; */
      display: flex !important;
      flex-direction: column;
      line-height: 2;
      text-align: center;
      cursor: pointer;
    }
  }
`;

export default Message;
