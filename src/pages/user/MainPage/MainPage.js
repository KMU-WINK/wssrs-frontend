import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { getAllNotices } from '../../../api/User.js';
import { Container, ContentArea, Backdrop } from './MainPage.styles.js';
import Header from '../../../components/Common/Header.js';
import Footer from '../../../components/Common/Footer.js';
import RecruitPoster from '../../../components/Post/RecruitPoster.js';
import LoginModal from '../../../components/Modal.js';

export default function MainPage() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['accessToken', 'refreshToken']);
  const [showModal, setShowModal] = useState(false);
  const [notices, setNotices] = useState([]);

  const onClickPost = (noticeId) => {
    if (!cookies.accessToken) {
      setShowModal(true);
    } else {
      navigate(`/post-detail/${noticeId}`);
    }
  };

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await getAllNotices();
        setNotices(response);
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              alert('잘못된 요청입니다. 요청 데이터를 확인해주세요.');
              break;
            case 404:
              alert('요청한 리소스를 찾을 수 없습니다.');
              break;
            case 500:
              alert('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
              break;
            default:
              alert('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
          }
        } else {
          alert('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.');
        }
      }
    };
    fetchNotices();
  }, []);

  return (
    <Container>
      <Header />
      <ContentArea>
        {notices.map((notice) => (
          <RecruitPoster
            key={notice.id}
            date={notice.createdAt}
            onClick={() => onClickPost(notice.id)}
          />
        ))}
      </ContentArea>
      <Footer />
      {showModal && (
        <>
          <Backdrop onClick={() => setShowModal(false)} />
          <LoginModal
            onClose={() => setShowModal(false)}
            text={'로그인이 필요합니다.'}
            title={'로그인하기'}
            nav={'/sign-in'}
          />
        </>
      )}
    </Container>
  );
}
