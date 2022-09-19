import { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { css, Global } from '@emotion/react';

// Store
import store from '@/store';

// Routes
import Routes from '@/routes';

// Components
import Spinner from '@/components/Loader/Spinner';
import ErrorAlert from '@/components/Alert/ErrorAlert';
import { GlobalStyle, Box } from 'ui';

/**
 * App Wrapper
 */
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <Global styles={GlobalStyle} />
      <App>
        {/** Route 영역 */}
        <Routes />
        {/** Api 통신 시 Spinner, Alert */}
        <Spinner />
        <ErrorAlert />
      </App>
    </Provider>
  );
};

/**
 * App 컴포넌트
 * @param props App 컴포넌트 property
 * @returns App 컴포넌트
 */
const App = ({ children }: PropsWithChildren<unknown>): ReactElement => {
  return <Box css={WrapperCss}>{children}</Box>;
};

const WrapperCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export default AppWrapper;
