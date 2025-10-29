import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Translations } from '@/translations/types';
import type { Todo } from '@/utils/types';
import { getTranslations } from '@/utils/i18n';
import type { CookieStorageConfig } from '@/utils/cookieClient';

export const sortOrderValues = [
  'create-asc',
  'create-desc',
  'deadline',
  'name-asc',
  'name-desc',
] as const;
export type SortOrder = (typeof sortOrderValues)[number];

export type AppState = {
  createButtonClicked: boolean;
  editTodo?: Todo;
  filteredCategories: Todo['categories'];
  locale: string;
  search: string;
  sortOrder: SortOrder;
  todos: Todo[];
  translations: Translations;
};

const defaultLocale = 'en-US';

const initialState: AppState = {
  createButtonClicked: false,
  editTodo: undefined,
  filteredCategories: [],
  locale: defaultLocale,
  search: '',
  sortOrder: 'create-asc',
  todos: [],
  translations: getTranslations(defaultLocale),
};

export const buildInitialState = ({
  list,
  locale,
}: CookieStorageConfig): AppState => ({
  createButtonClicked: false,
  editTodo: undefined,
  filteredCategories: [],
  locale,
  search: '',
  sortOrder: 'create-asc',
  todos: list,
  translations: getTranslations(locale),
});

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

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleCreateButton(state) {
      state.createButtonClicked = !state.createButtonClicked;
    },
    setEditTodo(state, action: PayloadAction<Todo | undefined>) {
      state.createButtonClicked = false;
      state.editTodo = action.payload;
    },
    setFilteredCategories(state, action: PayloadAction<Todo['categories']>) {
      state.filteredCategories = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setSortOrder(state, action: PayloadAction<SortOrder>) {
      state.sortOrder = action.payload;
    },
    cancelEditing(state) {
      state.createButtonClicked = false;
      state.editTodo = undefined;
    },
    applyLocale(
      state,
      action: PayloadAction<{ locale: string; translations: Translations }>,
    ) {
      state.locale = action.payload.locale;
      state.translations = action.payload.translations;
    },
    applyTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
      state.editTodo = undefined;
      state.createButtonClicked = false;
      const categories = getTodosCategories(action.payload, state.locale);
      state.filteredCategories = state.filteredCategories.filter((cat) =>
        categories.includes(cat),
      );
    },
  },
});

export const {
  toggleCreateButton,
  setEditTodo,
  setFilteredCategories,
  setSearch,
  setSortOrder,
  cancelEditing,
  applyLocale,
  applyTodos,
} = appSlice.actions;

export const appReducer = appSlice.reducer;
