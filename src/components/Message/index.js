import React from "react";
import styled from "styled-components";

function Message({ message, timestamp, userName, userImage }) {
  return (
    <MessageContainer>
      <img src={userImage} alt="user" />
      <MessageInfo>
        <h4>
          {userName}
          <span>{new Date(timestamp?.toDate()).toLocaleString()}</span>
        </h4>

        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  );
}

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  > img {
    height: 50px;
    border-radius: 50%;
  }
`;

const MessageInfo = styled.div`
    padding-left: 10px;
    /* display: flex;
    flex-direction: column;
    justify-content: space-between; */
    >h4 {
      font-weight: 600;
    }
    >h4 >span{
        color: gray;
        font-weight: 300;
        margin-left: 4px;
        font-size: 10px;
    }
    >p{
      margin-top: 10px;
      font-weight: 400;
    }
`;

export default Message;
