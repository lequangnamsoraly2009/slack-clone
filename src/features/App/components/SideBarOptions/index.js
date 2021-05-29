import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import firebase from 'firebase'
import { enterRoom } from "features/App/appSlice";
import { auth,db } from "firebase.js";

function SideBarOptions({ Icon, title, addChannelOption, id }) {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth); 
  // console.log(channels.docs.data())
  const addChannel = () => {
    const channelName = prompt("Please enter the channel name");

    if (channelName) {
      db.collection("rooms").add({
        nameChannel: channelName,
        userCreate: user.displayName,
        userUid: user.uid,
        userEmail: user.email,
        userImage: user.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  const selectChannel = () => {
    if (id) {
        dispatch(enterRoom({
          roomId: id,
        }));
    }
  };

  return (
    <SideBarOptionContainer
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SideBarOptionChannel>
          <span>#</span> {title}
        </SideBarOptionChannel>
      )}
    </SideBarOptionContainer>
  );
}

const SideBarOptionContainer = styled.div`
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

  > h3 > span {
    padding: 15px;
  }
`;

const SideBarOptionChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
`;

export default SideBarOptions;
