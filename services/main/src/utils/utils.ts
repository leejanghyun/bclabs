/**
 * 뮨자열을 hash code로 변환
 * @param str 문자열
 * @returns 숫자 hashCode값
 */
export const hashCode = (str: string): number => {
  const len = str.length;
  let hash = 0;

  if (!len) {
    return hash;
  }

  let i = 0;

  while (i < len) {
    hash = ((hash << 5) - hash + str.charCodeAt(i++)) | 0;
  }

  return hash;
};

/**
 * 객체에 해당 속성이 있는지 유무
 * @returns 객체에 해당 속성이 있는지 유무
 */
export const hasProperty = <K extends object>(obj: K, props: string): boolean => {
  return Object.prototype.hasOwnProperty.call(obj, props);
};

/**
 * UUID 생성
 * @returns UUID 값
 */
export const getUid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (str: string) {
    const random = (Math.random() * 16) | 0;
    const value = str == 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
};

/**
 * 문자인지 유무
 * @param value 값
 * @returns 문자인지 유무
 */
export const isStringValue = (value: unknown) => {
  return typeof value === 'string';
};

/**
 * 객체인지 유무
 * @param value 값
 * @returns 객체인지 유무
 */
export const isObjectValue = (value: unknown) => {
  return typeof value === 'object';
};

/**
 * 숫자 정규식 테스트
 * @param value 숫자 문자열
 * @returns 유효한 번호인지 유무
 */
export const isNumber = (value: unknown): boolean => {
  return typeof value === 'number' && isFinite(value);
};

/**
 * 주간 날짜 구하기
 * @returns 시간 Range
 */
export const getWeekRange = (now: Date) => {
  const nowDayOfWeek = now.getDay();
  const nowDay = now.getDate();
  const nowMonth = now.getMonth();
  let nowYear = now.getFullYear();
  nowYear += nowYear < 2000 ? 1900 : 0;

  const timeMin = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
  const timeMax = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek), 23, 59, 59, 999);

  return {
    timeMin,
    timeMax,
  };
};

/**
 * 지정된 날짜가 몇 주차인지 계산하여 반환합니다
 * @param dateFrom dateFrom 주차 계산을 위한 기준 날짜
 */
export const getWeekNumber = (dateFrom = new Date()) => {
  const currentDate = dateFrom.getDate();
  const startOfMonth = new Date(dateFrom.setDate(1));
  const weekDay = startOfMonth.getDay();

  return Math.floor((weekDay - 1 + currentDate) / 7) + 1;
};
