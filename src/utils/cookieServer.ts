'use server';

import { cookies } from 'next/headers';
import { COOKIE_KEY, CookieStorageConfig } from './cookieClient';

export const getServerCookieConfig = async (): Promise<CookieStorageConfig> => {
  const cookieStore = await cookies();

  const currentConfigInStore = cookieStore.get(COOKIE_KEY)!;
  return JSON.parse(decodeURIComponent(currentConfigInStore.value));
};
