import { baseURL, CommonRequestConfig, Method } from '../common';

// 달력 리스트
export const calendarList = '/v3/users/me/calendarList';

export const calendar = '/v3/calendars';

/**
 * Calendar 리트 요청 파라미터
 */
export type CalendarListParams = {
  maxResults: number;
  timeMax: string;
  timeMin: string;
};

/**
 * Date Format
 */
export type DateFormat = {
  dateTime: string;
  timeZone: string;
};

/**
 * 일정 삽입 Query Parameter
 */
export type CalendarInsertParams = {
  start: DateFormat;
  end: DateFormat;
  summary: string;
  description: string;
};

/**
 * 일정 삽입 요청 필드
 */
export type CalendarInsertRequestFields = {
  id: string;
  params: CalendarInsertParams;
};

/**
 * 달력 요청 필드
 */
export type CalendarIdRequestFields = {
  id: string;
  params: CalendarListParams;
};

/**
 * 일정 리스트 응답 필드
 */
export type CalendarListResponseFields = {
  kind: string;
  etag: string;
  nextSyncToken: string;
  items: CalenderListItem[];
};

/**
 * 일정 응답 필드
 */
export type CalendarResponseFields = {
  kind: string;
  etag: string;
  summary: string;
  updated: string;
  timeZone: string;
  accessRole: string;
  nextSyncToken: string;
  items: CalendarItem[];
};

/**
 * 접근 권한
 */
export const enum AccessRole {
  Reader = 'reader',
  Owner = 'owner',
}

/**
 * 캘린더 리스트 아이템
 */
export type CalenderListItem = {
  kind: string;
  etag: string;
  id: string;
  summary: string;
  description: string;
  timeZone: string;
  selected: true;
  accessRole: AccessRole;
};

/**
 * 캘린더 아이템
 */
export type CalendarItem = {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description: string;
  location: string;
  start: DateFormat;
  end: DateFormat;
};

/**
 * 달력 리스트 config 객체 반환
 * @returns axios config 객체
 */
export const getCalendarListConfig = (): CommonRequestConfig => {
  return {
    baseURL,
    url: calendarList,
    method: Method.Get,
  };
};

/**
 * 달력 config 객체 반환
 * @param params query parameter
 * @returns axios config 객체
 */
export const getCalendarConfig = (id: string, params: CalendarListParams): CommonRequestConfig => {
  return {
    baseURL,
    url: `${calendar}/${id}/events`,
    method: Method.Get,
    params,
  };
};

/**
 * 달력 생성 config 객체 반환
 * @param params query parameter
 * @returns axios config 객체
 */
export const createCalendarConfig = (
  id: string,
  data: CalendarInsertParams
): CommonRequestConfig => {
  return {
    baseURL,
    url: `${calendar}/${id}/events`,
    method: Method.Post,
    data,
  };
};
