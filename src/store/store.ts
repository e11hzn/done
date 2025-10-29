import { configureStore } from '@reduxjs/toolkit';
import type { CookieStorageConfig } from '@/utils/cookieClient';
import { appReducer, buildInitialState } from './appSlice';

export const createAppStore = (cookieConfig: CookieStorageConfig) =>
  configureStore({
    reducer: {
      app: appReducer,
    },
    preloadedState: {
      app: buildInitialState(cookieConfig),
    },
  });

export type AppStore = ReturnType<typeof createAppStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
