import { memo, useState } from 'react';
import { css } from '@emotion/react';

// Components
import { Box, Color, Modal } from 'ui';

/** 컴포넌트 Property */
type AlertProps = {
  message: string;
};

/**
 * Alert 컴포넌트
 * @param props 컴포넌트 Property
 * @returns Alert 컴포넌트
 */
export const Alert = memo(({ message }: AlertProps) => {
  const [isShow, setShow] = useState<boolean>(false);

  /** 알림 닫기 */
  const handleClosePopup = () => {
    setShow(!isShow);
  };

  return (
    <Box>
      <Modal visible={isShow} onClose={handleClosePopup}>
        <Box styles={MessageCss}>{message}</Box>
      </Modal>
    </Box>
  );
});

/** Message Css */
const MessageCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${Color.PrimaryColor.PRIMARY_800};
`;
