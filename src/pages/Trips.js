import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ErrorModal from "../components/elements/ErrorModal";
import LoadingSpinner from "../components/elements/LoadingSpinner";
import TripList from "../components/trips/TripList";
import { useHttpClient } from "../hooks/http";

function Trips() {
  const [tripData, setTripData] = useState();
  const { isLoading, error, sendRequest, clearErrorHander } = useHttpClient();
  const userId = useParams().userId;

  useEffect(() => {
    const getTrips = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/trips/user/${userId}`
        );
        setTripData(responseData);
      } catch (err) {
        console.log("An error occured.");
      }
    };
    getTrips();
  }, [sendRequest, userId]);

  const tripDeleteHandler = (deletedTripId) => {
    setTripData((prevTrips) =>
      prevTrips.filter((trip) => trip.id !== deletedTripId)
    );
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearErrorHander} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && tripData && (
        <TripList items={tripData} onDeleteTrip={tripDeleteHandler} />
      )}
    </>
  );
}

export default Trips;
