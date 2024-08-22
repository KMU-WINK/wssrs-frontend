import { React, useState, useEffect } from 'react';
import {
  logout as apiLogout,
  refreshToken as apiRefreshToken,
} from '../../api/Auth';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import kmuLogo from '../../assets/header/kmuLogo.svg';
import LanguageSelector from '../../util/LanguageSelector';
import loginIcon from '../../assets/header/loginIcon.svg';
import logoutIcon from '../../assets/header/logoutIcon.svg';
import userState from '../../recoil/userState';
import { jwtDecode } from 'jwt-decode';

function Header() {
  const [cookies, setCookie, removeCookie] = useCookies([
    'accessToken',
    'refreshToken',
  ]);
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState);
  const setUserInfo = useSetRecoilState(userState);
  const [language, setLanguage] = useState('ko');
  const [isLog, setIsLog] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = cookies.accessToken;

      if (accessToken) {
        try {
          const decodedToken = jwtDecode(accessToken);
          const currentTime = Date.now() / 1000; // 현재 시간을 초 단위로

          if (decodedToken.exp > currentTime) {
            setIsLog(true); // accessToken이 유효하다면 로그인 상태
          } else {
            // 액세스 토큰이 만료된 경우
            const refreshToken = cookies.refreshToken;
            if (refreshToken) {
              try {
                // 서버에 리프레시 토큰을 사용하여 새 액세스 토큰을 요청
                await refreshAccessToken(refreshToken);
                setIsLog(true); // 새 액세스 토큰 발급 성공
              } catch (error) {
                // 리프레시 토큰이 만료되었거나 문제가 발생한 경우
                handleLogout();
              }
            } else {
              handleLogout();
            }
          }
        } catch (error) {
          handleLogout(); // 토큰 디코딩 실패 시 로그아웃 처리
        }
      } else {
        setIsLog(false); // 액세스 토큰이 없으면 로그아웃 처리
      }
    };

    checkLoginStatus();
  }, [cookies.accessToken, cookies.refreshToken]);

  const refreshAccessToken = async (refreshToken) => {
    try {
      const data = await apiRefreshToken(refreshToken);
      setCookie('accessToken', data.accessToken, { path: '/' });
    } catch (error) {
      console.error('Failed to refresh access token:', error);
      handleLogout();
    }
  };

  const handleLogout = () => {
    removeCookie('accessToken');
    removeCookie('refreshToken');
    setUserInfo({
      studentId: '',
      userName: '',
      email: '',
      isAuthenticated: false,
    });
    navigate('/sign-in');
  };

  const onClickLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const translations = {
    ko: {
      coop: '| 생활협동조합',
    },
    en: {
      coop: '| Cooperative',
    },
    zh: {
      coop: '| 生活合作社',
    },
  };

  const transLanguage = translations[language];

  const onClickLogIcon = async () => {
    if (isLog) {
      const accessToken = cookies.accessToken;
      const refreshToken = cookies.refreshToken;
      if (!accessToken || !refreshToken) return;

      try {
        await apiLogout(accessToken);
        handleLogout();
      } catch (error) {
        alert('로그아웃에 실패했습니다.');
        console.error('로그아웃 에러', error);
      }
    } else {
      navigate('/sign-in');
    }
  };

  return (
    <Container>
      <ContentArea>
        <LogoArea>
          <a
            href="https://www.kookmin.ac.kr/user/index.do"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={kmuLogo} width="134px" height="50px" />
          </a>
          <Text>{transLanguage.coop}</Text>
        </LogoArea>
        <InfoArea>
          {isLog && (
            <UserName>
              {userInfo.studentId} {userInfo.userName}
            </UserName>
          )}
          <LanguageSelector onClickLanguageChange={onClickLanguageChange} />
          <Image
            src={isLog ? logoutIcon : loginIcon}
            width="30px"
            height="30px"
            onClick={onClickLogIcon}
          />
        </InfoArea>
      </ContentArea>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100px;
  width: 100%;
  background-color: var(--background-color);
  border-bottom: 0.5px solid var(--color-gray-500);
`;

const ContentArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1040px;
`;

const LogoArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
`;

const InfoArea = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0px 13px;
  gap: 10px;
  background-color: var(--color-yellow);
`;

const Image = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  cursor: pointer;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font-size-md);
  color: var(--color-gray-500);
  margin-left: 4px;
`;

const UserName = styled.div`
  font-size: var(--font-size-sm);
  color: var(--background-color);
  margin-right: 40px;
`;

export default Header;
