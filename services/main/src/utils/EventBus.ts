import { getUid } from '.';

/**
 * Event Bus 구현
 */
const EventBus = () => {
  let events = {};

  /**
   * Event 초기화
   */
  const clear = () => {
    if (Object.keys(events).length) {
      events = {};
    }
  };

  /**
   * 이벤트 Publish 함수
   * @param event custom 이벤트 명
   * @param data 전달 데이터
   */
  const publish = (event: string, data?: unknown) => {
    const eventPool = events[event] as object;

    if (!eventPool) {
      return;
    }

    for (const func in eventPool) {
      eventPool[func](data);
    }
  };

  /**
   * 이벤트 Subscribe 함수
   * @param event custom 이벤트 명
   * @param func 실행할 함수
   */
  const subscribe = (event: string, func: CallbackFunction) => {
    if (!events[event]) {
      events[event] = {};
    }

    let hasSameId = false;
    let uniqueId = '';

    while (!hasSameId) {
      uniqueId = `${getUid()}`;
      const eventObj = events[event];
      hasSameId = true;

      if (Object.keys(eventObj).length) {
        for (const id in eventObj) {
          if (id === uniqueId) {
            hasSameId = false;
            break;
          }
        }
      }
    }

    events[event][uniqueId] = func;
    return uniqueId;
  };

  /**
   * unsubscribe 함수
   * @param id id에 해당하는 event 삭제
   */
  const unsubscribe = (id?: string) => {
    for (const event in events) {
      if (events[event][id]) {
        delete events[event][id];

        if (!Object.keys(events[event]).length) {
          delete events[event];
        }
        break;
      }
    }
  };

  /**
   * 이벤트 함수로 unsubscribe 함수
   * @param eventName 이벤트명에 해당하는 event 삭제
   */
  const unsubscribeEvent = (eventName: string) => {
    delete events[eventName];
  };

  return {
    clear,
    publish,
    subscribe,
    unsubscribe,
    unsubscribeEvent,
  };
};

export const eventBus = EventBus();
