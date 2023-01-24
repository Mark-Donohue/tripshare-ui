import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AllUsers from "./pages/AllUsers";
import Auth from "./pages/Auth";
import LoadingSpinner from "./components/elements/LoadingSpinner";
import MainNavigation from "./components/navigation/MainNavigation";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";

// Declare certain routes lazily that are not immediately required
const MyTrips = React.lazy(() => import("./pages/MyTrips"));
const NewTrip = React.lazy(() => import("./pages/NewTrip"));
const UpdateTrip = React.lazy(() => import("./pages/UpdateTrip"));

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
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            <Routes>{routes}</Routes>
          </Suspense>
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
