import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { useState } from "react";
// import { useRef } from "react";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "firebase.js";
import { db } from "firebase.js";
import _ from "lodash";

function ChatInput({ channelName, channelId, chatRef }) {
  const [messageText, setMessageText] = useState("");
  const [user] = useAuthState(auth);
  //   console.log(channelId);

  const whitespaceCharacters = [' ', '  ','\b', '\t', '\n', '\v', '\f', '\r'];

  const sendMessage = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) return;

    if (!channelId) {
      return false;
    }
    db.collection("rooms").doc(channelId).collection("messages").add({
      message: messageText,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userName: user.displayName,
      userImage: user.photoURL,
      userUid: user.uid,
    });

    chatRef.current.scrollIntoView({ behavior: "smooth" });

    setMessageText("");
  };

  const setMessageCondition = (e) => {
    e.preventDefault();

    if (_.some(whitespaceCharacters,e.target.value)==='true') {
      return;
    } 
    setMessageText(e.target.value);
  };

  return (
    <ChatInputContainer>
      <form>
        <input
          autofocus="true"
          value={messageText}
          onChange={(e) => setMessageCondition(e)}
          placeholder={`Message #${channelName}`}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
}

const ChatInputContainer = styled.div`
  border-radius: 20px;
  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }
  > form > input {
    position: fixed;
    bottom: 30px;
    width: 80%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
    @media (max-width: 768px) {
      width: 60%;
    }
  }
  > form > button {
    display: none !important;
  }
`;

export default ChatInput;
