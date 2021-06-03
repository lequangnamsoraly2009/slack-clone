import React from "react";
import styled from "styled-components";

function MainChat() {
  return (
    <MainChatContainer>
      <Header>
        <span>WELCOME TO CHANNEL: <b>ĂN CHƠI SA ĐỌA</b></span>
      </Header>
      <Main>
        <p>RULES OF CHANNEL</p>
        <span><b>DO</b> say Hello</span>
        <span><b>DO</b> respect personal boundaries</span>
        <span><b>DO</b> love everyone by all your heart</span>
        <span><b>DON'T</b> cry, curse nor laugh</span>
        <span><b>DON'T</b> bite each other</span>
        <span><b>KEEP</b> yourseft</span>
        <span><b>KEEP</b> your virgin hole ass</span>

      </Main>
      <Footer>
        <span>Channel created : 26/05/2021 </span>
        <h1>THANK YOU FOR JOIN</h1>
      </Footer>
    </MainChatContainer>
  );
}

const MainChatContainer = styled.div`
  margin-top: 60px;
  flex: 1;
  display: flex;
  /* background-color: #999; */
  flex-direction: column;
  width: 100%;
  align-items: center;
  height: auto;
`;

const Header = styled.div`
  margin-top: 100px;
  margin-bottom: 100px;
  > span {
    font-size: 40px;
    color: #000;
    >b{
        color: #0c83eb;
    }
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  > p {
    font-size: 30px;
    color: red;
    margin-bottom: 20px;
  }
  > span {
      margin: 15px;
      >b{
          color: red;
      }
  }
`;

const Footer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    >span{
        margin: 15px;
    }
    >h1{
        margin-top: 20px;
        color: green;
    }

`;

export default MainChat;
