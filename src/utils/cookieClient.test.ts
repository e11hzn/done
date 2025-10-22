import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getClientCookieConfig,
  setClientCookieConfig,
  COOKIE_KEY,
} from './cookieClient';
import { Todo } from '@/utils/types';

// Mock the global cookieStore API
const mockCookieStore = {
  get: vi.fn(),
  set: vi.fn(),
};

Object.defineProperty(global, 'cookieStore', {
  value: mockCookieStore,
  writable: true,
});

describe('cookieClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getClientCookieConfig', () => {
    it('should return the parsed cookie config', async () => {
      const mockTodos: Todo[] = [
        {
          categories: [],
          id: 1,
          name: 'Test Todo',
        },
      ];
      const mockLocale = 'en';
      const mockConfig = { list: mockTodos, locale: mockLocale };
      const encodedConfig = encodeURIComponent(JSON.stringify(mockConfig));

      mockCookieStore.get.mockResolvedValueOnce({
        name: COOKIE_KEY,
        value: encodedConfig,
      });

      const config = await getClientCookieConfig();
      expect(config).toEqual(mockConfig);
      expect(mockCookieStore.get).toHaveBeenCalledWith(COOKIE_KEY);
    });

    it('should throw an error if cookie is not found or value is null', async () => {
      mockCookieStore.get.mockResolvedValueOnce(null);

      await expect(getClientCookieConfig()).rejects.toThrow();
    });
  });

  describe('setClientCookieConfig', () => {
    it('should set the cookie with the updated config', async () => {
      const initialTodos: Todo[] = [
        {
          categories: [],
          id: 1,
          name: 'Test Todo',
        },
      ];
      const initialLocale = 'en';
      const initialConfig = { list: initialTodos, locale: initialLocale };
      const encodedInitialConfig = encodeURIComponent(
        JSON.stringify(initialConfig),
      );

      mockCookieStore.get.mockResolvedValueOnce({
        name: COOKIE_KEY,
        value: encodedInitialConfig,
      });

      const updatedTodos: Todo[] = [
        {
          categories: [],
          id: 2,
          name: 'Updated Todo',
        },
      ];
      const updatedConfig = { list: updatedTodos };

      await setClientCookieConfig(updatedConfig);

      const expectedNewConfig = { ...initialConfig, ...updatedConfig };
      const encodedExpectedNewConfig = encodeURIComponent(
        JSON.stringify(expectedNewConfig),
      );

      expect(mockCookieStore.set).toHaveBeenCalledWith(
        COOKIE_KEY,
        encodedExpectedNewConfig,
      );
    });

    it('should merge with existing config when updating', async () => {
      const initialTodos: Todo[] = [
        {
          categories: [],
          id: 1,
          name: 'Initial Todo',
        },
      ];
      const initialLocale = 'en';
      const initialConfig = { list: initialTodos, locale: initialLocale };
      const encodedInitialConfig = encodeURIComponent(
        JSON.stringify(initialConfig),
      );

      mockCookieStore.get.mockResolvedValueOnce({
        name: COOKIE_KEY,
        value: encodedInitialConfig,
      });

      const newLocale = 'fr';
      const updatedConfig = { locale: newLocale };

      await setClientCookieConfig(updatedConfig);

      const expectedNewConfig = { ...initialConfig, ...updatedConfig };
      const encodedExpectedNewConfig = encodeURIComponent(
        JSON.stringify(expectedNewConfig),
      );

      expect(mockCookieStore.set).toHaveBeenCalledWith(
        COOKIE_KEY,
        encodedExpectedNewConfig,
      );
    });
  });
});
