import { genderUserOptions } from "common/genderUser";
import { gfUser } from "common/gfUser";
import { locationUserOptions } from "common/locationUser";
import InputField from "custom-fields/InputField";
import SelectField from "custom-fields/SelectField";
import { db } from "firebase.js";
import { FastField, Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import * as Yup from "yup";

function FormInput(props) {
  const initialValues = {
    userAge: null,
    userPhone: null,
    userLocation: null,
    userGender: "",
    userFaceBook: "",
    userNYC: null,
  };

  const history = useHistory();
  const validationSchema = Yup.object().shape({
    userAge: Yup.number().required('This field is required!').nullable(),
    userPhone: Yup.number().required('This field is required!').nullable(),
    userLocation: Yup.number().required('This field is required!').nullable(),
    userGender: Yup.string().required('This field is required!'),
    userFaceBook: Yup.string().required('This field is required!'),
    userNYC: Yup.number().required('This field is required!').nullable(),
  });

  const handleClickInformation = (values) =>{
    if(!props.userId) return;
    db.collection('userInfomation').doc(props.userId).set({
      userAge: values.userAge,
      userPhone: values.userPhone,
      userLocation: values.userLocation,
      userGender: values.userGender,
      userFaceBook: values.userFaceBook,
      userNYC: values.userNYC,
      userName: props.user.displayName,
      userEmail: props.user.email,
      userImage: props.user.photoURL,
    }).then(() => {
      console.log("Success Add Information User For Database");
    });
    history.push(`/user/${props.userId}`);
  }

  return (
    <Formik initialValues={initialValues} onSubmit={values => handleClickInformation(values)} validationSchema={validationSchema}>
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        console.log({ values, errors, touched });
        // Xu ly UI here

        return (
          <Form>
            <FastField
              name="userAge"
              component={InputField}
              label="Age"
              placeholder="Your Age"
            />
            <FastField
              name="userGender"
              component={SelectField}
              label="Gender"
              placeholder="Your Gender"
              options={genderUserOptions}
            />
            <FastField
              name="userPhone"
              component={InputField}
              label="Phone Number"
              placeholder="Your Phone Number"
            />
            <FastField
              name="userLocation"
              component={SelectField}
              label="Location"
              placeholder="Your Location"
              options={locationUserOptions}
            />
            <FastField
              name="userFaceBook"
              component={InputField}
              label="Link FaceBook"
              placeholder="Your Link FaceBook"
            />
            <FastField
              name="userNYC"
              component={SelectField}
              label="GirlFriends "
              placeholder="Number Your Old GirlFriends"
              options={gfUser}
            />
            <FormSubmit>
              <button type="submit"  >Submit Information</button>
            </FormSubmit>
          </Form>
        );
      }}
    </Formik>
  );
}

const FormSubmit = styled.div`
display: flex;
flex: 1;
align-items: center;
  height: 100px;
  width: 100%;
  >button{
    width: 200px;
    height: 50px;
    background-color: #93dffa;
    border: none;
    border-radius:9px;
    margin: 0 auto;
    cursor: pointer;
    :focus{
      box-shadow: 0 1px 2px rgba(0,0,0,0.2),0 2px 5px rgba(0,0,0,0.6);
      background-color: #23c3fc;
      color: white;
    }
}
`;

export default FormInput;
