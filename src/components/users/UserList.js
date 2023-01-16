import React from "react";

import UserItem from "./UserItem";
import Card from "../elements/Card";
import "./UserList.css";

function UserList(props) {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No Users Found</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="user-list">
      {props.items.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            name={user.firstName}
            image={user.image}
            tripCount={user.trips.length}
          />
        );
      })}
    </ul>
  );
}

export default UserList;
