import styled from 'styled-components';
import { FlexColumn, FlexStart, FlexEnd } from './Flex.styles';

export const AdminContainer = styled(FlexColumn)`
  align-items: center;
  min-height: 100vh;
`;

export const AdminContentArea = styled(FlexColumn)`
  flex: 1;
  width: 100%;
  max-width: 1040px;
`;

export const AdminTitleArea = styled(FlexColumn)`
  gap: 16px;
  margin-top: 16px;
`;

export const AdminButtonArea = styled(FlexEnd)`
  margin: 11px;
  gap: 20px;
`;

export const AdminTitle = styled(FlexStart)`
  color: var(--color-gray-500);
  font-size: var(--font-size-xxl);
  font-weight: var(--font-weight-bold);
`;

export const AdminSpanText = styled(FlexEnd)`
  align-items: center;
  margin: 0px 14px 14px 14px;
  font-size: var(--font-size-md);
  color: var(--color-gray-500);
`;
