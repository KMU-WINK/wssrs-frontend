import styled from 'styled-components';
import {
  AuthContainer,
  AuthContentArea,
  AuthText,
  AuthAlert,
  AuthInputArea,
} from '../../../components/Styles/Auth.styles';

export const Container = styled(AuthContainer)``;

export const ContentArea = styled(AuthContentArea)``;

export const InputArea = styled(AuthInputArea)``;

export const TextArea = styled(InputArea)`
  gap: 5px;
  align-items: center;
`;

export const Text = styled(AuthText)`
  font-size: var(--font-size-${(props) => props.size});
`;

export const Alert = styled(AuthAlert)``;
