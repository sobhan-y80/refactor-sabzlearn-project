import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Category from "./pages/Category/Category";
import Blog from "./pages/Blog/Blog";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ContactUs from "./pages/ContactUs/ContactUs";
import Search from "./pages/Search/Search";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/Course/:courseID", element: <Product /> },
  { path: "/Category/:categoryID", element: <Category /> },
  { path: "/Blog", element: <Blog /> },
  { path: "/Login", element: <Login /> },
  { path: "/Register", element: <Register /> },
  { path: "/ContactUs", element: <ContactUs /> },
  { path: "/Search/:valueSearch", element: <Search /> },
];

export default routes;
