import { Todo } from '@/utils/types';

export const COOKIE_KEY = 'done-todos-config';

export type CookieStorageConfig = {
  list: Todo[];
  locale: string;
};

export const getClientCookieConfig = async (): Promise<CookieStorageConfig> => {
  const currentConfigInStore = await cookieStore.get(COOKIE_KEY);
  const decodedConfig = currentConfigInStore!.value!;
  return JSON.parse(decodeURIComponent(decodedConfig));
};

export const setClientCookieConfig = async (
  updatedConfig: Partial<CookieStorageConfig>,
) => {
  const currentConfigInStore = await getClientCookieConfig();

  cookieStore.set(
    COOKIE_KEY,
    JSON.stringify({
      ...currentConfigInStore,
      ...updatedConfig,
    }),
  );
};
