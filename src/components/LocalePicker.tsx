/* eslint-disable  @typescript-eslint/no-explicit-any */
'use client';

import { locales } from '@/utils/i18n';
import {
  CookieStorageConfig,
  setCookieStorageConfig,
} from '@/utils/cookieStorage';

export type LocalePickerProps = {
  cookieInStorage: CookieStorageConfig;
  t: Record<string, any>;
};

export const LocalePicker = ({ cookieInStorage, t }: LocalePickerProps) => {
  return (
    <label>
      {t.localePicker.selectLanguage}:
      <select
        className="text-center border-2 border-black rounded ml-1"
        defaultValue={cookieInStorage.locale}
        id="locale-picker"
        onChange={(e) => setCookieStorageConfig({ locale: e.target.value })}
      >
        {locales.map(({ flag, locale, name }) => (
          <option key={locale} value={locale}>
            {flag} {name}
          </option>
        ))}
      </select>
    </label>
  );
};
