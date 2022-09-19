import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestHeaders } from 'axios';

// Api
import { CommonRequestConfig, getDefaultConfig, StatusCode } from '@/api/';

// Constants
import { EventName } from '@/constants/';

// Utils
import { hashCode, hasProperty, isObjectValue, isStringValue } from '@/utils';

// Store
import store, { ErrorDetail, showAlertDialog, showSpinner } from '@/store/';

/* NetWork 에러 메시지 */
export const enum NetworkErrorMessage {
  NETWORK_OFFLINE = '네트워크 연결상태를 확인한 뒤, 다시 시도해주세요.',
  CONNECTION_REFUSED = '서버와 통신이 원할하지 않습니다.',
}

/**
 * AxiosApi 클래스 객체 정의
 */
export class AxiosApi {
  private static thisInstance: AxiosApi; // singleton instance
  private instance: AxiosInstance;
  private pending: Map<number, CommonRequestConfig>;
  private isOnline = true;

  /**
   * 생성자 함수
   * @param config 설정값 객체
   */
  constructor(config?: CommonRequestConfig) {
    this.instance = axios.create(config || getDefaultConfig());
    this.pending = new Map();
    this.isOnline = window.navigator.onLine;

    const { interceptors } = this.instance;

    interceptors.request.use(this.requestInterceptor.bind(this), Promise.reject);
    interceptors.response.use(
      this.responseInterceptor.bind(this),
      this.responseErrorHandler.bind(this)
    );

    this.initEventListenr();
  }

  /**
   * Axios 객체 반환
   * @returns Axios 객체
   */
  public static getInstance(): AxiosApi {
    if (!this.thisInstance) {
      this.thisInstance = new AxiosApi();
    }

    return this.thisInstance;
  }

  /** Event Listenr 등록 */
  private initEventListenr() {
    window.addEventListener(EventName.Online, this.handleConnectionChange.bind(this));
    window.addEventListener(EventName.OffLine, this.handleConnectionChange.bind(this));
  }

  /**
   * Request 인터셉터
   * @param config 설정값 객체
   * @returns config 객체
   */
  private async requestInterceptor(config: CommonRequestConfig): Promise<CommonRequestConfig> {
    const hashCode = this.hashing(config);

    if (this.pending.has(hashCode)) {
      config.cancelToken = new axios.CancelToken((canceler) => canceler('Cancel duplicated'));
      return config;
    }

    const { doNotShowSpinner, authRequired } = config;

    config.cancelToken = new axios.CancelToken((canceler) => (config.canceler = canceler));

    if (!doNotShowSpinner) {
      store.dispatch(showSpinner({ isShowSpinner: true })); // Spinner 노출 유무
    }

    if (authRequired) {
      this.addAccessToken(config); // access token 추가
    }

    this.addPending(config);

    return config;
  }

  /**
   * Access token을 헤더에 설정
   * @param config axios config 객체
   */
  private async addAccessToken(config: CommonRequestConfig) {
    const { headers } = config;
    const { accessToken } = store.getState().global;

    if (!accessToken) {
      return;
    }

    (headers as AxiosRequestHeaders).Authorization = `Bearer ${accessToken}`;
  }

  /** 모든 Request 취소 */
  public removeAllPending() {
    const pending = this.pending;
    const arr = Array.from(pending.keys());

    for (const hashCode of arr) {
      const config = pending.get(hashCode) as CommonRequestConfig;

      if (config.canceler && !axios.isCancel(config)) {
        config.canceler('abort request');
      }

      this.removePending(config);
    }
  }

  /**
   * Response 인터셉터
   * @param response 응답 객체
   * @returns 응답 객체
   */
  private async responseInterceptor(response: AxiosResponse): Promise<AxiosResponse> {
    const { config } = response;
    const { doNotShowSpinner, skipAlert } = config as CommonRequestConfig;

    this.removePending(config);

    if (!doNotShowSpinner) {
      store.dispatch(showSpinner({ isShowSpinner: false }));
    }

    if (!skipAlert) {
      const { data } = response;

      if (data?.errorCode) {
        store.dispatch(
          showAlertDialog({ message: '서버 오류입니다. 관리자에게 문의해주세요.', detail: data })
        );
      }
    }

    return response;
  }

  /**
   * Request 요청
   * @param config 요청 설정 객체
   * @returns 응답 객체
   */
  public request<T>(config: CommonRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.request<T>(config);
  }

