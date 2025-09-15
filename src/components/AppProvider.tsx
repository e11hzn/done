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
  createButtonClicked: boolean;
  editTodo?: Todo;
  locale: string;
  onCancel: () => void;
  setCreateButtonClicked: () => void;
  setEditTodo: (todo?: Todo) => void;
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
  const { onCancel, todos, setTodos } = useAppContext();
  return { onCancel, todos, setTodos };
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
  const [editTodo, setEditTodo] = useState<Todo | undefined>();
  const [createButtonClicked, setCreateButtonClicked] = useState(false);

  const updateLocale = (newLocale: string) => {
    setLocale(newLocale);
    setTranslations(getTranslations(newLocale));
    setClientCookieConfig({ locale: newLocale });
  };

  const updateTodos = (newTodos: Todo[]) => {
    setTodos(newTodos);
    setClientCookieConfig({ list: newTodos });
    setEditTodo(undefined);
    setCreateButtonClicked(false);
  };

  const updateCreateButtonClicked = () => {
    setCreateButtonClicked(!createButtonClicked);
  };

  const updateEditTodo = (todo: Todo | undefined) => {
    setCreateButtonClicked(false);
    setEditTodo(todo);
  };

  const onCancel = () => {
    setCreateButtonClicked(false);
    setEditTodo(undefined);
  };

  return (
    <AppContext.Provider
      value={{
        createButtonClicked,
        editTodo,
        locale,
        onCancel,
        setCreateButtonClicked: updateCreateButtonClicked,
        setEditTodo: updateEditTodo,
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
