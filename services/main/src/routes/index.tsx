import { Suspense, lazy } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

// Component
import PrivateRoute from './PrivateRoute';
import { Loader } from 'ui';

// Layout Components
const MainLayout = lazy(() => import('@/layouts/main-layout/Index'));

// Page Components
const Calendar = lazy(() => import('@/pages/Calendar'));
const LoginCallback = lazy(() => import('@/pages/LoginCallback'));

const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        {/** Main Layout */}
        <MainLayout>
          <Switch>
            {/** (캘린더/로그인) 페이지 */}
            <PrivateRoute exact path='/' component={<Calendar />} />

            {/** 로그인 Callback 페이지  */}
            <PrivateRoute exact path='/callback' component={<LoginCallback />} />
          </Switch>
        </MainLayout>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
