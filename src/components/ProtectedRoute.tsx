import { Navigate } from "react-router-dom";
import { getToken } from "../utils/token";
import type { JSX } from "react";

type ProtectedRouteProps = {
  children: JSX.Element;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = getToken();

  // If no token, redirect to Sign-In
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // If token exists, render the protected component
  return children;
}
