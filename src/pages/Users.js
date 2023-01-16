import React, { useEffect, useState } from "react";

import ErrorModal from "../components/elements/ErrorModal";
import LoadingSpinner from "../components/elements/LoadingSpinner";
import UserList from "../components/users/UserList";
import { useHttpClient } from "../hooks/http";

function Users() {
  const { isLoading, error, sendRequest, clearErrorHander } = useHttpClient();
  const [userData, setUserData] = useState();

  useEffect(() => {
    async function getUsers() {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/users`
        );
        setUserData(responseData);
      } catch (err) {
        console.log("An error occurred.");
      }
    }

    getUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearErrorHander} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && userData && <UserList items={userData} />}
    </React.Fragment>
  );
}

export default Users;
