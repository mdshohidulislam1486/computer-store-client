import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import {
  currentToken,
  currentUserData,
} from '../../redux/features/auth/authSlice';
import { ReactNode } from 'react';

export const AuthPageWrapper = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(currentUserData);
  const token = useAppSelector(currentToken);
  if (token) {
    return <Navigate to={`/${user!.role}/inventory`} replace={true} />;
  }
  return children;
};
