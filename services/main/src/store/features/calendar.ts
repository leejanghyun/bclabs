import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Api
import {
  httpClient,
  getCalendarListConfig,
  getCalendarConfig,
  CalendarIdRequestFields,
  CalendarInsertRequestFields,
  createCalendarConfig,
  CalendarListResponseFields,
  CalendarResponseFields,
  CalendarItem as CalendarSingleItem,
} from '@/api/';

// Store
import { RootState } from '..';

const name = 'calendar';

/**
 * Calendar 아이템
 */
type CalendarItem = {
  description: string;
  summary: string;
  startDateTime: string;
  endDateTime: string;
  kind: string;
};

/** Global State 값 */
type StateType = { calendarId: string; currentCalendarItems: CalendarItem[] };

const initialState: StateType = { calendarId: '', currentCalendarItems: [] };

const reducers = {
  /**
   * 달력 선택
   */
  setCalendar: (state: StateType, action: PayloadAction<string>) => {
    state.calendarId = action.payload;
  },
};

// Thunk 정의
const asyncThunk = {
  /** Calendar List 요청 */
  requestCalendarList: createAsyncThunk(
    `${name}/requestCalendarList`,
    async (): Promise<CommonResponseResult<CalendarListResponseFields>> => {
      const response = await httpClient.request<CalendarListResponseFields>(
        getCalendarListConfig()
      );
      const isError = response instanceof Error;
      const { data } = response;

      return { isError, ...data };
    }
  ),

  /** Calendar 요청 */
  requestCalendar: createAsyncThunk(
    `${name}/requestCalendar`,
    async (
      data: CalendarIdRequestFields
    ): Promise<CommonResponseResult<CalendarResponseFields>> => {
      const { id, params } = data;
      const response = await httpClient.request<CalendarResponseFields>(
        getCalendarConfig(id, params)
      );
      const isError = response instanceof Error;
      const { data: resData } = response;

      return { isError, ...resData };
    }
  ),

  /** Calendar 생성 요청 */
  requestCreateCalendar: createAsyncThunk(
    `${name}/requestCreateCalendar`,
    async (
      data: CalendarInsertRequestFields
    ): Promise<CommonResponseResult<CalendarSingleItem>> => {
      const { id, params } = data;
      const response = await httpClient.request<CalendarSingleItem>(
        createCalendarConfig(id, params)
      );
      const isError = response instanceof Error;
      const { data: resData } = response;

      return { isError, ...resData };
    }
  ),
};

/* CreateSlice 정의 */
export const calendarSlice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers: (builder) => {
    const { requestCalendar } = asyncThunk;

    builder
      .addCase(requestCalendar.fulfilled, (state, action) => {
        const { isError, ...rest } = action.payload;

        if (isError) {
          return;
        }

        const { items } = rest as CalendarResponseFields;

        state.currentCalendarItems = items.map((item) => {
          const { description, summary, kind, start, end } = item;
          const { dateTime: startDateTime } = start;
          const { dateTime: endDateTime } = end;

          return { description, summary, kind, startDateTime, endDateTime };
        });
      })
      .addCase(requestCreateCalendar.fulfilled, (state, action) => {
        const { isError, ...rest } = action.payload;

        if (isError) {
          return;
        }

        const { summary, description, kind, start, end } = rest as CalendarSingleItem;

        state.currentCalendarItems = [
          ...state.currentCalendarItems,
          {
            summary,
            description,
            kind,
            startDateTime: start?.dateTime,
            endDateTime: end?.dateTime,
          },
        ];
      });
  },
});

// Thunk 정의
export const { requestCalendarList, requestCalendar, requestCreateCalendar } = asyncThunk;

// Action 정의
export const { setCalendar } = calendarSlice.actions;

// Selector
export const getSelectedCalenderId = (state: RootState) => state.calendar.calendarId;
export const getCurrentCalendarItems = (state: RootState) => state.calendar.currentCalendarItems;

export default calendarSlice.reducer;
