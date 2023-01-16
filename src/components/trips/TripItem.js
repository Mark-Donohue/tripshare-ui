import React from "react";
import { useState, useContext } from "react";

import Button from "../elements/Button";
import Card from "../elements/Card";
import ErrorModal from "../elements/ErrorModal";
import LoadingSpinner from "../elements/LoadingSpinner";
import Map from "../elements/Map";
import Modal from "../elements/Modal";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http";
import "./TripItem.css";

function TripItem(props) {
  const { isLoading, error, sendRequest, clearErrorHander } = useHttpClient();
  const auth = useContext(AuthContext);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const openMapHandler = () => {
    setIsMapVisible(true);
  };

  const closeMapHandler = () => {
    setIsMapVisible(false);
  };

  const openDeleteConfirmHandler = () => {
    setIsConfirmVisible(true);
  };

  const closeDeleteConfirmHandler = () => {
    setIsConfirmVisible(false);
  };

  const deleteHandler = async () => {
    setIsConfirmVisible(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/trips/${props.id}`,
        "DELETE",
        null,
        {
          "Authorization": "Bearer " + auth.token
        }
      );
      props.onDelete(props.id);
    } catch (err) {
      console.log("An error occurred.");
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearErrorHander} />
      <Modal
        show={isMapVisible}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="trip.item__modal-content"
        footerClass="trip-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={15} />
        </div>
      </Modal>
      <Modal
        show={isConfirmVisible}
        onCancel={closeDeleteConfirmHandler}
        header="Warning!"
        footerClass="trip-item__modal-actions"
        footer={
          <React.Fragment>
            <Button onClick={closeDeleteConfirmHandler}>CANCEL</Button>
            <Button danger onClick={deleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Are you sure you want to delete this trip? This action cannot be
          undone.
        </p>
      </Modal>
      <li className="trip-item">
        <Card className="trip-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="trip-item__image">
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="trip-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="trip-item__actions">
            <Button onClick={openMapHandler}>VIEW ON MAP</Button>
            {auth.userId === props.createUserId && (
              <Button to={`/trips/${props.id}`}>EDIT</Button>
            )}
            {auth.userId === props.createUserId && (
              <Button danger onClick={openDeleteConfirmHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
}

export default TripItem;
