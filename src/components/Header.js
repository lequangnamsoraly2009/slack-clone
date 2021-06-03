import { Avatar } from "@material-ui/core";
import React, { useEffect } from "react";
import styled from "styled-components";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import EcoIcon from "@material-ui/icons/Eco";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { statusUser } from "../common/statusUser";
import { useHistory } from "react-router";
import { useCollection } from "react-firebase-hooks/firestore";
import { backgroundUser } from "common/backgroundUser";

function Header() {
  // const [isOnline, setIsOnline] = useState(1);
  const [user] = useAuthState(auth);
  const history = useHistory();

  const [roomChannel] = useCollection(db.collection("rooms"));

  // console.log(roomChannel?.docs.map(doc => doc?.data()));
  const channelUserOwnedFunc = () => {
    const channelUserOwned = [];
    const channelArrayUser = roomChannel?.docs.map((doc) => doc.data());
    for (let i = 0; i < channelArrayUser?.length; i++) {
      if (user.uid === channelArrayUser[i].userUid) {
        channelUserOwned.push(channelArrayUser[i]);
      }
    }
    return channelUserOwned;
  };

  db.collection("users")
    .doc(user?.uid)
    .set({
      displayName: user.displayName,
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      statusUser: statusUser[Math.trunc(Math.random() * statusUser.length)],
      backgroundUser: backgroundUser[Math.trunc(Math.random() * backgroundUser.length)],
      channelUserOwned: channelUserOwnedFunc(),
    })
    .then(() => {
      console.log("Success Add User Database");
    });

  useEffect(() => {
    db.collection("isOnline")
      .doc(user.uid)
      .set({
        uid: user.uid,
        isOnline: 1,
      })
      .then(() => {
        console.log("User Online");
      });
    return function cleanup() {
      db.collection("isOnline")
        .doc(user.uid)
        .set({
          uid: user.uid,
          isOnline: 0,
        })
        .then(() => {
          console.log("User Offline");
        });
    };
  }, []);

  // console.log(user);
  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar
          onClick={() => history.push("/")}
          alt={user?.displayName}
          src={user?.photoURL}
        />
        <AccessTimeIcon />
      </HeaderLeft>
      <HeaderMain>
        <SearchIcon />
        <input placeholder="Searching" />
      </HeaderMain>
      <HeaderRight>
        <EcoIcon onClick={() => auth.signOut()} />
      </HeaderRight>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--color-original);
  color: white;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex: 0.3;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;

// Cách add 1 components của marterial-ui vào 1 styled components
const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.75;
  }
`;

const HeaderMain = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: rgb(169, 220, 245);
  text-align: center;
  display: flex;
  padding: 0 50px;
  color: gray;
  border: 1px solid gray;

  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0;
    color: #000;
  }
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
`;

export default Header;
