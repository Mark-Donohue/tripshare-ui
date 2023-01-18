import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AllUsers from "./pages/AllUsers";
import Auth from "./pages/Auth";
import MainNavigation from "./components/navigation/MainNavigation";
import MyTrips from "./pages/MyTrips";
import NewTrip from "./pages/NewTrip";
import UpdateTrip from "./pages/UpdateTrip";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";

function App() {
  const { userId, token, signIn, signOut } = useAuth();
  let routes;

  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" element={<AllUsers />} />
        <Route path="/:userId/trips" element={<MyTrips />} />
        <Route path="/trips/new" element={<NewTrip />} />
        <Route path="/trips/:tripId" element={<UpdateTrip />} />
        <Route path="*" element={<Navigate to="/" />} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" element={<AllUsers />} />
        <Route path="/:userId/trips" element={<MyTrips />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isSignedIn: !!token,
        token: token,
        userId: userId,
        signIn: signIn,
        signOut: signOut,
      }}
    >
      <BrowserRouter>
        <MainNavigation />
        <main>
          <Routes>{routes}</Routes>
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
