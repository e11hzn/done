/* eslint-disable  @typescript-eslint/no-explicit-any */
'use client';

import {
  CookieStorageConfig,
  setClientCookieConfig,
} from '@/utils/cookieClient';
import { getTranslations } from '@/utils/i18n';
import { Todo } from '@/utils/types';
import { createContext, useContext, useRef, useState } from 'react';

type AppState = {
  categories: Todo['categories'];
  createButtonClicked: boolean;
  editTodo?: Todo;
  filteredCategories: Todo['categories'];
  locale: string;
  onCancel: () => void;
  setCreateButtonClicked: () => void;
  setEditTodo: (todo?: Todo) => void;
  setFilteredCategories: (filtered: Todo['categories']) => void;
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
export const useFilteredCategories = () => {
  const { categories, filteredCategories, setFilteredCategories } =
    useAppContext();
  return { categories, filteredCategories, setFilteredCategories };
};

type AppProviderProps = {
  children: React.ReactNode;
  cookieConfig: CookieStorageConfig;
};

const getTodosCategories = (
  todos: Todo[],
  locale: string,
): Todo['categories'] =>
  todos
    .reduce<Todo['categories']>((acc, todo) => {
      const newCategories = todo.categories.filter((cat) => !acc.includes(cat));
      return acc.concat(newCategories);
    }, [])
    .sort((a, b) => a.localeCompare(b, locale));

export const AppProvider = ({ children, cookieConfig }: AppProviderProps) => {
  const { list, locale: appLocale } = cookieConfig;
  const [locale, setLocale] = useState(appLocale);
  const [translations, setTranslations] = useState(getTranslations(locale));
  const [todos, setTodos] = useState(list);
  const [editTodo, setEditTodo] = useState<Todo | undefined>();
  const [createButtonClicked, setCreateButtonClicked] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState<
    Todo['categories']
  >([]);
  const categories = useRef<Todo['categories']>(
    getTodosCategories(list, locale),
  );

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
    categories.current = getTodosCategories(newTodos, locale);
    setFilteredCategories(
      filteredCategories.filter((cat) => categories.current.includes(cat)),
    );
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
        categories: categories.current,
        createButtonClicked,
        editTodo,
        filteredCategories,
        locale,
        onCancel,
        setCreateButtonClicked: updateCreateButtonClicked,
        setEditTodo: updateEditTodo,
        setFilteredCategories,
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
