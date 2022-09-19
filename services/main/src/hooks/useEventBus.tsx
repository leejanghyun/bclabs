import { eventBus } from '@/utils/EventBus';
import { useEffect, useState } from 'react';

/**
 * 이벤트 버스 훅
 */
const useEventBus = () => {
  const {
    publish: publishEvent,
    subscribe: eventSubscribe,
    unsubscribe,
    unsubscribeEvent,
  } = eventBus;
  const [eventIds, setEventIds] = useState<string[]>([]);

  /** 초기화 */
  useEffect(() => {
    return () => {
      for (const id of eventIds) {
        unsubscribe(id);
      }
    };
  }, []);

  /**
   * 구독 이벤트
   * @param event 이벤트 명
   * @param callback  이벤트 콜백
   * @returns 이벤트 아이디
   */
  const subscribeEvent = (event: string, callback: CallbackFunction) => {
    const id = eventSubscribe(event, callback);

    setEventIds([...eventIds, id]);

    return id;
  };

  return {
    publishEvent,
    subscribeEvent,
    unsubscribe,
    unsubscribeEvent,
  };
};

export default useEventBus;
