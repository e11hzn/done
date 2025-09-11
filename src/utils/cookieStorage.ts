'use server';

import { cookies } from 'next/headers';
import { COOKIE_KEY } from '@/middleware';

type Todo = {
  date?: string;
  description?: string;
  name: string;
};

export type CookieStorageConfig = {
  lists: Record<string, Todo[]>[];
  locale: string;
};

export const getCookieStorageConfig =
  async (): Promise<CookieStorageConfig> => {
    const cookieStore = await cookies();

    const currentConfigInStore = cookieStore.get(COOKIE_KEY)!;
    return JSON.parse(currentConfigInStore.value);
  };

export const setCookieStorageConfig = async (
  updatedConfig: Partial<CookieStorageConfig>,
) => {
  const currentConfigInStore = await getCookieStorageConfig();
  const cookieStore = await cookies();

  cookieStore.set(
    COOKIE_KEY,
    JSON.stringify({
      ...currentConfigInStore,
      ...updatedConfig,
    }),
  );
};
