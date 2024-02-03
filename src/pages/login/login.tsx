import React, { ChangeEvent, FormEventHandler } from 'react';
import { Button, Flex, Input } from 'antd';
import { TAuthData } from './index';

interface TLoginProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleLogin: FormEventHandler<HTMLFormElement>;
  loginData: Partial<TAuthData>;
}

const Login: React.FC<TLoginProps> = ({
  handleChange,
  loginData,
  handleLogin,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <Flex vertical gap={12} style={{ minWidth: '300px' }}>
        <Input
          placeholder="Email"
          name="email"
          type="email"
          onChange={handleChange}
          value={loginData.email}
        />
        <Input
          placeholder="Password"
          name="password"
          required={true}
          onChange={handleChange}
          value={loginData.password}
        />
        <Button htmlType="submit">Login</Button>
      </Flex>
    </form>
  );
};

export default Login;
