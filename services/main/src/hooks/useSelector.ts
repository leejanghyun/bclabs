import { useSelector, shallowEqual } from 'react-redux';

// Store
import { RootState } from '@/store';

/**
 * Selector Hook
 * @param callback selector Callback 함수
 * @returns selector 함수 훅
 */
export default function useSelectorHook<T>(callback: (state: RootState) => T): T {
  return useSelector(callback, shallowEqual);
}
