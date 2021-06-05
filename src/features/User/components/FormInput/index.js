import { genderUserOptions } from "common/genderUser";
import { gfUser } from "common/gfUser";
import { locationUserOptions } from "common/locationUser";
import InputField from "custom-fields/InputField";
import SelectField from "custom-fields/SelectField";
import { FastField, Form, Formik } from "formik";
import React from "react";

function FormInput() {
    const initialValues = {
        userAge: '',
        userPhone: '',
        userLocation: null,
        userGender: null,
        userFaceBook: '',
        userNYC:'',
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
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormInput;
