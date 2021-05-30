import React from "react";
import styled from "styled-components";

function MainUser() {
  return (
    <MainUserContainer>
      <HeaderUser>
        <HeaderUserBackground>
          <img
            src="https://c.wallhere.com/photos/0f/db/5_Centimeters_Per_Second_anime-106824.jpg!d"
            alt="This is background dizz"
          />
        </HeaderUserBackground>
        <HeaderUserAvatar>
          <img
            src="https://upload.wikimedia.org/wikipedia/vi/b/b0/Avatar-Teaser-Poster.jpg"
            alt="This is Avatar"
          />
        </HeaderUserAvatar>
      </HeaderUser>
      <UserContainer>
        <UserNameAndDescription>
            <h2>Your Name</h2>
            <p>Love you to the moon and back</p>
        </UserNameAndDescription>

      </UserContainer>
    </MainUserContainer>
  );
}

const MainUserContainer = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const HeaderUser = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 400px;
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
  right: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  cursor: pointer;
  > img {
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

const UserContainer = styled.div``;

const UserNameAndDescription = styled.div``;

export default MainUser;
