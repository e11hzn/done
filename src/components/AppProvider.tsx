/* eslint-disable  @typescript-eslint/no-explicit-any */
'use client';

import {
  CookieStorageConfig,
  setClientCookieConfig,
} from '@/utils/cookieClient';
import { getTranslations } from '@/utils/i18n';
import { Todo } from '@/utils/types';
import { createContext, useContext, useState } from 'react';

type AppState = {
  locale: string;
  setLocale: (locale: string) => void;
  setTodos: (todos: Todo[]) => void;
  t: Record<string, any>;
  todos: Todo[];
};

const AppContext = createContext<AppState | null>(null);

export const useAppContext = () => useContext(AppContext) as AppState;
export const useTranslations = () => useAppContext().t;
export const useLocale = () => {
  const { locale, setLocale } = useAppContext();
  return { locale, setLocale };
};
export const useTodos = () => {
  const { todos, setTodos } = useAppContext();
  return { todos, setTodos };
};

type AppProviderProps = {
  children: React.ReactNode;
  cookieConfig: CookieStorageConfig;
};

export const AppProvider = ({ children, cookieConfig }: AppProviderProps) => {
  const { list, locale: appLocale } = cookieConfig;
  const [locale, setLocale] = useState(appLocale);
  const [translations, setTranslations] = useState(getTranslations(locale));
  const [todos, setTodos] = useState(list);

  const updateLocale = (newLocale: string) => {
    setLocale(newLocale);
    setTranslations(getTranslations(newLocale));
    setClientCookieConfig({ locale: newLocale });
  };

  const updateTodos = (newTodos: Todo[]) => {
    setTodos(newTodos);
    setClientCookieConfig({ list: newTodos });
  };

  return (
    <AppContext.Provider
      value={{
        locale,
        setLocale: updateLocale,
        setTodos: updateTodos,
        t: translations,
        todos,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
