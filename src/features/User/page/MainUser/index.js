import React from "react";
import styled from "styled-components";
import InfoIcon from "@material-ui/icons/Info";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import Post from "features/User/components/Post";
import { useHistory, useParams } from "react-router";
import { auth, db } from "firebase.js";
import { useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {LOCATION_USER_OPTIONS} from "../../../../common/locationUser";
import {GENDER_USER_OPTIONS} from "../../../../common/genderUser";
import {GF_USER} from "../../../../common/gfUser";

// import { useAuthState } from "react-firebase-hooks/auth";
// import { authAuthentication } from "firebase.js";

function MainUser() {
  const { userId } = useParams();
  const [dataUser] = useDocument(userId && db.collection("users").doc(userId));
  const [dataUserInformation] = useDocument(userId && db.collection("userInformation").doc(userId));
  const history = useHistory();
  const [user] = useAuthState(auth);
  const locationDataBase = dataUserInformation?.data().userLocation;
  const genderDataBase = dataUserInformation?.data().userGender;
  const gfDataBase = dataUserInformation?.data().userNYC;

  const location = LOCATION_USER_OPTIONS.find(lct => lct.value === locationDataBase );
  const gender = GENDER_USER_OPTIONS.find(lct => lct.value ===  genderDataBase );
  const nyc = GF_USER.find(lct => lct.value ===  gfDataBase );




  // console.log(location.label);



  const handleClickAddUser = (e) => {
    e.preventDefault();
    if (!userId) return;
    history.push(`/user/add/${userId}`);
  };

  return (
    <>
      <MainUserContainer>
        <HeaderUser>
          <HeaderUserBackground>
            <img
              src={dataUser?.data()?.backgroundUser}
              alt="This is background and it's broken"
            />
          </HeaderUserBackground>
          <HeaderUserAvatar>
            <img src={dataUser?.data()?.photoURL} alt="This is Avatar" />
          </HeaderUserAvatar>
        </HeaderUser>

        <UserNameAndDescription>
          <h2>{dataUser?.data()?.displayName}</h2>
          <p>
            <i>{dataUser?.data()?.statusUser}</i>
          </p>
        </UserNameAndDescription>

        <UserMain>
          <UserMainLeft>
            <h1>
              <InfoIcon /> INFORMATION
            </h1>
            <span>
              Đã Từng Sống Ở <b> Trái Đất</b>
            </span>
            <span>
              Số Lượng Người Yêu Cũ <b>{nyc?.label}</b>
            </span>
            <span>
              Đã Từng Học Ở <b>{location?.label}</b>
            </span>
            <span>Bạn là <b>{gender?.label}</b></span>
            <span>
              Số Người Theo Dõi:{" "}
              <b> {Math.trunc(Math.random() * 10000)} Slacker ☑️</b>
            </span>
            <span>
              Số Channel Sở Hữu:{" "}
              <b> {dataUser?.data()?.channelUserOwned.length} </b>
            </span>
            <span>
              Số Người Ghét Bạn:{" "}
              <b> {Math.trunc(Math.random() * 100)} Hater </b>
            </span>
            <span>
              Email Cá Nhân: <b> {dataUser?.data()?.email} </b>
            </span>
          </UserMainLeft>
          <UserMainMain>
            <>
            {user.uid === userId ? (
              <UserAddInfo>
                <span>
                  If you not declared, please select add. If you want to
                  update,please select update
                </span>
                <Info>
                  <AddInfo onClick={(e) => handleClickAddUser(e)}>Add</AddInfo>
                  <EditInfo>Update</EditInfo>
                </Info>
              </UserAddInfo>

            ):(<></>)}
            </>
            <UserMainMainPost>
              <PostHeader>
                <img src={dataUser?.data()?.photoURL} alt="This is Avatar" />
                <button>Start A Post</button>
              </PostHeader>
              <PostFooter></PostFooter>
            </UserMainMainPost>
            <UserMainMainSomething>
              <Post />
            </UserMainMainSomething>
          </UserMainMain>
          <UserMainRight>
            <h1>
              {" "}
              <DoubleArrowIcon /> CHANNELS OWNED
            </h1>
            {dataUser?.data()?.channelUserOwned.length > 0 ? (
              dataUser?.data()?.channelUserOwned.map((data) => (
                <ChannelFollow key={Math.trunc(Math.random() * 1000000)}>
                  <p>#</p>
                  <span>{data.nameChannel}</span>
                </ChannelFollow>
              ))
            ) : (
              <ChannelNoFollow>
                <span>No Owned Channel</span>
              </ChannelNoFollow>
            )}
          </UserMainRight>
        </UserMain>
      </MainUserContainer>
    </>
  );
}

const MainUserContainer = styled.div`
  overflow-y: scroll;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
`;

const HeaderUser = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 375px;
  flex-direction: column;
`;

const HeaderUserBackground = styled.div`
  width: 100%;
  height: 300px;
  cursor: pointer;
  > img {
    width: 100%;
    object-fit: cover;
    height: 300px;
    border-bottom: 1px solid rgba(0, 0, 0, 1);
  }
`;

const HeaderUserAvatar = styled.div`
  position: absolute;
  content: "";
  top: 50%;
  right: 44.5%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  cursor: pointer;
  > img {
    background-color: white;
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
    border: 5px solid #fff;
    /* box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.36); */
  }

  @media (max-width: 768px) {
    top: 60%;
    right: 35%;
    > img {
      width: 100px;
      height: 100px;
    }
  }
`;

const UserNameAndDescription = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  padding-bottom: 10px;
  width: 100%;
  > h2 {
    text-align: center;
    font-size: 30px;
  }
  > p {
    text-align: center;

    > i {
      font-weight: 300;
      font-size: 16px;
    }
  }
`;

const UserMain = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const UserMainLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.2;
  > h1 {
    text-align: center;
    font-size: 20px;
    line-height: 1.5;
    font-weight: 400;
    > .MuiSvgIcon-root {
      vertical-align: sub;
      font-size: 20px;
      color: var(--color-original);
      padding-bottom: 2px;
    }
  }
  > span {
    font-weight: 300;
    font-size: 15px;
    text-align: center;
    line-height: 2;
  }
`;

const UserMainMain = styled.div`
  flex: 0.6;
  border-left: 1px solid rgba(0, 0, 0, 0.5);
  border-right: 1px solid rgba(0, 0, 0, 0.5);
`;

const UserAddInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const Info = styled.div`
  margin: 10px;
`;

const Button = styled.button`
  width: 80px;
  height: 40px;
  margin: 0 20px;
  border: none;
`;

const AddInfo = styled(Button)`
  background-color: #52bdf7;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  :hover {
    background-color: #2c607d;
    color: white;
  }
