import { React, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getNotice, confirmRecruit } from '../../../api/Admin.js';
import { transformDays } from '../../../util/TransFormDays.js';
import Header from '../../../components/Common/Header.js';
import Footer from '../../../components/Common/Footer.js';
import RecruitManageButton from '../../../components/Button/RecruitManageButton.js';
import ApplyTable from '../../../components/Table/ApplyTable.js';
import BackArrow from '../../../components/Arrow/BackArrow.js';
import PagingArrow from '../../../components/Arrow/PagingArrow.js';
import {
  Container,
  ContentArea,
  TitleArea,
  Wrapper,
  ButtonArea,
  GrayText,
  SpanText,
} from './RecruitDetailPage.styles.js';

export default function RecruitDetailPage() {
  const { noticeId } = useParams();
  const location = useLocation();
  const { formattedDate } = location.state || {};
  const [notice, setNotices] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(notice.length / itemsPerPage);

  const transformDayData = (data) => {
    return data.map((item) => ({
      ...item,
      day: transformDays(item.day),
    }));
  };

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await getNotice(noticeId);
        setNotices(transformDayData(response));
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotice();
  }, [noticeId]);

  const onClickConfirmPost = async () => {
    if (showCheckboxes) {
      if (selectedRows.length > 0) {
        try {
          await confirmRecruit(selectedRows);
          const response = await getNotice(noticeId);
          setNotices(transformDayData(response));
          setSelectedRows([]);
          setShowCheckboxes(false);
        } catch (error) {
          alert('근로 확정에 실패했습니다.');
          console.error('근로 확정 에러', error);
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
    setCurrentPage((prevPage) => {
      if (direction === 'next' && prevPage < totalPages) {
        return prevPage + 1;
      } else if (direction === 'prev' && prevPage > 1) {
        return prevPage - 1;
      } else {
        return prevPage;
      }
    });
  };

  const currentData = notice.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const columns = [
    {
      Header: '번호',
      accessor: 'recruitId',
      Cell: ({ row }) => {
        const index = row.index; // 현재 행의 인덱스
        const displayNumber = (currentPage - 1) * itemsPerPage + index + 1; // 오름차순 번호 계산

        return (
          <div>
            {showCheckboxes ? (
              <input
                type="checkbox"
                checked={selectedRows.includes(row.original.recruitId)}
                onChange={() => onChangeCheckBox(row.original.recruitId)}
              />
            ) : (
              displayNumber
            )}
          </div>
        );
      },
    },
    { Header: '이름', accessor: 'username' },
    { Header: '학번', accessor: 'studentId' },
    { Header: '연락처', accessor: 'phoneNum' },
    { Header: '근무코드', accessor: 'code' },
    { Header: '희망요일', accessor: 'day' },
    {
      Header: '조합원 가입 유무',
      accessor: 'isUnion',
      Cell: ({ value }) => (value ? '예' : '아니요'),
    },
  ];

  return (
    <Container>
      <Header />
      <ContentArea>
        <TitleArea>
          <Wrapper>
            <BackArrow />
            <GrayText fontSize={'xl'}>{formattedDate}</GrayText>
          </Wrapper>
          <GrayText fontSize={'xxl'}>Administration</GrayText>
        </TitleArea>
        <ButtonArea>
          <RecruitManageButton
            title={
              showCheckboxes
                ? selectedRows.length > 0
                  ? '확인'
                  : '취소'
                : '근로 확정'
            }
            onClick={onClickConfirmPost}
          />
        </ButtonArea>
        <ApplyTable columns={columns} data={currentData} />
        <PagingArrow
          onChangePage={onChangePage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
        <SpanText>{`Page ${currentPage} of ${totalPages}`}</SpanText>
      </ContentArea>
      <Footer />
    </Container>
  );
}
