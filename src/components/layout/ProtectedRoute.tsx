import React, { ReactNode } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { currentToken } from '../../redux/features/auth/authSlice';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(currentToken);
  // console.log({ token });
  if (!token) {
    return <Navigate to="/auth" replace={true} />;
  }
  return children;
};
