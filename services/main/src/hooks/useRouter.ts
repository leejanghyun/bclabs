import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Store
import { abortAllPending } from '@/store/';

/** Router 이벤트 콜백 */
type HookCallback = {
  /** 진입 callback */
  onEnter: () => void;
  /** 이탈 callback */
  onLeave: () => void;
  /** 다음 이동 전 callback */
  onNext?: () => void;
};

/**
 * Router Hook Event 정의
 * @param callback onEnter/onLeave 훅 정의
 * @returns history 객체
 */
const useRouterHook = (callback: Partial<HookCallback> = {}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const { onEnter, onLeave, onNext } = callback;

    onEnter?.();

    const unlisten = history.listen(() => {
      onNext?.();
    });

    return () => {
      dispatch(abortAllPending()); // 기존 Pending Api 취소
      onLeave?.();
      unlisten();
    };
  }, [history, callback, dispatch]);

  return history;
};

export default useRouterHook;
