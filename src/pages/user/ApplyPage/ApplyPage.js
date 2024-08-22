import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNotice, recruitNotice } from '../../../api/User.js';
import Header from '../../../components/Common/Header.js';
import Footer from '../../../components/Common/Footer.js';
import ListButton from '../../../components/Button/ListButton.js';
import MediumBlueButton from '../../../components/Button/MediumBlueButton.js';
import PostTitle from '../../../components/Post/PostTitle.js';
import ApplyInput from '../../../components/Input/ApplyInput.js';
import ApplyCheckBox from '../../../components/Input/ApplyCheckBox.js';
import Category from '../../../components/Post/Category.js';
import SubmitModal from '../../../components/Modal.js';
import {
  Container,
  ContentArea,
  PostTextArea,
  PostArea,
  FormArea,
  PreferDayArea,
  UnionArea,
  CheckboxArea,
  Menu,
  Post,
  CheckboxTitle,
  Backdrop,
} from './ApplyPage.styles.js';

export default function ApplyPage() {
  const navigate = useNavigate();
  const { noticeId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [notice, setNotice] = useState({
    id: 0,
    title: '',
    content: '',
    files: [],
  });
  const [formData, setFormData] = useState({
    code: '',
    phoneNum: '',
    day: [],
    isUnion: null,
  });

  const Days = ['월', '화', '수', '목', '금', '토', '일'];

  const inputFields = [
    {
      title: '지원코드',
      name: 'code',
      value: formData.code,
      placeholder: 'A1',
    },
    {
      title: '연락처',
      name: 'phoneNum',
      value: formData.phoneNum,
      placeholder: '010-xxxx-xxxx',
    },
  ];

  const checkBoxOptions = [
    {
      value: true,
      label: '예',
    },
    {
      value: false,
      label: '아니오',
    },
  ];

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onChangeDays = (e) => {
    const { value, checked } = e.target;
    setFormData((prevFormData) => {
      if (checked) {
        return {
          ...prevFormData,
          day: [...prevFormData.day, value],
        };
      } else {
        return {
          ...prevFormData,
          day: prevFormData.day.filter((day) => day !== value),
        };
      }
    });
  };

  const onChangeUnion = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, isUnion: value === 'true' });
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
    fetchNotice();
  }, [noticeId]);

  const onClickSubmit = async () => {
    try {
      await recruitNotice(noticeId, formData);
      setShowModal(true);
    } catch (error) {
      alert('지원에 실패했습니다.');
      console.error(error);
    }
  };

  return (
    <Container>
      <Header />
      <ContentArea>
        <Category />
        <Menu>
          <ListButton onClick={() => navigate('/')} />
        </Menu>
        <PostArea>
          {notice.files.length > 0 && (
            <Post src={notice.files[0].url} alt="Notice Image" />
          )}
          <PostTextArea>
            <PostTitle title={notice.title} />
            <FormArea>
              {inputFields.map((field, index) => (
                <ApplyInput
                  key={index}
                  title={field.title}
                  name={field.name}
                  value={field.value}
                  onChange={onChangeInput}
                  placeholder={field.placeholder}
                />
              ))}
              <PreferDayArea>
                <CheckboxTitle>희망 요일</CheckboxTitle>
                <CheckboxArea>
                  {Days.map((day) => (
                    <ApplyCheckBox
                      key={day}
                      value={day}
                      checked={formData.day.includes(day)}
                      onChange={onChangeDays}
                      label={day}
                    />
                  ))}
                </CheckboxArea>
              </PreferDayArea>
              <UnionArea>
                <CheckboxTitle>조합원 가입 유무</CheckboxTitle>
                <CheckboxArea>
                  {checkBoxOptions.map((option, index) => (
                    <ApplyCheckBox
                      key={index}
                      value={option.value}
                      checked={formData.isUnion === option.value}
                      onChange={onChangeUnion}
                      label={option.label}
                    />
                  ))}
                </CheckboxArea>
              </UnionArea>
            </FormArea>
            <MediumBlueButton title={'제출하기'} onClick={onClickSubmit} />
          </PostTextArea>
        </PostArea>
      </ContentArea>
      <Footer />
      {showModal && (
        <>
          <Backdrop onClick={() => setShowModal(false)} />
          <SubmitModal
            onClose={() => setShowModal(false)}
            text={'지원 완료 되었습니다.'}
            title={'확인'}
            nav={'/'}
          />
        </>
      )}
    </Container>
  );
}
