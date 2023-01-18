import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/elements/Button";
import ErrorModal from "../components/elements/ErrorModal";
import ImageUpload from "../components/elements/ImageUpload";
import Input from "../components/elements/Input";
import LoadingSpinner from "../components/elements/LoadingSpinner";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../util/validators";
import { useForm } from "../hooks/form-hook";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../context/auth-context";
import "./styles/TripForm.css";

function NewTrip() {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearErrorHander } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      description: {
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

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);

      await sendRequest(
        `${process.env.REACT_APP_API_URL}/trips`,
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      navigate("/");
    } catch (err) {
      console.log("An error occurred.");
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearErrorHander} />
      <form className="trip-form" onSubmit={submitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          type="text"
          label="Title"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Please enter a valid title."
        />
        <Input
          id="address"
          label="Address"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Please enter a valid address."
        />
        <Input
          id="description"
          label="Description"
          element="textarea"
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
          errorText="Please enter a valid description with at least 5 characters."
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide a picture of your trip!"
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD TRIP
        </Button>
      </form>
    </>
  );
}

export default NewTrip;
