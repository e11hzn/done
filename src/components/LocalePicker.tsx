'use client';

import { locales } from '@/utils/i18n';
import { useAppContext } from '@/components/AppProvider';

export const LocalePicker = () => {
  const { locale, setLocale, t } = useAppContext();

  return (
    <label>
      {t.localePicker.selectLanguage}:
      <select
        className="text-center border-2 border-gray-300 rounded ml-1"
        defaultValue={locale}
        id="locale-picker"
        onChange={(e) => setLocale(e.target.value)}
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
