import { selectRoomId } from "features/Channel/channelSlice";
import { auth, db } from "firebase.js";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import styled from "styled-components";
// import CloseIcon from "@material-ui/icons/Close";

function ModalDetails(props) {
  const [listUser] = useCollection(db.collection("users"));
  const [user] = useAuthState(auth);
  const roomId = useSelector(selectRoomId);
  const [listMessage] = useCollection(
    roomId && db.collection("rooms").doc(roomId).collection("messages")
  );

  const countMessageOfYouInChannel = () => {
    let count = 0;
    listMessage?.docs?.forEach((message) => {
      if (message.data().userUid === user.uid) {
        count += 1;
      }
    });
    return count;
  };

  return (
    <>
      {props.showModal === "open" && (
        <ModalDetailsContainer onClick={props.handleClickClose}>
          <Content onClick={(e) => e.stopPropagation()}>
            <Header>
              <h2>Details Channel #{props.detailsRoom?.nameChannel}</h2>
              <ButtonClose onClick={props.handleClickClose}>
                <img src="/images/close-icon.svg" alt="" />
              </ButtonClose>

              {/* <CloseIcon onClick={props.handleClickClose}/> */}
            </Header>
            <MainDetails>
              <span>
                Name Of Channel: <b>{props.detailsRoom?.nameChannel}</b>
              </span>
              <span>
                Status:
                <Active> Active</Active>
              </span>
              <span>
                Creator: <b>{props.detailsRoom?.userCreate}</b>
              </span>
              <span>
                Email: <b>{props.detailsRoom?.userEmail}</b>
              </span>
              <span>
                Date Last Edited:{" "}
                <b>
                  {props.detailsRoom?.timestamp
                    .toDate()
                    .toLocaleString("en-GB")}
                </b>
              </span>
              <span>
                Number Of Users:{" "}
                <b> {listUser ? listUser?.docs.length : "0"}</b>
              </span>
              <span>
                Number Of Message:{" "}
                <b>{listMessage ? listMessage?.docs.length : "0"}</b>
              </span>

              <span>
                Your message number: <b>{countMessageOfYouInChannel()}</b>
              </span>
            </MainDetails>
            <Footer>
              <span>Copy Right By Soraly v1.0621.6</span>
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

const Active = styled.b`
  color: green;
`;

const MainDetails = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 2.5;
  margin-left: 20px;
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

export default ModalDetails;
