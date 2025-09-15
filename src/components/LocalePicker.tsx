'use client';

import { locales } from '@/utils/i18n';
import { useAppContext } from '@/components/AppProvider';

export const LocalePicker = () => {
  const { locale, setLocale } = useAppContext();

  return (
    <select
      className="cursor-pointer text-center border-2 border-gray-300 rounded ml-1"
      defaultValue={locale}
      id="locale-picker"
      onChange={(e) => setLocale(e.target.value)}
    >
      {locales.map(({ flag, locale, name }) => (
        <option key={locale} title={name} value={locale}>
          {flag}
        </option>
      ))}
    </select>
  );
};
