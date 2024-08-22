import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllNotices, deleteNotice } from '../../../api/Admin.js';
import { FormatDate } from '../../../util/FormatDate.js';
import Header from '../../../components/Common/Header.js';
import Footer from '../../../components/Common/Footer.js';
import RecruitManageButton from '../../../components/Button/RecruitManageButton.js';
import RecruitTable from '../../../components/Table/RecruitTable.js';
import PagingArrow from '../../../components/Arrow/PagingArrow.js';
import {
  Container,
  ContentArea,
  ButtonArea,
  Title,
} from './RecruitManagePage.styles.js';

export default function RecruitManagePage() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [pageNum, setPageNum] = useState(0);

  const buttonConfig = [
    {
      title: '공고글 작성',
      onClick: (navigate) => navigate('/recruit-add'),
    },
    {
      title: (showCheckboxes, selectedRows) =>
        showCheckboxes
          ? selectedRows.length > 0
            ? '삭제'
            : '취소'
          : '공고글 삭제',
      onClick: (onClickDeletePost) => onClickDeletePost(),
    },
  ];

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await getAllNotices(pageNum);
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
  }, [pageNum]);

  const onClickRowPost = (notice) => {
    navigate(`/recruit-detail/${notice.id}`, {
      state: { formattedDate: FormatDate(notice.createdAt) },
    });
  };

  const onClickDeletePost = async () => {
    if (showCheckboxes) {
      if (selectedRows.length > 0) {
        try {
          await Promise.all(
            selectedRows.map(async (noticeId) => {
              await deleteNotice(noticeId);
            }),
          );
          setSelectedRows([]);
          setShowCheckboxes(false);
          const response = await getAllNotices(pageNum);
          setNotices(response);
        } catch (error) {
          alert('삭제에 실패했습니다. 다시 시도해주세요.');
        }
      } else {
        setShowCheckboxes(false);
      }
    } else {
      setShowCheckboxes(true);
    }
  };

  const onChangeCheckBox = (id) => {
    setSelectedRows((prevSelectedRows) => {
      const updatedRows = prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((num) => num !== id)
        : [...prevSelectedRows, id];
      return updatedRows;
    });
  };

  const onChangePage = (direction) => {
    setPageNum((prevPage) => {
      if (direction === 'next') {
        return prevPage + 1;
      } else if (direction === 'prev' && prevPage > 1) {
        return prevPage - 1;
      } else {
        return prevPage;
      }
    });
  };

  const columns = [
    {
      Header: '번호',
      accessor: 'id',
      Cell: ({ row }) => (
        <div>
          {showCheckboxes ? (
            <input
              type="checkbox"
              checked={selectedRows.includes(row.original.id)}
              onChange={() => onChangeCheckBox(row.original.id)}
            />
          ) : (
            row.original.id
          )}
        </div>
      ),
    },
    { Header: '제목', accessor: 'title' },
    {
      Header: '날짜',
      accessor: 'createdAt',
      Cell: ({ value }) => FormatDate(value),
    },
  ];

  return (
    <Container>
      <Header />
      <ContentArea>
        <Title>Administration</Title>
        <ButtonArea>
          {buttonConfig.map((config, index) => (
            <RecruitManageButton
              key={index}
              title={
                typeof config.title === 'function'
                  ? config.title(showCheckboxes, selectedRows)
                  : config.title
              }
              onClick={() =>
                config.onClick(index === 0 ? navigate : onClickDeletePost)
              }
            />
          ))}
        </ButtonArea>
        <RecruitTable
          columns={columns}
          data={notices}
          onClick={onClickRowPost}
        />
        <PagingArrow
          pageName="Manage"
          onChangePage={onChangePage}
          currentPage={pageNum}
          totalPages={notices.length}
        />
      </ContentArea>
      <Footer />
    </Container>
  );
}
