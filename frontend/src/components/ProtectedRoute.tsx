import { useEffect } from "react";
import { isAuthenticated } from "../utils/auth";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoute() {
  const isAuth = isAuthenticated();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(isAuth);
    if (isAuth === false) {
      navigate("/signin", { replace: true });
    }
  }, [isAuth]);

  return <Outlet/>;
}