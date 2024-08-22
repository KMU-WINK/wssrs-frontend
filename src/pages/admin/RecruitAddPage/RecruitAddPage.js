import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNotice } from '../../../api/Admin.js';
import Header from '../../../components/Common/Header.js';
import Footer from '../../../components/Common/Footer.js';
import imageSelector from '../../../assets/post/imageSelector.svg';
import BackArrow from '../../../components/Arrow/BackArrow.js';
import {
  Container,
  TitleArea,
  ContentArea,
  Title,
  FormArea,
  FileInputArea,
  ImagePreviewArea,
  ButtonArea,
  Input,
  FileInput,
  UploadButton,
  ImagePreviewWrapper,
  PreviewImage,
  DeleteButton,
  Textarea,
  SubmitButton,
} from './RecruitAddPage.styles.js';

export default function RecruitAddPage() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onChangeFile = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const onChangeText = (setter) => (e) => {
    setter(e.target.value);
  };

  const onClickDeleteImage = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const onClickSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      await createNotice(formData);
      alert('공고글이 성공적으로 등록되었습니다.');
      navigate('/recruit-manage');
    } catch (error) {
      alert('공고글 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Container>
      <Header />
      <ContentArea>
        <TitleArea>
          <BackArrow />
          <Title>Administration</Title>
        </TitleArea>
        <FormArea>
          <Input
            type="text"
            value={title}
            onChange={onChangeText(setTitle)}
            placeholder="제목"
          />
          <FileInputArea>
            <FileInput
              type="file"
              onChange={onChangeFile}
              multiple
              id="fileInput"
              accept="image/*"
            />
            <UploadButton
              src={imageSelector}
              alt="Upload"
              onClick={() => document.getElementById('fileInput').click()}
            />
            <ImagePreviewArea>
              {files.map((file, index) => (
                <ImagePreviewWrapper key={index}>
                  <PreviewImage
                    src={URL.createObjectURL(file)}
                    alt={`image-${index}`}
                  />
                  <DeleteButton onClick={() => onClickDeleteImage(index)}>
                    X
                  </DeleteButton>
                </ImagePreviewWrapper>
              ))}
            </ImagePreviewArea>
          </FileInputArea>
          <Textarea
            value={content}
            onChange={onChangeText(setContent)}
            placeholder="내용을 입력해주세요."
          />
          <ButtonArea>
            <SubmitButton onClick={onClickSubmit}>등록</SubmitButton>
          </ButtonArea>
        </FormArea>
      </ContentArea>
      <Footer />
    </Container>
  );
}
