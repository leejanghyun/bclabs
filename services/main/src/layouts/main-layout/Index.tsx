import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';

// Components
import { Gnb, Box } from 'ui';

/**
 * Main Layout Components
 * @param param 컴포넌트 Property
 * @returns Main Layout Components
 */
const MainLayout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <Box styles={WrapperCss}>
      <Gnb title='BC' subTitle='labs' />
      {/** Content 영역 */}
      <Box styles={ContentCss}>{children}</Box>
    </Box>
  );
};

// Wrapper Css
const WrapperCss = css`
  height: 100%;
  width: 100%;
`;

// Content Css
const ContentCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5vh;
  height: 100%;
  width: 100%;
`;

export default MainLayout;
