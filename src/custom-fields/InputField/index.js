import React from "react";
import styled from "styled-components";

function InputField(props) {
  const { field, label, placeholder, form } = props;

  const { name } = field;

  const { touched, errors } = form;
  const showError = errors[name] && touched[name];

  return (
    <InputFieldContainer>
      {label && <label htmlFor={name}>{label}</label>}
      <div>
        <input
          id={name}
          {...field}
          placeholder={placeholder}
          // className={showError ? "is-invalid" : ""}
        />
        {showError && <p>{errors[name]}</p>}

        {/* <ErrorMessage name={name} component={FormFeedback} /> */}
      </div>
    </InputFieldContainer>
  );
}

const InputFieldContainer = styled.form`
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
  > div {
    flex: 1;

    > input {
      height: 40px;
      width: 80%;
      font-size: 16px;
      margin-left: 20px;
      padding-left: 10px;
      border-radius: 10px;
      border: 0.5px solid rgba(0, 0, 0, 0.2);
    }
    >p{
      margin-left: 20px;
      color: red; 
      
    }
  }
`;

export default InputField;