  /**
   * 네트워크 에러 객체 생성
   * @param arg 에러 객체 또는 메시지
   * @returns 응답 객체
   */
  private createError(arg?: string | Error): Error {
    const ret = new Error();

    if (arg instanceof Error) {
      const { name, stack } = arg;
      const { response, request } = { ...arg } as AxiosError;
      const { data } = response as AxiosResponse;

      if (data?.errorCode) {
        const [errorKey, errorMessage] = data.errorCause.split(':');

        ret.message = errorMessage || errorKey;
      } else if (!this.isOnline && request) {
        ret.message = NetworkErrorMessage.NETWORK_OFFLINE;
      } else if (!response && (this.isOnline || !request)) {
        ret.message = NetworkErrorMessage.CONNECTION_REFUSED;
      } else {
        ret.message = '[서버 오류] 관리자에게 문의해주세요.';
      }

      ret.name = name;
      ret.stack = stack;
    } else if (isStringValue(arg)) {
      ret.name = arg as string;
    }

    return ret;
  }

  /**
   * CancelToken을 위한 request configuration Hash값 반환
   * @param config axios config 객체
   * @returns hash code 문자열
   */
  private hashing(config: CommonRequestConfig): number {
    const { url, method, data, params, headers } = config;
    const hdr: Record<string, string | number | boolean> = {};
    const exclude = ['content-type', 'Accept', 'Authorization', 'date'];

    for (const key in headers) {
      if (
        !isObjectValue(headers[key]) &&
        hasProperty(headers, key) &&
        !exclude.some((exc) => exc === key)
      ) {
        hdr[key] = headers[key];
      }
    }

    const converter = (origin: object): unknown => {
      if (!origin) {
        return '';
      }

      if (isStringValue(origin)) {
        return origin;
      }

      if (origin instanceof FormData) {
        const ret: Record<string, FormDataEntryValue> = {};

        origin.forEach((value, key) => {
          ret[key] = value;
        });

        return JSON.stringify(ret);
      }

      if (isObjectValue(origin)) {
        return JSON.stringify(origin);
      }

      return '';
    };

    let key = (url || '') + (method || '');

    key += converter(params);
    key += converter(data);
    return hashCode(key);
  }

  /**
   * request 요청 설정 객체 저장
   * - Cancel Token을 위함
   * @param config 요청 설정값 객체
   */
  private addPending(config: CommonRequestConfig): void {
    const key = this.hashing(config);

    if (!this.pending.has(key)) {
      this.pending.set(key, config);
    }
  }

  /**
   * request 요청 설정 객체 제거
   * - Cancel Token을 위함
   * @param config 요청 설정값 객체
   */
  private removePending(config: CommonRequestConfig): void {
    const key = this.hashing(config);

    this.pending.delete(key);
  }

  /**
   * 응답 에러시 인터셉터 구현부
   * @param error 에러 객체
   * @returns 에러 객체
   */
  private async responseErrorHandler(error: AxiosError) {
    const config = error.config as CommonRequestConfig;
    const { request, response } = error;

    if (!config || axios.isCancel(error)) {
      return error;
    }

    const { doNotShowSpinner, skipAlert } = config;

    this.removePending(config);

    if (!doNotShowSpinner) {
      store.dispatch(showSpinner({ isShowSpinner: false }));
    }

    const retErr = this.createError(error);
    const { status } = response as AxiosResponse;

    if (status === StatusCode.AuthRqeuired) {
    }

    if (!this.isOnline && request) {
      retErr.message = NetworkErrorMessage.NETWORK_OFFLINE;
    } else if (!response && (this.isOnline || !error.request)) {
      retErr.message = NetworkErrorMessage.CONNECTION_REFUSED;
    }

    if (!skipAlert) {
      const { data } = response as AxiosResponse;
      let detail: ErrorDetail | undefined;

      if (data?.errorCode) {
        detail = data;
      } else {
        detail = { errorMessage: response?.statusText || '', errorCode: `${response?.status}` };
      }

      const { message } = { ...retErr };

      store.dispatch(showAlertDialog({ message, detail }));
    }

    return retErr;
  }

  /**
   *
   * 네트워크 상태값 체크
   * @param event 이벤트 객체
   */
  private handleConnectionChange(event: Event): void {
    const { type: eventType } = event;
    const isOnline = eventType === EventName.Online;
    this.isOnline = isOnline;

    if (!isOnline && eventType !== EventName.OffLine) {
      throw new Error('unknown Axios Event');
    }

    if (!isOnline) {
      store.dispatch(showAlertDialog({ message: NetworkErrorMessage.NETWORK_OFFLINE }));
    }
  }
}

export const httpClient = AxiosApi.getInstance();
