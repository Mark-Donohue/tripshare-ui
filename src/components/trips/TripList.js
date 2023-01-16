import React from "react";

import Button from "../elements/Button";
import Card from "../elements/Card";
import TripItem from "./TripItem";
import "./TripList.css";

function TripList(props) {
  if (props.items.length === 0) {
    return (
      <div className="trip-list center">
        <Card>
          <h2>No trips found. Time for an adventure!</h2>
          <Button to="/trips/new">Share Trip</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="trip-list">
      {props.items.map((trip) => (
        <TripItem
          key={trip.id}
          id={trip.id}
          image={trip.image}
          title={trip.title}
          description={trip.description}
          address={trip.address}
          createUserId={trip.createUserId}
          coordinates={trip.coordinates}
          onDelete={props.onDeleteTrip}
        />
      ))}
    </ul>
  );
}

export default TripList;
