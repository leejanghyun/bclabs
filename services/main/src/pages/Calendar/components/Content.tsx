import { css } from '@emotion/react';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import styled from '@emotion/styled';

// Components
import { Box, Button, Card, Color, ico_arrow_purple } from 'ui';
import CalendarModal from './CalendarModal';

// Hooks
import { useSelector } from '@/hooks';

// Store
import { AppThunkDispatch, getCurrentCalendarItems, getSelectedCalenderId } from '@/store';

import { requestCalendar } from '@/store/features/calendar';

// Utils
import { getWeekNumber, getWeekRange } from '@/utils';

/**
 * Calendar 아이템 내용물
 */
type CalendarContent = {
  description: string;
  summary: string;
  kind: string;
};

/**
 * 캘린더 일정 생성 날짜
 */
export type CalendarCreateDate = {
  year: number;
  month: number;
  date: number;
};

/**
 * 캘린더 Page 컴포넌트
 * @returns 캘린더 Page 컴포넌트
 */
const Conent = () => {
  const dispatch = useDispatch<AppThunkDispatch>();
  // Selector
  const calendarId = useSelector(getSelectedCalenderId);
  const calendarItems = useSelector(getCurrentCalendarItems);
  // State
  const [currentWeekInfo, setCurrentWeekInfo] = useState<string>(new Date().toString());
  const [showModal, setShowModal] = useState(false);
  const [calendarContent, setCalendarContent] = useState<CalendarContent[]>([]);
  const [isEditMode, setEditMode] = useState(false);
  const [createDate, setCreateDate] = useState<CalendarCreateDate>();
  // Variable
  const calendarItemTime = calendarItems.map((item) => new Date(item.startDateTime));
  const { timeMin } = getWeekRange(new Date(currentWeekInfo));

  /**
   * Calendar ID에 해당하는 값 반환
   */
  const requestUserCalendarId = useCallback(async () => {
    if (!calendarId) {
      return;
    }

    const { timeMin, timeMax } = getWeekRange(new Date(currentWeekInfo));
    const offset = new Date().getTimezoneOffset() * 60000;

    const params = {
      maxResults: 1000,
      timeMin: new Date(timeMin.getTime() - offset).toISOString(),
      timeMax: new Date(timeMax.getTime() - offset).toISOString(),
    };
    const { isError } = unwrapResult(await dispatch(requestCalendar({ id: calendarId, params })));

    if (isError) {
      throw new Error('user info request error');
    }
  }, [calendarId, currentWeekInfo, dispatch]);

  /**
   * 초기화
   */
  useEffect(() => {
    requestUserCalendarId();
  }, [requestUserCalendarId]);

  /**
   * 이전주 날짜 이동
   */
  const handlePrevWeek = useCallback(() => {
    if (!currentWeekInfo) {
      return;
    }

    const curDate = new Date(currentWeekInfo);
    const pastDate = curDate.getDate() - 7;
    curDate.setDate(pastDate);

    setCurrentWeekInfo(curDate.toString());
  }, [currentWeekInfo]);

  /**
   * 다음주 날짜 이동
   */
  const handleNextWeek = useCallback(() => {
    if (!currentWeekInfo) {
      return;
    }

    const curDate = new Date(currentWeekInfo);
    const pastDate = curDate.getDate() + 7;
    curDate.setDate(pastDate);

    setCurrentWeekInfo(curDate.toString());
  }, [currentWeekInfo]);

  /**
   * 주간 정보 반화
   * @returns 주간 정보 반화
   */
  const getCalendarWeekInfo = () => {
    const date = new Date(timeMin);

    return `${date?.getFullYear()}년 ${date.getMonth() + 1}월 ${getWeekNumber(date)}주차`;
  };

  /**
   * 일정 보여주기
   * @param year 년
   * @param month 월
   * @param date 일
   */
  const handleShowCalendar = (year: number, month: number, date: number) => {
    const targetCalendars = calendarItems.filter((item) => {
      const { startDateTime } = item;
      const targetDate = new Date(startDateTime);

      return (
        targetDate.getFullYear() === year &&
        targetDate?.getMonth() + 1 === month &&
        targetDate?.getDate() === date
      );
    });
    const newCalendarContents = targetCalendars.map((item) => {
      const { description, summary, kind } = item;
      return { description, summary, kind };
    });

    setShowModal(!showModal);
    setCalendarContent(newCalendarContents);
    setEditMode(false);
  };

  /**
   * 일정 생성
   * @param year 년
   * @param month 월
   * @param date 일
   */
  const handleCreateCalendar = useCallback(
    (year: number, month: number, date: number) => {
      setShowModal(!showModal);
      setEditMode(true);
      setCreateDate({ year, month, date });
    },
    [showModal]
  );

  return (
    <Box styles={WrapperCss}>
      <Box styles={TitleCss}>
        <Box>
          <LeftButtonStyled src={ico_arrow_purple} onClick={handlePrevWeek} />
        </Box>
        {currentWeekInfo && <Box>{getCalendarWeekInfo()}</Box>}
        <Box>
          <RightButtonStyled src={ico_arrow_purple} onClick={handleNextWeek}></RightButtonStyled>
        </Box>
      </Box>

      {/** 주간 일정 목록 */}
      {calendarId && (
        <Box styles={WeeksCss}>
          {new Array(7).fill(null).map((day, idx) => {
            const curDate = new Date(timeMin);

            curDate.setDate(curDate.getDate() + idx);

            const year = curDate.getFullYear();
            const month = curDate.getMonth() + 1;
            const date = curDate.getDate();
            const targetIdx = calendarItemTime.findIndex(
              (item) =>
                item?.getFullYear() === year &&
                item?.getMonth() + 1 === month &&
                item?.getDate() === date
            );

            return (
              <Card key={idx} styles={CardCss}>
                <Box styles={CardContentCss}>
                  <Box>{`${month}월 ${date} 일`}</Box>
                  <Box styles={CardButtonWrapperCss}>
                    <Button
                      disabled={targetIdx < 0}
                      styles={DetailButtonCss}
                      onClick={() => handleShowCalendar(year, month, date)}
                    >
                      보기
                    </Button>
                    <Button
                      styles={CreateButtonCss}
                      onClick={() => handleCreateCalendar(year, month, date)}
                    >
                      생성
                    </Button>
                  </Box>
                </Box>
              </Card>
            );
          })}
        </Box>
      )}

      {/** Modal */}
      <CalendarModal
        createDate={createDate}
        isEdit={isEditMode}
        calendarContent={calendarContent}
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
    </Box>
  );
};

