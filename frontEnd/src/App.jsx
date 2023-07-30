import { useState, useCallback, useEffect } from "react";
import { Router, useRoutes } from "react-router-dom";
import routes from "./routes";
import AuthContext from "./Context/AuthContext";
import { mainUrlApi } from "./Utils/Utils";

import "./css/reset.css";
import "./css/default.css";
import "./css/css-varible.css";
import "./css/font.css";
import { toast } from "react-hot-toast";

function App() {
  const Route = useRoutes(routes);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  const login = useCallback(
    (userInfo, token) => {
      setIsLoggedIn(true);
      setUserInfo(userInfo);
      setToken(token);
      localStorage.setItem("token", JSON.stringify({ token }));
    },
    [token]
  );

  const logout = useCallback(() => {
    localStorage.clear();
    setIsLoggedIn(false);
    userInfo({});
  }, []);

  useEffect(() => {
    const localStorageTokenData = JSON.parse(localStorage.getItem("token"));

    if (
      localStorageTokenData &&
      localStorageTokenData.token &&
      localStorageTokenData.token.length
    ) {
      fetch(`${mainUrlApi}/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorageTokenData.token}`,
        },
      })
        .then((res) => res.json())
        .then((userData) => {
          setIsLoggedIn(true);
          setUserInfo(userData);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("No Register Or Login");
    }
  }, [login]);

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          token,
          userInfo,
          login,
          logout,
        }}
      >
        {Route}
      </AuthContext.Provider>
    </>
  );
}

export default App;
