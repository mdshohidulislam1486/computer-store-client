import React, { ChangeEvent, FormEventHandler } from 'react';
import { Button, Flex, Input } from 'antd';
import { TAuthData } from './index';

interface TRegisterProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  registerData: Partial<TAuthData>;
  handleRegister: FormEventHandler<HTMLFormElement>;
}

const Register: React.FC<TRegisterProps> = ({
  handleRegister,
  handleChange,
  registerData,
}) => {
  return (
    <form onSubmit={handleRegister}>
      <Flex vertical gap={12} style={{ minWidth: '300px' }}>
        <Input
          placeholder="Full Name"
          name="fullName"
          onChange={handleChange}
          value={registerData.fullName}
          required={true}
        />
        <Input
          placeholder="Email"
          name="email"
          type="email"
          onChange={handleChange}
          value={registerData.email}
        />
        <Input
          placeholder="Password"
          name="password"
          onChange={handleChange}
          required={true}
          minLength={6}
          value={registerData.password}
        />
        <Input
          placeholder="Confirm Password"
          name="retypePassword"
          onChange={handleChange}
          required={true}
          minLength={6}
          value={registerData.retypePassword}
        />
        <Button htmlType="submit">Register</Button>
      </Flex>
    </form>
  );
};

export default Register;
