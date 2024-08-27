import React, { useState } from 'react';
import styled from 'styled-components';

function AuthInput({ label, name, value, onChange, placeholder }) {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    if (value === '') {
      setIsFocused(false);
    }
  };

  const getInputType = (name) => {
    switch (name) {
      case 'password':
      case 'newPassword':
      case 'rePassword':
        return 'password';
      case 'email':
        return 'email';
      default:
        return 'text';
    }
  };

  return (
    <Container>
      <Text>{label}</Text>
      <Input
        type={getInputType(name)}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={isFocused ? '' : placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </Container>
  );
}

const Container = styled.div`
  max-width: 345px;
  width: 100%;
  margin: 0 auto;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 15px;
  font-size: var(--font-size-lm);
  color: var(--color-gray-500);
  font-weight: var(--font-weight-medium);
`;

const Input = styled.input`
  height: 50px;
  width: 100%;
  padding: 20px 10px;
  font-size: var(--font-size-lm);
  box-sizing: border-box;
  border-radius: 15px;
  border: 1px solid var(--color-blue);
  border-left-width: 5px;
`;

export default AuthInput;
