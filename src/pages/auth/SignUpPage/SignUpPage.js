import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../../api/Auth';
import AuthInput from '../../../components/Input/AuthInput';
import LargeBlueButton from '../../../components/Button/LargeBlueButton';
import { Container, ContentArea, Text } from './SignUpPage.styles';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    studentId: '',
    password: '',
    username: '',
    email: '',
  });
  const navigate = useNavigate();

  const inputFields = [
    { name: 'studentId', placeholder: '학번을 입력해주세요.' },
    { name: 'email', placeholder: '이메일을 입력해주세요.' },
    { name: 'username', placeholder: '이름을 입력해주세요.' },
    { name: 'password', placeholder: '비밀번호를 입력해주세요.' },
  ];

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { studentId, password, username, email } = formData;

    // 학번: 8자리 숫자만
    const studentIdRegex = /^\d{8}$/;
    if (!studentId) {
      return '학번을 입력해주세요.';
    }
    if (!studentIdRegex.test(studentId)) {
      return '학번은 8자리 숫자여야 합니다.';
    }

    // 이메일: 이메일 형식 맞추기
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return '이메일을 입력해주세요.';
    }
    if (!emailRegex.test(email)) {
      return '유효한 이메일 주소를 입력해주세요.';
    }

    // 이름: 영문자와 한글만
    const usernameRegex = /^[a-zA-Z가-힣]+$/;
    if (!username) {
      return '이름을 입력해주세요.';
    }
    if (!usernameRegex.test(username)) {
      return '이름은 영문자와 한글만 포함할 수 있습니다.';
    }

    // 비밀번호: 영어, 특수문자, 숫자 포함 8자 이상
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!password) {
      return '비밀번호를 입력해주세요.';
    }
    if (!passwordRegex.test(password)) {
      return '비밀번호는 영어, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.';
    }

    return null;
  };

  const onClickSignUpButton = async () => {
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    try {
      await signUp(formData);
      navigate('/sign-in');
    } catch (error) {
      if (error.response) {
        const { status, code, message } = error.response.data;
        switch (code) {
          case 'DUPLICATED_MEMBER': // AUTH-003
            alert(message);
            break;
          case 'MISSING_INFORMATION': // AUTH-004
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
        <Text>Sign Up</Text>
        {inputFields.map((field, index) => (
          <AuthInput
            key={index}
            name={field.name}
            value={formData[field.name]}
            onChange={onInputChange}
            placeholder={field.placeholder}
          />
        ))}
        <LargeBlueButton onClick={onClickSignUpButton} title={'회원가입'} />
      </ContentArea>
    </Container>
  );
}
