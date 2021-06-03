import React  from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import firebase from "firebase";
import { enterRoom } from "features/Channel/channelSlice";
import { auth, db } from "firebase.js";
import CloseIcon from "@material-ui/icons/Close";
import { useDocument } from "react-firebase-hooks/firestore";
import { useHistory } from "react-router";

function SideBarOptions({ Icon, title, addChannelOption, id }) {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const history = useHistory();

  // console.log(channels.docs.data())

  const [detailsRoom] = useDocument(id && db.collection("rooms").doc(id));

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
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
    history.push(`/channel/${id}`);
  };

  const handleDeleteChannel = (e) => {
    e.preventDefault();
    if (!id) return;
    const database = detailsRoom?.data()?.userUid;
    if (user.uid === database) {
      db.collection("rooms")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Success");
        });
    }
    console.log("Failed");
  };

  return (
    <SideBarOptionContainer
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <>
          <SideBarOptionChannel>
            <span># {title}</span>
            <SideBarOptionIcon>
              <CloseIcon onClick={(e) => handleDeleteChannel(e)} />
            </SideBarOptionIcon>
          </SideBarOptionChannel>
          
        </>
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

const SideBarOptionIcon = styled.div`
  display: none !important;
  position: absolute;
  content: "";
  right: 0px;
  top: 7px;
  background-color: transparent;
  color: white;
  width: 50px;
  /* display: block; */
`;

const SideBarOptionChannel = styled.h3`
  position: relative;
  padding: 10px 0;
  font-weight: 300;
  width: 100%;
  /* display: flex; */
  &:hover {
    ${SideBarOptionIcon} {
      display: flex !important;
    }
  }
`;

export default SideBarOptions;
