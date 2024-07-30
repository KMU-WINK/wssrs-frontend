import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import recruitDetail from '../../assets/post/recruitDetail.svg';
import Header from '../../components/Common/Header.js';
import Footer from '../../components/Common/Footer.js';
import ListButton from '../../components/Button/ListButton.js';
import MediumBlueButton from '../../components/Button/MediumBlueButton.js';
import PostTitle from '../../components/Post/PostTitle.js';
import ApplyInput from '../../components/Input/ApplyInput.js';
import ApplyCheckBox from '../../components/Input/ApplyCheckBox.js';
import Category from '../../components/Post/Category.js';
import SubmitModal from '../../components/Modal.js';

function ApplyPage() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['token']);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    applyCode: '',
    contactNumber: '',
    preferredDays: [],
    isMember: '',
  });
  const Days = ['월', '화', '수', '목', '금', '토', '일'];

  const onClickNavigate = () => {
    navigate('/');
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevFormData) => {
      if (checked) {
        return {
          ...prevFormData,
          preferredDays: [...prevFormData.preferredDays, value],
        };
      } else {
        return {
          ...prevFormData,
          preferredDays: prevFormData.preferredDays.filter(
            (day) => day !== value,
          ),
        };
      }
    });
  };

  const onClickSubmit = () => {
    setShowModal(true);
  };

  return (
    <Container>
      <Header isLog={!!cookies.token} />
      <ContentArea>
        <Category />
        <Menu>
          <ListButton onClick={onClickNavigate} />
        </Menu>
        <PostArea>
          <Post src={recruitDetail} />
          <PostTextArea>
            <PostTitle title={'[생활협동조합 근로학생 지원]'} />
            <FormArea>
              <ApplyInput
                title={'지원코드'}
                name="applyCode"
                value={formData.applyCode}
                onChange={onChange}
                placeholder="A1"
              />
              <ApplyInput
                title={'연락처'}
                name="contactNumber"
                value={formData.contact}
                onChange={onChange}
                placeholder="010-xxxx-xxxx"
              />
              <PreferDayArea>
                <CheckboxTitle>희망 요일</CheckboxTitle>
                <CheckboxArea>
                  {Days.map((day) => (
                    <ApplyCheckBox
                      key={day}
                      value={day}
                      checked={formData.preferredDays.includes(day)}
                      onChange={onCheckboxChange}
                      label={day}
                    />
                  ))}
                </CheckboxArea>
              </PreferDayArea>
              <ApplyInput
                title={'조합원 가입 유무'}
                name="isMember"
                value={formData.isMember}
                onChange={onChange}
                placeholder="예 / 아니오"
              />
            </FormArea>
            <MediumBlueButton title={'제출하기'} onClick={onClickSubmit} />
          </PostTextArea>
        </PostArea>
      </ContentArea>
      <Footer />
      {showModal && (
        <>
          <Backdrop />
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PostArea = styled.div`
  display: flex;
  width: 100%;
  height: 650px;
  justify-content: center;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: var(--color-gray-10);
`;

const PostTextArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FormArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 60px 110px;
`;

const PreferDayArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const CheckboxArea = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;

const Menu = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 6px 0px;
`;

const Post = styled.img`
  width: 550px;
  height: 650px;
  background-color: var(--background-color);
`;

const CheckboxTitle = styled.div`
  font-size: var(--font-size-lm);
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export default ApplyPage;
