'use client';

import { useAppContext } from './AppProvider';
import { LocalePicker } from './LocalePicker';

export const AppHeader = () => {
  const { t } = useAppContext();
  return (
    <div className="flex justify-between items-center border-b-4 border-gray-400 pb-2 w-full">
      <h1 className="text-4xl text-orange-900">{t.appHeader.title}</h1>
      <LocalePicker />
    </div>
  );
};
