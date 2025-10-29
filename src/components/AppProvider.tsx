'use client';

import { Provider } from 'react-redux';
import { useMemo } from 'react';
import type { CookieStorageConfig } from '@/utils/cookieClient';
import { createAppStore, type AppStore } from '@/store/store';

type AppProviderProps = {
  children: React.ReactNode;
  cookieConfig: CookieStorageConfig;
};

export const AppProvider = ({ children, cookieConfig }: AppProviderProps) => {
  const store: AppStore = useMemo(
    () => createAppStore(cookieConfig),
    [cookieConfig],
  );

  return <Provider store={store}>{children}</Provider>;
};

export { useAppDispatch, useAppSelector } from '@/store/hooks';
export {
  sortOrderValues,
  type SortOrder,
  getTodosCategories,
  toggleCreateButton,
  setEditTodo,
  setFilteredCategories,
  setSearch,
  setSortOrder,
  cancelEditing,
} from '@/store/appSlice';
export { setLocale, setTodos } from '@/store/actions';
