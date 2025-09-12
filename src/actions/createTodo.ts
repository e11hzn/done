'use server';

import { Todo } from '@/utils/types';
import { getServerCookieConfig } from '@/utils/cookieServer';

export type FormData = Omit<Todo, 'id'>;

export const createTodo = async (data: FormData) => {
  const { list } = await getServerCookieConfig();

  const id = list.length ? list[list.length - 1].id++ : 0;
  return { id };
};
