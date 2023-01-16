import { useState, useCallback, useEffect } from "react";

let signOutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState();

  const signIn = useCallback((userId, token, expiration) => {
    setToken(token);
    setUserId(userId);

    const tokenExpiration =
      expiration || new Date(new Date().getTime() + 1000 * 60 * 30);

    setTokenExpirationDate(tokenExpiration);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: userId,
        token: token,
        expiration: tokenExpiration.toISOString(),
      })
    );
  }, []);

  const signOut = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  // Handle Auto-Logout
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      signOutTimer = setTimeout(signOut, remainingTime);
    } else {
      clearTimeout(signOutTimer);
    }
  }, [token, signOut, tokenExpirationDate]);

  // Handle Auto-Login
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (
      userData &&
      userData.token &&
      new Date(userData.expiration) > new Date()
    ) {
      signIn(userData.userId, userData.token, new Date(userData.expiration));
    }
  }, [signIn]);

  return { userId, token, signIn, signOut };
};
