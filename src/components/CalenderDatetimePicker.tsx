'use client';

import DateTimePicker, { DateTimePickerProps } from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { useLocale } from './AppProvider';

export type CalendarDatetimePickerProps = {
  date: DateTimePickerProps['value'];
  onChange: (date: DateTimePickerProps['value']) => void;
};

export const CalendarDatetimePicker = ({
  date,
  onChange,
}: CalendarDatetimePickerProps) => {
  const { locale } = useLocale();

  return (
    <DateTimePicker
      className="border-2 border-gray-300 rounded [&>div]:!border-none"
      dayPlaceholder="dd"
      hourPlaceholder="hh"
      locale={locale}
      minutePlaceholder="mm"
      monthPlaceholder="mm"
      onChange={onChange}
      value={date}
      yearPlaceholder="yyyy"
    />
  );
};
