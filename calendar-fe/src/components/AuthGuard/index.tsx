import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import { RootState } from '../store/rootReducer'; // Replace with your Redux store path

interface AuthGuardProps {
  children: any
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const {user} = useSelector((state: any) => state.userSlice);

  if (user===null) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthGuard;
