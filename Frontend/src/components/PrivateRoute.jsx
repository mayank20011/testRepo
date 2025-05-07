import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const isLogedIn = JSON.parse(sessionStorage.getItem("isLogedIn"));
  return isLogedIn ? <Outlet /> : <Navigate to="/" />
};

export default PrivateRoute;