const RightButtonStyled = styled.img`
  width: 25px;
  height: 25px;
  object-fit: contain;
  margin: 0 20px;
`;

const LeftButtonStyled = styled.img`
  width: 25px;
  height: 25px;
  object-fit: contain;
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
  margin: 0 20px;
`;

const WrapperCss = css`
  height: 60vh;
  width: 100vw;
  padding: 15px;
  min-width: 1200px;
`;

const TitleCss = css`
  height: 10vh;
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  color: ${Color.PrimaryColor.PRIMARY_700};
`;

const WeeksCss = css`
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardCss = css`
  height: 20vh;
  min-width: 200px;
  width: 12vw;
  padding: 15px;
`;

const CardContentCss = css`
  height: 20vh;
  min-width: 200px;
  width: 12vw;
  padding: 10px;
`;

const CardButtonWrapperCss = css`
  bottom: 10px;
  padding: 10px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 10px;
`;

const CreateButtonCss = css`
  max-width: 70px;
  min-width: 70px;
  min-height: 30px;
  padding: 5px;
  margin: 5px 5px 5px 0px;
`;

const DetailButtonCss = css`
  max-width: 70px;
  min-width: 70px;
  min-height: 30px;
  padding: 5px;
  margin: 10px;
  background: ${Color.GrayColor.GRAY_900};
`;

export default Conent;
