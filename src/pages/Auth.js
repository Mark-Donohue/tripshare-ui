import React from "react";
import { useState, useContext } from "react";

import Button from "../components/elements/Button";
import Card from "../components/elements/Card";
import ErrorModal from "../components/elements/ErrorModal";
import LoadingSpinner from "../components/elements/LoadingSpinner";
import ImageUpload from "../components/elements/ImageUpload";
import Input from "../components/elements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../util/validators";
import { useForm } from "../hooks/form";
import { useHttpClient } from "../hooks/http";
import { AuthContext } from "../context/auth-context";
import "./Auth.css";

function Auth() {
  const auth = useContext(AuthContext);
  const [isSignInMode, setIsSignInMode] = useState(true);
  const { isLoading, error, sendRequest, clearErrorHander } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    if (isSignInMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/users/signin`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        auth.signIn(responseData.userId, responseData.token);
      } catch (err) {
        console.log("An error occurred.");
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("firstName", formState.inputs.firstName.value);
        formData.append("lastName", formState.inputs.lastName.value);
        formData.append("email", formState.inputs.email.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);

        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/users/signup`,
          "POST",
          formData
        );

        auth.signIn(responseData.userId, responseData.token);
      } catch (err) {
        console.log("An error occurred.");
      }
    }
  };

  const switchModeHandler = () => {
    if (!isSignInMode) {
      setFormData(
        {
          ...formState.inputs,
          firstName: undefined,
          lastName: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          firstName: {
            value: "",
            isValid: false,
          },
          lastName: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }

    setIsSignInMode((prevMode) => !prevMode);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearErrorHander} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{isSignInMode ? "Welcome Back!" : "Welcome!"}</h2>
        <hr />
        <form onSubmit={submitHandler}>
          {!isSignInMode && (
            <ImageUpload center id="image" onInput={inputHandler} errorText="Please provide a picture of yourself!"/>
          )}
          {!isSignInMode && (
            <React.Fragment>
              <Input
                id="firstName"
                element="input"
                type="text"
                label="First Name"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Please enter your first name."
              />
              <Input
                id="lastName"
                element="input"
                type="text"
                label="Last Name"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Please enter your last name."
              />
            </React.Fragment>
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
            errorText="Please enter a valid email address."
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(8)]}
            onInput={inputHandler}
            errorText="Please enter a valid password with at least 8 characters."
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isSignInMode ? "SIGN IN" : "SIGN UP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isSignInMode ? "SIGN UP" : "SIGN IN"}
        </Button>
      </Card>
    </React.Fragment>
  );
}

export default Auth;
