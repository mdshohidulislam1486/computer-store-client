import React, { ChangeEvent, FormEventHandler } from 'react';
import { Button, Flex, Input, Select } from 'antd';
import { TAuthData } from './index';

interface TRegisterProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  registerData: Partial<TAuthData>;
  handleRegister: FormEventHandler<HTMLFormElement>;
  setAuthData: React.Dispatch<React.SetStateAction<TAuthData>>;
}

const Register: React.FC<TRegisterProps> = ({
  handleRegister,
  handleChange,
  registerData,
  setAuthData,
}) => {
  const handleSelect = (value: string) => {
    setAuthData((prev) => ({
      ...prev,
      role: value as '',
    }));
  };
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
          type="password"
          onChange={handleChange}
          required={true}
          minLength={6}
          value={registerData.password}
        />
        <Input
          placeholder="Confirm Password"
          name="retypePassword"
          type="password"
          onChange={handleChange}
          required={true}
          minLength={6}
          value={registerData.retypePassword}
        />
        <Select
          defaultValue={registerData.role || undefined}
          onChange={handleSelect}
          options={[
            { value: 'seller', label: 'Seller' },
            { value: 'buyer', label: 'Buyer' },
          ]}
        />
        <Button htmlType="submit">Register</Button>
      </Flex>
    </form>
  );
};

export default Register;
