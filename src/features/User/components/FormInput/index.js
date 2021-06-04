import InputField from "custom-fields/InputField";
import { FastField, Form, Formik } from "formik";
import React from "react";

function FormInput() {
    const initialValues = {
        userBirthDay: '',
        userPhone: '',
        userAddress: '',
        userSchool: '',
        userGender: 'male',
    }
  return (
    <Formik
        initialValues={initialValues}
    >
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        console.log({values, errors, touched});
        // Xu ly UI here

        return (
          <Form>
            <FastField
              name="userBirthDay"
              component={InputField}
              
              label="BirthDay"
              placeholder="Your BirthDay"
            />
            <FastField
              name="userGender"
              component={InputField}
              
              label="Gender"
              placeholder="Your Gender"
            />
            <FastField
              name="userPhone"
              component={InputField}
              
              label="Phone Number"
              placeholder="Your Phone Number"
            />
            <FastField
              name="userAddress"
              component={InputField}
              
              label="Address"
              placeholder="Your Address"
            />
            <FastField
              name="userSchool"
              component={InputField}
              
              label="School"
              placeholder="Your School"
            />
            
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormInput;
