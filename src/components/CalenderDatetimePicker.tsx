'use client';

import DateTimePicker, { DateTimePickerProps } from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export type CalendarDatetimePickerProps = {
  date: DateTimePickerProps['value'];
  locale: string;
  onChange: (date: DateTimePickerProps['value']) => void;
};

export const CalendarDatetimePicker = ({
  date,
  locale,
  onChange,
}: CalendarDatetimePickerProps) => {
  return (
    <DateTimePicker
      className="border-2 border-[#ddd] rounded [&>div]:!border-none"
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
