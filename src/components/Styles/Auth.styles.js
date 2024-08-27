import styled from 'styled-components';
import { FlexCenter, FlexColumn, FlexEnd } from './Flex.styles';

export const AuthContainer = styled(FlexCenter)`
  min-height: 100vh;
`;

export const AuthContentArea = styled(FlexCenter)`
  flex-direction: column;
  width: 90%;
  max-width: 700px;
  height: 700px;
  gap: 30px;
  border-radius: 50px;
  background-color: var(--background-color);
  box-sizing: border-box;
  box-shadow: 4px 4px 30px 0px rgba(0, 0, 0, 0.25);4
`;

export const AuthInputArea = styled(FlexColumn)`
  width: 100%;
  gap: ${(props) => props.gap};
`;

export const AuthText = styled.div`
  color: var(--color-gray-500);
  font-weight: var(--font-weight-bold);
`;

export const AuthAlert = styled(FlexEnd)`
  color: var(--color-red);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
`;
