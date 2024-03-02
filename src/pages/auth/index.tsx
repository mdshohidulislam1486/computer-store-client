/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent, useState } from 'react';
import logo from '../../assets/store-logo.avif';
import Login from './login';
import Register from './register';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import {
  useLoginMutation,
  useRegisterMutation,
} from '../../redux/features/auth/authApi';
import { verifyToken } from '../../utlis/verifyToken';
import { TUser, setUser } from '../../redux/features/auth/authSlice';
import { toast } from 'sonner';

export type TAuthData = {
  fullName: string;
  email: string;
  password: string;
  retypePassword: string;
  role: '';
  passwordChangedAt: Date;
};
const AuthSection: React.FC = () => {
  const initialData: TAuthData = {
    fullName: '',
    email: '',
    password: '',
    retypePassword: '',
    role: '',
    passwordChangedAt: new Date(),
  };
  const [authData, setAuthData] = useState(initialData);
  const [toggleAuth, setToggleAuth] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { error }] = useLoginMutation();
  const [register, { error: registerError }] = useRegisterMutation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    e.preventDefault();
    setAuthData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading('Logging in');
    try {
      const userInfo = {
        email: authData.email,
        password: authData.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success('Logged in', { id: toastId, duration: 2000 });

      // navigate(`/${user.role}/inventory`);
    } catch (error) {
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
  };
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading('Logging in');
    if (authData.password !== authData.retypePassword) {
      toast.error('Password did not match', { id: toastId, duration: 2000 });
      return;
    }
    const registerInfo = {
      user: {
        fullName: authData.fullName,
        email: authData.email,
        password: authData.password,
        role: authData.role,
        passwordChangedAt: authData.passwordChangedAt,
      },
    };
    try {
      const res = await register(registerInfo).unwrap();
      toast.success('Register Successfully', { id: toastId, duration: 2000 });
      setAuthData(initialData);
    } catch (error: any) {
      const errorMessage = error.data?.errorMessage || 'Something went wrong';
      toast.error(errorMessage, { id: toastId, duration: 2000 });
    }
  };
  const handleAuthToggle = () => {
    setToggleAuth((prev) => !prev);
    setAuthData(initialData);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <img
        src={logo}
        alt="store -logo"
        width={150}
        height={120}
        style={{ objectFit: 'contain' }}
      />
      {toggleAuth ? (
        <Login
          handleChange={handleChange}
          loginData={authData}
          handleLogin={handleLogin}
        />
      ) : (
        <Register
          handleChange={handleChange}
          setAuthData={setAuthData}
          registerData={authData}
          handleRegister={handleRegister}
        />
      )}
      <div>
        {toggleAuth ? (
          <small>
            Don't have an account?{' '}
            <span
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={handleAuthToggle}
            >
              Register here
            </span>
          </small>
        ) : (
          <small>
            Do you already have an account?{' '}
            <span
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={handleAuthToggle}
            >
              Login here
            </span>
          </small>
        )}
      </div>
    </div>
  );
};

export default AuthSection;
