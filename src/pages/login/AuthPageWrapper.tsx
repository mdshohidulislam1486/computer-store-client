import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { currentToken } from '../../redux/features/auth/authSlice';
import { ReactNode } from 'react';

export const AuthPageWrapper = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(currentToken);
  if (token) {
    return <Navigate to="/admin/inventory" replace={true} />;
  }
  return children;
};
