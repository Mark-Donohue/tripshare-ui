import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../elements/Avatar";
import Card from "../elements/Card";
import "./UserItem.css";

function UserItem(props) {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/trips`}>
          <div className="user-item__image">
            <Avatar
              image={props.image}
              alt={props.name}
            />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.tripCount} {props.tripCount === 1 ? "Trip" : "Trips"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
}

export default UserItem;
