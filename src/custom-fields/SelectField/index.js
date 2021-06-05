import React from "react";
import styled from "styled-components";
import Select from "react-select";
import "./selectField.css";


function SelectField(props) {
  const { field, label, placeholder, options ,form } = props;
  const { name,value } = field;
  const {errors,touched} = form;
  const showError = errors[name] && touched[name];


  const selectedOptionName = options.find(option => option.value === value);

  const handleSelectOptionChange = (selectedOption) =>{
    const  selectedValue = selectedOption ? selectedOption.value : selectedOption;
    const changeEvent = { 
      target:{
        name: name,
        value: selectedValue,
      }
    };
    field.onChange(changeEvent);
  }
  return (
    <SelectFieldContainer>
      {label && <label htmlFor={name}>{label}</label>}
      <div>
      <Select
        // styles={customStyles}
        id={name}
        {...field}
        value={selectedOptionName}
        onChange={handleSelectOptionChange}

        placeholder={placeholder}
        options={options}
        // className="select-field"
        className={"select-field"}
        // || (showError ? 'is-invalid' : '')
        />
        {/* <ErrorMessage name={name} component={FormFeedback}/> */}
        {showError && <p>{errors}</p>}
      </div>
    </SelectFieldContainer>
  );
}

const SelectFieldContainer = styled.form`
  display: flex;
  flex-direction: row;
  height: 50px;
  width: 100%;
  margin: 20px;
  align-items: center;
  > label {
    flex: 0.15;
  }
  >div{
    flex: 1;
    >p{
      color: red; 
    }
    
  }
`;
// const customStyles = {
//   option: (provided, state) => ({
//     ...provided,
//     borderBottom: '1px dotted pink',
//     color: state.isSelected ? 'red' : 'blue',
//     padding: 20,
//   }),
//   control: () => ({
//     // none of react-select's styles are passed to <Control />
//     width: 500,
//   }),
//   singleValue: (provided, state) => {
//     const opacity = state.isDisabled ? 0.5 : 1;
//     const transition = 'opacity 300ms';
//     return { ...provided, opacity, transition };
//   }
// }

export default SelectField;
