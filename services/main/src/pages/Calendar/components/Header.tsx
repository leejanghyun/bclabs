import { css } from '@emotion/react';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

// Components
import { Box, Button, Color } from 'ui';

// Hooks
import { useSelector } from '@/hooks';

// Store
import { AppThunkDispatch, getSelectedCalenderId, requestCalendarList, setCalendar } from '@/store';

import { AccessRole } from '@/api';
/**
 * 달력 아이템 Type
 */
type CalendarItem = {
  summary: string;
  id: string;
};

/**
 * 캘린더 Page 컴포넌트
 * @returns 캘린더 Page 컴포넌트
 */
const Header = () => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const [calendarList, setCalendarList] = useState<CalendarItem[]>([]);
  const calendarId = useSelector(getSelectedCalenderId);

  /**
   * 사용자 달력 리스트 요청
   */
  const requestUserCalendarList = useCallback(async () => {
    const { isError, ...rest } = unwrapResult(await dispatch(requestCalendarList()));

    if (isError) {
      throw new Error('user info request error');
    }

    const { items } = rest;

    const summarys = items
      .filter((item) => item.accessRole === AccessRole.Owner)
      .map((item) => {
        const { summary, id } = item;

        return { summary, id };
      });

    setCalendarList(summarys);
  }, []);

  /**
   * 초기화
   */
  useEffect(() => {
    requestUserCalendarList();
  }, [requestUserCalendarList]);

  /**
   * Calendar 버튼 클릭 시
   * @param id Calendar 아이디
   */
  const handleCalendarButton = (id: string) => {
    dispatch(setCalendar(id));
  };

  return (
    <Box styles={WrapperCss}>
      <Box styles={TitleCss}>달력 목록</Box>
      <Box styles={ButtonWrapperCss}>
        {calendarList.map((calendar: CalendarItem) => {
          const { summary, id } = calendar;

          return (
            <Button
              styles={calendarId === id ? ButtonCss : ButtonInActiveCss}
              key={id}
              onClick={() => handleCalendarButton(id)}
            >
              <Box styles={ButtonLabelCss}>{summary}</Box>
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

const WrapperCss = css`
  height: 17vh;
  width: 100vw;
  padding: 10px;
`;

const TitleCss = css`
  margin: 10px 0px;
  font-size: 25px;
  padding: 10px;
  font-weight: 700;
  color: ${Color.PrimaryColor.PRIMARY_700};
`;

const ButtonWrapperCss = css`
  min-width: 1000px;
  max-width: 1000px;
`;

const ButtonCss = css`
  max-width: 400px;
  min-width: 150px;
  min-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ButtonInActiveCss = css`
  max-width: 400px;
  min-width: 150px;
  min-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: ${Color.GrayColor.GRAY_600};
`;

const ButtonLabelCss = css`
  max-width: 400px;
  min-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default Header;
