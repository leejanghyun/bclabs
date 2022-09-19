import { css } from '@emotion/react';
import { useEffect } from 'react';

// Api
import { getLoginUri } from '@/api/oauth';

// Components
import { Box } from 'ui';
import Header from './components/Header';
import Content from './components/Content';

// Hooks
import { useSelector } from '@/hooks';

// Store
import { getAccessToken } from '@/store';

/**
 * 캘린더 Page 컴포넌트
 * @returns 캘린더 Page 컴포넌트
 */
const Calendar = () => {
  const accessToken = useSelector(getAccessToken);

  /**
   * 초기화
   */
  useEffect(() => {
    if (accessToken) {
      return;
    }

    window.open(getLoginUri(), '_self'); // 구글 로그인 페이지 열기
  }, [accessToken]);

  return (
    <Box styles={WrapperCss}>
      <Header></Header>
      <Content></Content>
    </Box>
  );
};

const WrapperCss = css`
  height: 100%;
  width: 100%;
`;

export default Calendar;
