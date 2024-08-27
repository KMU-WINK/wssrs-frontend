import styled from 'styled-components';
import { FlexCenter } from '../../../components/Styles/Flex.styles';
import {
  UserContainer,
  UserPostTextArea,
  UserContentArea,
  UserPostArea,
  UserMenu,
  UserPost,
  UserBackdrop,
} from '../../../components/Styles/User.styles';

export const Container = styled(UserContainer)``;

export const PostTextArea = styled(UserPostTextArea)``;

export const ContentArea = styled(UserContentArea)``;

export const PostArea = styled(UserPostArea)``;

export const Menu = styled(UserMenu)``;

export const Post = styled(UserPost)``;

export const Backdrop = styled(UserBackdrop)``;

export const TextArea = styled.textarea`
  width: 100%;
  height: 520px;
  padding: 20px;
  border: none;
  resize: none;
  outline: none;
  background: transparent;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-regular);
  line-height: 1;
  overflow-y: auto;
  box-sizing: border-box;
  text-align: left;
`;

export const ApplyButton = styled(FlexCenter)`
  padding: 10px 30px;
  margin: auto;
  background-color: var(--color-yellow);
  &:hover {
    background-color: var(--color-yellow-hover);
  }
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  cursor: pointer;
`;

export const Text = styled.div`
  color: var(--background-color);
  font-size: var(--font-size-lm);
  font-weight: var(--font-weight-bold);
`;
