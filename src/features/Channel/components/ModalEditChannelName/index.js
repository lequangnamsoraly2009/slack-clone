import { selectRoomId } from "features/Channel/channelSlice";
import { auth, db } from "firebase.js";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import styled from "styled-components";
import firebase from "firebase";

function ModalEditChannelName(props) {
  const [channelNameEdit, setChannelNameEdit] = useState(
    props.detailsRoom?.nameChannel
  );
  const [user] = useAuthState(auth);

  const roomId = useSelector(selectRoomId);

  const handleClickEdit = (e) => {
    e.preventDefault();
    if (!channelNameEdit) return;

    db.collection("rooms").doc(roomId).set({
      nameChannel: channelNameEdit,
      userCreate: user.displayName,
      userUid: user.uid,
      userEmail: user.email,
      userImage: user.photoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // history.push(`/channel/${roomId}`);
    props.handleClickCloseEdit(e);
  };

  return (
    <>
      { (user.uid === props.detailsRoom.userUid) ? props.showModalEdit === "open" && (
        <ModalDetailsContainer onClick={props.handleClickCloseEdit}>
          <Content onClick={(e) => e.stopPropagation()}>
            <Header>
              <h2>Details Channel #{props.detailsRoom?.nameChannel}</h2>
              <ButtonClose onClick={props.handleClickCloseEdit}>
                <img src="/images/close-icon.svg" alt="" />
              </ButtonClose>

              {/* <CloseIcon onClick={props.handleClickClose}/> */}
            </Header>
            <MainDetails>
              <InputEdit>
                <input
                  type="text"
                  value={channelNameEdit}
                  onChange={(e) => setChannelNameEdit(e.target.value)}
                />
              </InputEdit>
              <ButtonHandle>
                <ButtonCancel onClick={e => props.handleClickCloseEdit(e)}>
                  Cancel
                </ButtonCancel>
                <ButtonEdit onClick={e => handleClickEdit(e)}>Edit</ButtonEdit>
              </ButtonHandle>
            </MainDetails>
            <Footer>
              <span>Copy Right By Soraly v1.0621.3</span>
            </Footer>
          </Content>
        </ModalDetailsContainer>
      ):props.showModalEdit === "open" && (
        <ModalDetailsContainer onClick={props.handleClickCloseEdit}>
        <Content onClick={(e) => e.stopPropagation()}>
          <Header>
            <h2>Details Channel #{props.detailsRoom?.nameChannel}</h2>
            <ButtonClose onClick={props.handleClickCloseEdit}>
              <img src="/images/close-icon.svg" alt="" />
            </ButtonClose>

            {/* <CloseIcon onClick={props.handleClickClose}/> */}
          </Header>
          <MainDetails>
            <h3>You Don't Have Permission</h3>
            <ButtonHandle>
              <ButtonCancel onClick={props.handleClickCloseEdit}>
                Cancel
              </ButtonCancel>
            </ButtonHandle>
          </MainDetails>
          <Footer>
            <span>Copy Right By Soraly v1.0621.3</span>
          </Footer>
        </Content>
      </ModalDetailsContainer>
      )}
    </>
  );
}

const ModalDetailsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.8);
  color: black;
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: white;
  max-height: 80%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 128px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonClose = styled.div`
  height: 30px;
  width: 30px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.15);
  cursor: pointer;
  /* > .MuiSvgIcon-root {
    height: 40px;
    width: 40px;
    color: rgba(0, 0, 0, 0.7);
    cursor: pointer;
      pointer-events: none;

  } */
  > svg,
  img {
    width: 30px;
    pointer-events: none;
  }
`;

const MainDetails = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 2.5;
  margin-left: 20px;
  margin-right: 20px;

  >h3{
      color: red;
      align-items: center;
      margin: 0 auto;
      padding: 20px 0;
  }
`;

const InputEdit = styled.form`
  display: flex;
  align-items: center;
  margin: 20px 0;
  > input {
    margin: 0 auto;
    width: 90%;
    padding: 10px;
  }
`;

const ButtonHandle = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const ButtonCancel = styled.button`
  width: 80px;
  height: 40px;
  margin: 0 10px;
  border: none;
  cursor: pointer;
  background-color: #ed754a;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  :hover {
    background: red;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3), 1px 0px 2px rgba(0, 0, 0, 0.3);
  }
`;
const ButtonEdit = styled.button`
  width: 80px;
  height: 40px;
  margin: 0 10px;
  border: none;
  cursor: pointer;
  background-color: #61c7fa;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  :hover {
    background-color: #259cf7;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3), 1px 0px 2px rgba(0, 0, 0, 0.3);
  }
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  > span {
    margin: 0 auto;
  }
`;

export default ModalEditChannelName;
