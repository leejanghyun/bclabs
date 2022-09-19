import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Store
import { RootState } from '@/store';

// Api
import { httpClient } from '@/api';

/** Spinner 보여주기/숨김 */
interface ShowSpinnerActionPayload {
  isShowSpinner: boolean;
}

/** Error 상세 */
export type ErrorDetail = {
  errorMessage: string;
  errorCode?: string;
  errorCause?: string;
};

/** Error 데이터 */
export type ErrorData = {
  message: string;
  detail?: ErrorDetail;
};

/** 상태 타입 */
type StateType = {
  isShowSpinner: boolean;
  errorAlert: ErrorData | null;
  accessToken: string;
};

const name = 'global';

const initialState: StateType = {
  isShowSpinner: false,
  errorAlert: null,
  accessToken: '',
};

/** Alert 보여주기/숨김 */
type ShowAlertDialogPayload = ErrorData;

/** Reducer 정의 */
const reducers = {
  /**
   * spinner 보여 주기
   */
  showSpinner: (state: StateType, action: PayloadAction<ShowSpinnerActionPayload>) => {
    const { isShowSpinner } = action.payload;

    state.isShowSpinner = isShowSpinner;
  },

  /** Alert 다이얼로그 보여 주기 */
  showAlertDialog: (state: StateType, action: PayloadAction<ShowAlertDialogPayload>) => {
    state.errorAlert = action.payload;
  },

  /** Alert 다이얼로그 숨기기 */
  hideAlertDialog: (state: StateType) => {
    state.errorAlert = null;
  },

  /**
   * 모든 API request 취소
   */
  abortAllPending: () => {
    httpClient.removeAllPending();
  },

  /** Access Token 설정 */
  setAccessToken: (state: StateType, action: PayloadAction<string>) => {
    state.accessToken = action.payload;
  },
};

/** Thunk 정의 */
const asyncThunk = {};

/* CreateSlice 정의 */
export const globalSlice = createSlice({
  name,
  initialState,
  reducers,
});

// Selector 정의
export const isShowSpinner = (state: RootState) => state.global.isShowSpinner;
export const getAlertMessage = (state: RootState) => state.global.errorAlert;
export const getAccessToken = (state: RootState) => state.global.accessToken;

// Thunk 정의
export const {} = asyncThunk;

// Action 정의
export const { showSpinner, abortAllPending, showAlertDialog, hideAlertDialog, setAccessToken } =
  globalSlice.actions;

export default globalSlice.reducer;
