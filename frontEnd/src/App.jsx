import { useState } from "react";
import { Router, useRoutes } from "react-router-dom";
import routes from "./routes";
import AuthProvider from "./Context/AuthContext";

import "./css/reset.css";
import "./css/default.css";
import "./css/css-varible.css";
import "./css/font.css";

function App() {
  const [count, setCount] = useState(0);
  const Route = useRoutes(routes);

  return (
    <>
      <AuthProvider>{Route}</AuthProvider>
    </>
  );
}

export default App;
