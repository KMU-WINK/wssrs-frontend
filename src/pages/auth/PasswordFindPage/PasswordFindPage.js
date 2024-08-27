import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findMember } from '../../../api/Auth';
import AuthInput from '../../../components/Input/AuthInput';
import LargeBlueButton from '../../../components/Button/LargeBlueButton';
import {
  Container,
  ContentArea,
  InputArea,
  Text,
  Alert,
} from './PasswordFindPage.styles';

export default function PasswordFindPage() {
  const [formData, setFormData] = useState({
    email: '',
    studentId: '',
  });
  const [userInfoValid, setUserInfoValid] = useState(true);
  const navigate = useNavigate();

  const inputFields = [
    { label: '학번', name: 'studentId', placeholder: '학번을 입력해주세요.' },
    { label: '이메일', name: 'email', placeholder: '이메일을 입력해주세요.' },
  ];

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { email, studentId } = formData;

    if (!studentId) {
      return '학번을 입력해주세요.';
    }
    if (!email) {
      return '이메일을 입력해주세요.';
    }

    return null;
  };

  const onClickNextButton = async () => {
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    try {
      const response = await findMember(formData);
      if (response.accessToken && !response.refreshToken) {
        const { accessToken, refreshToken } = response;
        navigate('/reset-password', { state: { accessToken, refreshToken } });
      }
    } catch (error) {
      if (error.response) {
        const { status, code, message } = error.response.data;
        switch (code) {
          case 'MEMBER_NOT_FOUND': // AUTH-001
            setUserInfoValid(false);
            alert(message);
            break;
          default:
            switch (status) {
              case 400:
                alert('잘못된 요청입니다. 입력한 정보를 확인해 주세요.');
                break;
              case 404:
                alert('요청한 자원을 찾을 수 없습니다.');
                break;
              case 500:
                alert('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
                break;
              default:
                alert('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
                break;
            }
        }
      } else {
        alert('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.');
      }
    }
  };

  return (
    <Container>
      <ContentArea>
        <Text>비밀번호 찾기</Text>
        <InputArea gap="5px">
          <InputArea gap="10px">
            {inputFields.map((field) => (
              <AuthInput
                key={field.name}
                label={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={onInputChange}
                placeholder={field.placeholder}
              />
            ))}
          </InputArea>
          {!userInfoValid && <Alert>* 사용자 정보가 일치하지 않습니다!</Alert>}
        </InputArea>
        <LargeBlueButton onClick={onClickNextButton} title={'다음'} />
      </ContentArea>
    </Container>
  );
}
