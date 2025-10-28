'use client';

import type { Translations } from '@/translations/types';
import {
  CookieStorageConfig,
  setClientCookieConfig,
} from '@/utils/cookieClient';
import { getTranslations } from '@/utils/i18n';
import { Todo } from '@/utils/types';
import { createContext, useContext, useState } from 'react';

export const sortOrderValues = [
  'create-asc',
  'create-desc',
  'deadline',
  'name-asc',
  'name-desc',
] as const;
export type SortOrder = (typeof sortOrderValues)[number];

type AppState = {
  createButtonClicked: boolean;
  editTodo?: Todo;
  filteredCategories: Todo['categories'];
  locale: string;
  onCancel: () => void;
  search: string;
  setCreateButtonClicked: () => void;
  setEditTodo: (todo?: Todo) => void;
  setFilteredCategories: (filtered: Todo['categories']) => void;
  setLocale: (locale: string) => void;
  setSearch: (searchTerm: string) => void;
  setSortOrder: (sortOrder: SortOrder) => void;
  setTodos: (todos: Todo[]) => void;
  sortOrder: SortOrder;
  t: Translations;
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
  const { filteredCategories, setFilteredCategories } = useAppContext();
  return { filteredCategories, setFilteredCategories };
};

type AppProviderProps = {
  children: React.ReactNode;
  cookieConfig: CookieStorageConfig;
};

export const getTodosCategories = (
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
  const [sortOrder, setSortOrder] = useState<SortOrder>('create-asc');
  const [search, setSearch] = useState('');

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
    const currentCategories = getTodosCategories(newTodos, locale);
    setFilteredCategories(
      filteredCategories.filter((cat) => currentCategories.includes(cat)),
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
        createButtonClicked,
        editTodo,
        filteredCategories,
        locale,
        onCancel,
        search,
        setCreateButtonClicked: updateCreateButtonClicked,
        setEditTodo: updateEditTodo,
        setFilteredCategories,
        setLocale: updateLocale,
        setSearch,
        setSortOrder,
        setTodos: updateTodos,
        sortOrder,
        t: translations,
        todos,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
