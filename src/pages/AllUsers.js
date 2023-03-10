import React, { useEffect, useState } from "react";

import ErrorModal from "../components/elements/ErrorModal";
import LoadingSpinner from "../components/elements/LoadingSpinner";
import UserList from "../components/users/UserList";
import { useHttpClient } from "../hooks/http-hook";

function AllUsers() {
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
        console.log(
          `An error occured. Unable to fetch users from URI: ${process.env.REACT_APP_API_URL}`
        );
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

export default AllUsers;
