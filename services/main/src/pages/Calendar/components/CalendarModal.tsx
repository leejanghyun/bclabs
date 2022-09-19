import { css } from '@emotion/react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useCallback, useRef } from 'react';

// Selector
import { useSelector } from '@/hooks';

// Store
import { getSelectedCalenderId, requestCreateCalendar, AppThunkDispatch } from '@/store';

// Components
import { Box, Button, Color, Modal, TextInput, TextInputHandler } from 'ui';
import { CalendarCreateDate } from './Content';

/**
 * Calendar 리스트
 */
type CalendarContent = {
  description: string;
  summary: string;
  kind: string;
};

/**
 * 컴포넌트 Property
 */
type Props = {
  createDate?: CalendarCreateDate;
  isEdit?: boolean;
  calendarContent: CalendarContent[];
  showModal: boolean;
  onClose: () => void;
};

/**
 * 캘린더 조회/생성 모달 컴포넌트
 * @param props 컴포넌트 Property
 * @returns 캘린더 조회/생성 모달 컴포넌트
 */
const CalendarModal = ({ createDate, isEdit, calendarContent, showModal, onClose }: Props) => {
  const dispatch = useDispatch<AppThunkDispatch>();
  // Selector
  const id = useSelector(getSelectedCalenderId);
  // Ref
  const summaryInputRef = useRef<TextInputHandler>();
  const descriptionInputRef = useRef<TextInputHandler>();

  /**
   * 달력 생성
   */
  const handleCreateCalendar = useCallback(async () => {
    const { current: summary } = summaryInputRef;
    const { current: description } = descriptionInputRef;

    if (!createDate) {
      return;
    }

    const { year, month, date } = createDate;
    const newDate = new Date(year, month - 1, date);
    const dateObject = { dateTime: newDate.toISOString(), timeZone: 'Asia/Seoul' };

    const data = {
      id,
      params: {
        start: dateObject,
        end: dateObject,
        summary: summary?.getValue() as string,
        description: description?.getValue() as string,
      },
    };

    const { isError } = unwrapResult(await dispatch(requestCreateCalendar(data)));

    alert(isError ? '실패' : '성공');

    if (isError) {
      throw new Error('user info request error');
    }

    summary?.resetValue();
    description?.resetValue();
    onClose();
  }, [id, createDate, dispatch, onClose]);

  return (
    <Modal visible={showModal} onClose={() => onClose()}>
      <Box styles={InnerCss}>
        {!isEdit ? (
          calendarContent.map((item, idx) => {
            const { summary, description, kind } = item;

            return (
              <Box styles={CalendarWrapper} key={idx}>
                {/** Summary */}
                <Box styles={SummaryCss}>
                  <Box styles={SummaryTitleCss}>Summary</Box>
                  <Box>{summary || '없음'}</Box>
                </Box>

                {/** 설명 */}
                <Box styles={DescriptionKindCss}>
                  <Box styles={DescriptionKindTitleCss}>Description </Box>
                  <Box>{description || '없음'}</Box>
                </Box>

                {/** 종류 */}
                <Box styles={DescriptionKindCss}>
                  <Box styles={DescriptionKindTitleCss}>Kind </Box>
                  <Box>{kind || '없음'}</Box>
                </Box>
              </Box>
            );
          })
        ) : (
          <Box>
            {/** 일정 생성 */}
            <Box styles={CalendarWrapper}>
              {/** Summary */}
              <Box styles={SummaryCss}>
                <Box styles={SummaryTitleCss}>Summary</Box>
                <Box>
                  <TextInput ref={summaryInputRef} styles={InputCss} />
                </Box>
              </Box>

              {/** 설명 */}
              <Box styles={DescriptionKindCss}>
                <Box styles={DescriptionKindTitleCss}>Description </Box>
                <Box>
                  <TextInput ref={descriptionInputRef} styles={InputCss} />
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      {/** Bottom 영역 */}
      <Box styles={BottomCss}>
        {isEdit && <Button onClick={handleCreateCalendar}>생성</Button>}
        <Button onClick={() => onClose()}>닫기</Button>
      </Box>
    </Modal>
  );
};

/** Inner Css */
const InnerCss = css`
  position: relative;
  justify-content: center;
  height: 12vh;
  width: 100%;
  overflow: auto;
`;

const CalendarWrapper = css`
  margin: 5px;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid ${Color.GrayColor.GRAY_300};
`;

/** Summary Css */
const SummaryCss = css`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 500;
  height: 8vh;
`;

const SummaryTitleCss = css`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  margin-right: 10px;
  color: ${Color.PrimaryColor.PRIMARY_800};
`;

const DescriptionKindCss = css`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 500;
  height: 8vh;
  color: ${Color.GrayColor.GRAY_700};
`;

const DescriptionKindTitleCss = css`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  margin-right: 10px;
  color: ${Color.GrayColor.GRAY_900};
`;

/** Button Css */
const BottomCss = css`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin-bottom: 15px;
`;

// Input Css
const InputCss = css`
  width: 100%;
  color: ${Color.GrayColor.GRAY_900};
`;

export default CalendarModal;
