import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../api/Auth';
import { useCookies } from 'react-cookie';
import { useSetRecoilState } from 'recoil';
import { expiresInHours } from '../../../util/cookies';
import AuthInput from '../../../components/Input/AuthInput';
import LargeBlueButton from '../../../components/Button/LargeBlueButton';
import userState from '../../../recoil/userState';
import {
  Container,
  ContentArea,
  UserAuthArea,
  Text,
  UserAuth,
} from './SignInPage.styles';

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [setCookie] = useCookies(['accessToken', 'refreshToken']);
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const inputFields = [
    { name: 'email', placeholder: '이메일을 입력해주세요.' },
    { name: 'password', placeholder: '비밀번호를 입력해주세요.' },
  ];

  const userAuthItems = [
    { text: '회원가입', path: '/sign-up' },
    { text: '비밀번호 찾기', path: '/find-password' },
  ];

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) {
      return '모든 필드를 채워주세요.';
    }
    return null;
  };

  const onClickSignInButton = async () => {
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    try {
      const response = await login(formData);
      setCookie('accessToken', response.accessToken, {
        expires: expiresInHours(12),
      });
      setCookie('refreshToken', response.refreshToken, {
        expires: expiresInHours(24),
      });
      setUser({
        studentId: response.studentId,
        userName: response.username,
        email: formData.email,
        isAuthenticated: true,
      });
      if (formData.email === 'admin' && formData.password === 'admin12!@') {
        navigate('/recruit-manage');
      } else {
        navigate('/');
      }
    } catch (error) {
      if (error.response) {
        const { status, code, message } = error.response.data;
        switch (code) {
          case 'MEMBER_NOT_FOUND': // AUTH-001
            alert(message);
            break;
          case 'INVALID_PASSWORD': // AUTH-002
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
        <Text>Log In</Text>
        {inputFields.map((field, index) => (
          <AuthInput
            key={index}
            name={field.name}
            value={formData[field.name]}
            onChange={onInputChange}
            placeholder={field.placeholder}
          />
        ))}
        <UserAuthArea>
          {userAuthItems.map(({ text, path }, index) => (
            <UserAuth key={index} onClick={() => navigate(path)}>
              {text}
            </UserAuth>
          ))}
        </UserAuthArea>
        <LargeBlueButton onClick={onClickSignInButton} title={'로그인'} />
      </ContentArea>
    </Container>
  );
}
