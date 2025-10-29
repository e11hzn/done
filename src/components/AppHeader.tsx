'use client';

import { LocalePicker } from './LocalePicker';
import { useAppSelector } from './AppProvider';

export const AppHeader = () => {
  const translations = useAppSelector((state) => state.app.translations);
  return (
    <div className="flex justify-between items-center border-b-4 border-gray-400 pb-2 w-full">
      <h1 className="text-4xl text-orange-900">
        {translations.appHeader.title}
      </h1>
      <LocalePicker />
    </div>
  );
};
