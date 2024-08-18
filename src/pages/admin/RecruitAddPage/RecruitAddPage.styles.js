import styled from 'styled-components';
import {
  Flex,
  FlexColumn,
  FlexCenter,
  FlexAlignCenter,
  FlexEnd,
} from '../../../components/Styles/Flex.styles';
import {
  AdminContainer,
  AdminContentArea,
  AdminTitle,
  AdminTitleArea,
} from '../../../components/Styles/Admin.styles';

export const Container = styled(AdminContainer)``;

export const TitleArea = styled(AdminTitleArea)``;

export const ContentArea = styled(AdminContentArea)`
  gap: 62px;
  margin-bottom: 32px;
`;

export const Title = styled(AdminTitle)``;

export const FormArea = styled(FlexColumn)`
  gap: 30px;
`;

export const FileInputArea = styled(FlexAlignCenter)``;

export const ImagePreviewArea = styled(Flex)`
  flex-wrap: nowrap;
`;

export const ButtonArea = styled(FlexEnd)``;

export const Input = styled.input`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  border: none;
  outline: none;
`;

export const FileInput = styled.input`
  display: none;
`;

export const UploadButton = styled.img`
  width: 250px;
  height: 250px;
  cursor: pointer;
`;

export const ImagePreviewWrapper = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: var(--color-gray-300);
  color: var(--background-color);
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
`;

export const Textarea = styled.textarea`
  font-size: var(--font-size-lm);
  border: none;
  outline: none;
  resize: none;
  height: 300px;
`;

export const SubmitButton = styled(FlexCenter)`
  padding: 10px 35px;
  color: var(--background-color);
  font-size: var(--font-size-lm);
  font-weight: var(--font-weight-bold);
  background-color: var(--color-blue);
  &:hover {
    background-color: var(--color-blue-hover);
  }
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  cursor: pointer;
`;
