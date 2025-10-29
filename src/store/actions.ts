import { getTranslations } from '@/utils/i18n';
import { setClientCookieConfig } from '@/utils/cookieClient';
import type { Todo } from '@/utils/types';
import { applyLocale, applyTodos } from './appSlice';
import type { AppDispatch } from './store';

export const setLocale = (locale: string) => async (dispatch: AppDispatch) => {
  const translations = getTranslations(locale);
  dispatch(applyLocale({ locale, translations }));
  await setClientCookieConfig({ locale });
};

export const setTodos = (todos: Todo[]) => async (dispatch: AppDispatch) => {
  dispatch(applyTodos(todos));
  await setClientCookieConfig({ list: todos });
};
