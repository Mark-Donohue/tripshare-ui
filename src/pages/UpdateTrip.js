import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Button from "../components/elements/Button";
import Card from "../components/elements/Card";
import ErrorModal from "../components/elements/ErrorModal";
import Input from "../components/elements/Input";
import LoadingSpinner from "../components/elements/LoadingSpinner";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../util/validators";
import { useForm } from "../hooks/form";
import { useHttpClient } from "../hooks/http";
import { AuthContext } from "../context/auth-context";
import "./TripForm.css";

function UpdateTrip() {
  const { isLoading, error, sendRequest, clearErrorHander } = useHttpClient();
  const [tripData, setTripData] = useState();
  const tripId = useParams().tripId;
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const getTrip = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/trips/${tripId}`
        );
        setTripData(responseData);
        setFormData(
          {
            title: {
              value: responseData.title,
              isValid: true,
            },
            description: {
              value: responseData.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
        console.log("An error occurred.");
      }
    };
    getTrip();
  }, [sendRequest, setFormData, tripId]);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/trips/${tripId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + auth.token
        }
      );

      navigate(`/${auth.userId}/trips`);
    } catch (err) {
      console.log("An error occurred.");
    }
  };

  if (!tripData) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!tripData && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find trip!</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearErrorHander} />
      {!isLoading && tripData && (
        <form className="trip-form" onSubmit={submitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            value={tripData.title}
            valid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description with at least 5 characters."
            onInput={inputHandler}
            value={tripData.description}
            valid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE TRIP
          </Button>
          <Button inverse>CANCEL</Button>
        </form>
      )}
    </>
  );
}

export default UpdateTrip;
