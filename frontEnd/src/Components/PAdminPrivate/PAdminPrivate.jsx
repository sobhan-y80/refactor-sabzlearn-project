import React, { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function PAdminPrivate({ children }) {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>{authContext.userInfo.role === "ADMIN" ? children : navigate("/Login")}</>
  );
}

export default PAdminPrivate;
