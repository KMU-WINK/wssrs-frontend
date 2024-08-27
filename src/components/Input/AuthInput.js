import React, { useState } from 'react';
import styled from 'styled-components';

function AuthInput({ name, value, onChange, placeholder }) {
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
      case 'rePassword':
      case 'newPassword':
        return 'password';
      case 'email':
        return 'email';
      default:
        return 'text';
    }
  };

  return (
    <Container>
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

const Container = styled.div``;

const Input = styled.input`
  height: 50px;
  padding: 10px 100px;
  font-size: var(--font-size-lm);
  text-align: center;
  box-sizing: border-box;
  border-radius: 20px;
  border: 1px solid var(--color-blue);
  border-left-width: 7px;
`;

export default AuthInput;
