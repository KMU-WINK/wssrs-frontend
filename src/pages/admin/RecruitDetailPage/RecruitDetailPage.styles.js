import styled from 'styled-components';
import { FlexAlignCenter } from '../../../components/Styles/Flex.styles';
import {
  AdminContainer,
  AdminContentArea,
  AdminTitleArea,
  AdminButtonArea,
  AdminSpanText,
} from '../../../components/Styles/Admin.styles';

export const Container = styled(AdminContainer)``;

export const ContentArea = styled(AdminContentArea)``;

export const TitleArea = styled(AdminTitleArea)``;

export const Wrapper = styled(FlexAlignCenter)`
  gap: 20px;
`;

export const ButtonArea = styled(AdminButtonArea)``;

export const GrayText = styled.div`
  color: var(--color-gray-500);
  font-size: ${({ fontSize }) => `var(--font-size-${fontSize})`};
  font-weight: var(--font-weight-bold);
`;

export const SpanText = styled(AdminSpanText)``;