`;

const EditInfo = styled(Button)`
  background-color: #52bdf7;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  :hover {
    background-color: #2c607d;
    color: white;
  }
`;

const UserMainMainPost = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;

const PostHeader = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  flex-direction: row;
  margin: 10px 40px;
  > img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
  }
  > button {
    height: 60px;
    width: 75%;
    font-size: 16px;
    padding-left: 20px;
    text-align: start;
    color: rgba(0, 0, 0, 0.3);
    border: 0.5px solid rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    /* background-color: var(--color-original); */

    :hover {
      border: 0.5px solid rgba(0, 0, 0, 0.7);
      color: rgba(0, 0, 0, 1);
    }
  }
`;

const PostFooter = styled.div``;

const UserMainMainSomething = styled.div``;

const UserMainRight = styled.div`
  flex: 0.2;
  display: flex;
  flex-direction: column;
  > h1 {
    text-align: center;
    font-size: 20px;
    line-height: 1.5;
    font-weight: 400;
    > .MuiSvgIcon-root {
      vertical-align: sub;
      font-size: 20px;
      color: var(--color-original);
      padding-bottom: 2px;
    }
  }
`;

const ChannelFollow = styled.div`
  display: flex;
  flex-direction: row;
  line-height: 2;
  margin-left: 20px;
  > p {
    font-weight: 900;
    margin-right: 10px;
  }
  > span {
    font-weight: 600;
    cursor: pointer;
  }
`;

const ChannelNoFollow = styled.div`
  display: flex;
  line-height: 2;
  align-items: center;
  margin: 0 auto;
  /* margin-left: 20px; */
  > span {
    font-weight: 600;
    cursor: none;
    color: red;
  }
`;

export default MainUser;
