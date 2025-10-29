'use client';

import { locales } from '@/utils/i18n';
import {
  setLocale as setLocaleThunk,
  useAppDispatch,
  useAppSelector,
} from '@/components/AppProvider';

export const LocalePicker = () => {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.app.locale);

  return (
    <select
      className="cursor-pointer text-center border-2 border-gray-300 rounded ml-1"
      value={locale}
      id="locale-picker"
      onChange={(e) => void dispatch(setLocaleThunk(e.target.value))}
    >
      {locales.map(({ flag, locale, name }) => (
        <option key={locale} title={name} value={locale}>
          {flag}
        </option>
      ))}
    </select>
  );
};
