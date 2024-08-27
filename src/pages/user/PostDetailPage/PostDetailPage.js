import { React, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { getNotice } from '../../../api/User.js';
import Header from '../../../components/Common/Header.js';
import Footer from '../../../components/Common/Footer.js';
import Category from '../../../components/Post/Category.js';
import ListButton from '../../../components/Button/ListButton.js';
import PostTitle from '../../../components/Post/PostTitle.js';
import LoginModal from '../../../components/Modal.js';
import {
  Container,
  ContentArea,
  PostTextArea,
  PostArea,
  TextArea,
  Menu,
  Post,
  ApplyButton,
  Text,
  Backdrop,
} from './PostDetailPage.styles.js';

export default function PostDetailPage() {
  const [cookies] = useCookies(['accessToken', 'refreshToken']);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { noticeId } = useParams();
  const [notice, setNotice] = useState({
    id: 0,
    title: '',
    content: '',
    files: [],
  });

  const onClickApplyButton = (noticeId) => {
    if (!cookies.accessToken) {
      setShowModal(true);
    } else {
      navigate(`/apply/${noticeId}`);
    }
  };

  const onClickListButton = () => {
    if (!cookies.accessToken) {
      setShowModal(true);
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await getNotice(noticeId);
        setNotice({
          id: response.id,
          title: response.title,
          content: response.content,
          files: response.files,
        });
      } catch (error) {
        if (error.response) {
          const { status, code, message } = error.response.data;
          switch (code) {
            case 'MEMBER_NOT_FOUND': // AUTH-001
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
    fetchNotice();
  }, [noticeId]);

  return (
    <Container>
      <Header />
      <ContentArea>
        <Category />
        <Menu>
          <ListButton onClick={onClickListButton} />
        </Menu>
        <PostArea>
          {notice.files.length > 0 && (
            <Post src={notice.files[0].url} alt="Notice Image" />
          )}
          <PostTextArea>
            <PostTitle title={notice.title} />
            <TextArea value={notice.content} readOnly />
            <ApplyButton onClick={onClickApplyButton}>
              <Text>지원하기</Text>
            </ApplyButton>
          </PostTextArea>
        </PostArea>
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
