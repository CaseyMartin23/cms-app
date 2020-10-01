import React from "react";

import { Form, Field } from "react-final-form";

import styled from "styled-components";

const StyledForm = styled.form`
  background-color: grey;
`;

const LoginPage = () => {
  return (
    <div>
      <Form
        onSubmit={() => {}}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Field name="email">
              {({ input, meta }) => (
                <div>
                  <input
                    {...input}
                    type="text"
                    placeholder="Please enter email address"
                  />
                </div>
              )}
            </Field>
          </StyledForm>
        )}
      />
    </div>
  );
};

export default LoginPage;
