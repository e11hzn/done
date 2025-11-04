import type { ReactElement } from 'react';
import type { RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { appReducer, buildInitialState, type AppState } from '@/store/appSlice';

const baseState = buildInitialState({ list: [], locale: 'en-US' });

type RenderPreloadedState = {
  app?: Partial<AppState>;
};

export const renderWithProvider = (
  ui: ReactElement,
  preloadedState?: RenderPreloadedState,
) => {
  const store = configureStore({
    reducer: {
      app: appReducer,
    },
    preloadedState: {
      app: {
        ...baseState,
        ...preloadedState?.app,
      },
    },
  });

  const renderResult = render(
    <Provider store={store}>{ui}</Provider>,
  ) as RenderResult & {
    rerender: (ui: ReactElement) => void;
  };

  return {
    ...renderResult,
    store,
    rerender: (nextUi: ReactElement) =>
      renderResult.rerender(<Provider store={store}>{nextUi}</Provider>),
  };
};
