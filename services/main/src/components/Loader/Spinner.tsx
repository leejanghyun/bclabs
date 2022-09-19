// Hooks
import { useSelector } from '@/hooks/';

// Store
import { isShowSpinner } from '@/store/';

// Component
import { Loader } from 'ui';

/**
 * Spinner Component
 * @returns Spinner Component
 */
const Spinner = () => {
  const isShow = useSelector(isShowSpinner);

  return <>{isShow && <Loader />}</>;
};

export default Spinner;
