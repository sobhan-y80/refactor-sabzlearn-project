import React, { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function PUserPrivate({ children }) {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  //   console.log(authContext.isLoggedIn);

  return <>{authContext.isLoggedIn ? { children } : navigate("/Login")}</>;
}

export default PUserPrivate;
