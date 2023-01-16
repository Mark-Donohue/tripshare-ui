import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

function NavLinks(props) {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact="true">
          ALL USERS
        </NavLink>
      </li>
      {auth.isSignedIn && (
        <li>
          <NavLink to={`/${auth.userId}/trips`}>MY TRIPS</NavLink>
        </li>
      )}
      {auth.isSignedIn && (
        <li>
          <NavLink to="/trips/new">NEW TRIP</NavLink>
        </li>
      )}
      {!auth.isSignedIn && (
        <li>
          <NavLink to="/auth">SIGN IN</NavLink>
        </li>
      )}
      {auth.isSignedIn && (
        <li>
          <button onClick={auth.signOut}>SIGN OUT</button>
        </li>
      )}
    </ul>
  );
}

export default NavLinks;
