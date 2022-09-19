import { Route } from 'react-router-dom';

/** 컴포넌트 Property */
type Props = {
  path: string;
  component: JSX.Element;
  [k: string]: unknown;
};

/**
 * 라우터 컴포넌트
 * @param props 컴포넌트 Property
 * @returns 라우터 컴포넌트
 */
const PrivateRoute = ({ component: Component, path, ...rest }: Props) => {
  return <Route path={path} {...rest} render={() => Component} />;
};

export default PrivateRoute;
