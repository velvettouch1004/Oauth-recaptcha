import React from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  restricted?: boolean;
  element: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  restricted = false,
  element,
}) => {
  const token = localStorage.getItem("token");
  return token && restricted ? <Navigate to="/dashboard" /> : element;
};

export default PublicRoute;
