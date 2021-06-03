import { auth } from "firebase.js";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router";
import styled from "styled-components";

function MainAddInfo() {
  const [user] = useAuthState(auth);
  const { userId } = useParams();

  return (
    <>
      <MainEditUserContainer>
        <Header>
          <h1>ADDITIONAL PERSONAL INFORMATION</h1>
        </Header>
        <Information>
          <h1>Updating ..... </h1>
        </Information>
      </MainEditUserContainer>
    </>
  );
}

const MainEditUserContainer = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Header = styled.div`
  height: 50px;
  display: flex;
  margin-top: 50px;
  align-items: center;

  > h1 {
    color: #2c607d;
    margin: 0 auto;
  }
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  max-height: auto;
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 10px;
`;

// const InputInfor = styled.div`
//   margin: 20px 0;
//   display: flex;
//   flex-direction: row;
//   align-items: flex-start;
//   margin-left: 30px;
//   > span {

//   }
// `;

// const InputForm = styled.form`
//     width: 300px;
//     height: 30px;
//     margin-left: 20px;
//   > input {
//       width: 260%;
//       height: 30px;
//       font-size: 16px;
//       border: none;
//       padding-left: 20px;
//       /* margin-left: 10px ; */
//   }
// `;

export default MainAddInfo;
