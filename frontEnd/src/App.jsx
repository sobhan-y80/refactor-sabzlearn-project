import { useState } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

import "./css/reset.css";
import "./css/default.css";
import "./css/css-varible.css";
import "./css/font.css";

function App() {
  const [count, setCount] = useState(0);
  const Route = useRoutes(routes);

  return <>{Route}</>;
}

export default App;
