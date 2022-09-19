import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

export const baseURL = 'http://localhost:8080';

/** 공통 요청 헤더 */
export interface CommonRequestHeader {
  'Content-Type': string;
  Accept: string;
  Authorization: string;
}

/** 공통 요청 Config 설정 타입 */
export interface CommonRequestConfig extends AxiosRequestConfig {
  headers?: AxiosRequestHeaders;
  doNotShowSpinner?: boolean; // spinner 노출 유무
  skipAlert?: boolean; // error 메시지 창 띄우는지 유무
  authRequired?: boolean; // Access Token 필요 유무
  canceler?: (message?: string) => void;
}

/** Status Code 값 */
export enum StatusCode {
  AuthRqeuired = 401,
  Success = 200,
  MultipleChoices = 300,
}

/** Rest Api Method */
export const enum Method {
  Post = 'post',
  Get = 'get',
  Delete = 'delete',
  Put = 'put',
  Patch = 'patch',
}

/** 응답 코드 값 */
export enum CodeType {
  SUCCESS = 'SUCCESS',
  NO_DATA = 'NO_DATA',
}

/** 공통 응답 타입 */
export type CommonResponse = {
  code: CodeType;
  detail: string;
};

const MAX_TIMEOUT = 6000; // Timeout 정책 (Max:15초)

/**
 * Default Config 설정 객체 반환
 * @returns Default Config 설정 객체 반환
 */
export const getDefaultConfig = (): CommonRequestConfig => {
  return {
    headers: {
      Accept: 'application/json',
    },
    baseURL,
    timeout: MAX_TIMEOUT,
    doNotShowSpinner: false,
    skipAlert: false,
    authRequired: true,
    validateStatus: function (status) {
      return StatusCode.Success <= status && status < StatusCode.MultipleChoices;
    },
  };
};
