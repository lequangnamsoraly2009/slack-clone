import React from 'react'
import styled from 'styled-components';

function SelectField(props) {
    const { field,  label, placeholder , options } = props;
    const { name } = field;
    return (
        <SelectFieldContainer>
            
        </SelectFieldContainer>
    )
}

const SelectFieldContainer = styled.form`
  display: flex;
  flex-direction: row;
  height: 50px;
  width: 100%;
  margin: 20px;
  align-items: center;
  flex: 1;
  > label {
      flex: 0.15;
  }
  > input {
    flex: 0.8;
    height: 40px;
    width: 80%;
    font-size: 16px;
    margin-left: 10px;
    padding-left: 10px;
    border-radius: 10px;
    border: 0.5px solid rgba(0, 0, 0, 0.2);
  }
`;


export default SelectField
