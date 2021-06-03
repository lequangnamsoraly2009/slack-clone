import React from 'react';
import styled from 'styled-components';

NotFound.propTypes = {};

function NotFound() {
  return (
    <NotFoundContainer>
      <h1>Oopss ... Not found</h1>
    </NotFoundContainer>
  );
}

const NotFoundContainer = styled.div`
  margin-top: 60px;
  display:flex;
  flex: 1;align-items: center;
  >h1{
    color: red;
    margin: 0 auto;
  }
`;



export default NotFound;
