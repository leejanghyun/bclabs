import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { css } from '@emotion/react';

// Components
import { Box, Button, Color, Modal } from 'ui';

// Hooks
import useSelectorHook from '@/hooks/useSelector';

// Store
import { getAlertMessage, hideAlertDialog } from '@/store/';

/**
 * 에러 알림 컴포넌트
 * @returns 에러 알림 컴포넌트
 */
const ErrorAlert = () => {
  const dispatch = useDispatch();
  const data = useSelectorHook(getAlertMessage);
  const { message } = { ...data };

  /** 알림 닫기 */
  const handleClosePopup = () => {
    dispatch(hideAlertDialog());
  };

  return (
    <Box>
      <Modal visible={!!data} onClose={handleClosePopup}>
        <Box styles={InnerCss}>
          <Box styles={MessageCss}>{message}</Box>
        </Box>

        {/** Bottom 영역 */}
        <Box styles={BottomCss}>
          <Button onClick={handleClosePopup}>확인</Button>
        </Box>
      </Modal>
    </Box>
  );
};

/** Inner Css */
const InnerCss = css`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

/** Message Css */
const MessageCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 500;
  color: ${Color.PrimaryColor.PRIMARY_800};
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

export default memo(ErrorAlert);
