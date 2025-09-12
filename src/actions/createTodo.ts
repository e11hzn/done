'use server';

import { Todo } from '@/utils/types';
import { getCookieStorageConfig } from '@/utils/cookieStorage';

export type FormData = Omit<Todo, 'id'>;

export const createTodo = async (data: FormData) => {
  const { list } = await getCookieStorageConfig();

  const id = list.length ? list[list.length - 1].id++ : 0;
  return { id };
};
