import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import Message from "../Message";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatInput from "../ChatInput";
import { selectRoomId } from "../../appSlice";
import { auth } from "firebase.js";
import { db } from "firebase.js";

function Chat() {
  const chatRef = useRef(null);
  const [user] = useAuthState(auth);

  const roomId = useSelector(selectRoomId);
  // console.log(roomId);
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );


  const [roomMessage, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomId, loading]);

  // console.log(roomDetails?.data());
  // console.log(roomMessage)

  return (
    <ChatContainer>
      {roomDetails && roomMessage && user &&(
        <>
          <ChatHeader>
            <ChatHeaderLeft>
              <h4>
                <strong>#{roomDetails?.data().nameChannel}</strong>
              </h4>
              <StarBorderOutlinedIcon />
            </ChatHeaderLeft>
            <ChatHeaderRight>
              <p>
                <InfoOutlinedIcon />
                Details
              </p>
            </ChatHeaderRight>
          </ChatHeader>
          <ChatMessage>
            {roomMessage?.docs.map((doc) => {
              // console.log(doc.id);
              const { message, timestamp, userName, userImage ,userUid } = doc.data();
              return (
                <Message
                  key={doc.id}
                  messageUid = {doc.id}
                  message={message}
                  timestamp={timestamp}
                  userName={userName}
                  userImage={userImage}
                  userUid ={userUid}
                />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessage>
          <ChatInput
            chatRef={chatRef}
            channelName={roomDetails?.data().nameChannel}
            channelId={roomId}
          />
        </>
      )}
    </ChatContainer>
  );
}

const ChatContainer = styled.div`
  flex: 0.71;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
  position: relative;
`;

const ChatHeader = styled.div`
  position: fixed;
  top: 60px;
  width: 81vw;
  background-color: white;
  z-index: 999;

  @media (max-width: 768px){
  width: 61vw;
  }

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 21px;
  border-bottom: 1px solid lightgrey;
`;

const ChatHeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }
  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const ChatHeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatMessage = styled.div`
  /* height: 90%; */
  /* overflow: hidden; */
  margin-top: 55px;
`;

const ChatBottom = styled.div`
  padding-bottom: 200px;
`;

export default Chat;
