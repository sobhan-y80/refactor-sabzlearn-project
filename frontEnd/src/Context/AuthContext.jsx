import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { json } from "react-router-dom";
import { mainUrl } from "../Utils/Utils";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  const login = useCallback((useInfo, token) => {
    console.log("login run");
    setToken(token);
    setUserInfo(useInfo);
    localStorage.setItem("user", JSON.stringify({ token }));
  }, []);

  const logout = () => {
    setToken(null);
    setUserInfo({});
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    if (localStorageData && localStorageData.token.length) {
      fetch(`${mainUrl}/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
      })
        .then((res) => res.json())
        .then((userData) => {
          console.log("useEffect Login run", userData);
          setIsLoggedIn(true);
          setUserInfo(userData);
        });
    } else {
      console.log("no bag ;)");
    }
  }, [login]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        userInfo,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
