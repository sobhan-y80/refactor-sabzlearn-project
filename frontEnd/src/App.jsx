import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Category from "./pages/Category/Category";

import "./css/reset.css";
import "./css/default.css";
import "./css/css-varible.css";
import "./css/font.css";
import Blog from "./pages/Blog/Blog";
import Login from "./pages/Login/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Home></Home> */}
      {/* <Product></Product> */}
      {/* <Category></Category> */}
      {/* <Blog></Blog> */}
      <Login></Login>
    </>
  );
}

export default App;
