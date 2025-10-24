import { describe, it, expect, vi, Mock } from 'vitest';
import { getServerCookieConfig } from './cookieServer';
import { COOKIE_KEY } from './cookieClient';

vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}));

describe('getServerCookieConfig', () => {
  it('should retrieve and parse the cookie config from the server (including URI-encoded characters)', async () => {
    const mockCookieValue = {
      language: 'fr',
      sortBy: 'creationDate',
      filterBy: ['personal', 'shopping list'],
    };

    const encodedCookieValue = encodeURIComponent(
      JSON.stringify(mockCookieValue),
    );

    const mockCookieStore = {
      get: vi.fn().mockReturnValue({ value: encodedCookieValue }),
    };

    const { cookies } = await import('next/headers');
    (cookies as Mock).mockResolvedValue(mockCookieStore);

    const config = await getServerCookieConfig();

    expect(cookies).toHaveBeenCalled();
    expect(mockCookieStore.get).toHaveBeenCalledWith(COOKIE_KEY);
    expect(config).toEqual(mockCookieValue);
  });

  it('should throw an error if the cookie is not set', async () => {
    const mockCookieStore = {
      get: vi.fn().mockReturnValue(undefined),
    };

    const { cookies } = await import('next/headers');
    (cookies as Mock).mockResolvedValue(mockCookieStore);

    await expect(getServerCookieConfig()).rejects.toThrow();
  });
});
