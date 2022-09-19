import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
  ThunkDispatch,
  combineReducers,
} from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { useDispatch } from 'react-redux';
import calendar from '@/store/features/calendar';
import global from '@/store/features/global';

// Store
const reducer = combineReducers({ global, calendar });
const middleware = [...getDefaultMiddleware(), thunkMiddleware]; // middleware

// store 객체
const store = configureStore({
  reducer,
  middleware,
});

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type ReducerType = ReturnType<typeof reducer>;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppThunkDispatch = ThunkDispatch<RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export * from '@/store/features/calendar';
export * from '@/store/features/global';

export default store;
