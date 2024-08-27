import styled from 'styled-components';
import { FlexCenter } from '../../../components/Styles/Flex.styles';
import {
  AuthContainer,
  AuthContentArea,
  AuthInputArea,
  AuthText,
} from '../../../components/Styles/Auth.styles';

export const Container = styled(AuthContainer)``;

export const ContentArea = styled(AuthContentArea)``;

export const InputArea = styled(AuthInputArea)``;

export const UserAuthArea = styled(FlexCenter)`
  gap: 10px;
  background-color: var(--background-color);
`;

export const Text = styled(AuthText)`
  font-size: var(--font-size-xxl);
`;

export const UserAuth = styled.div`
  color: var(--color-gray-500);
  &:hover {
    color: var(--color-gray-hover);
  }
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  cursor: pointer;
`;
