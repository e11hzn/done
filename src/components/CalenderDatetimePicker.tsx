'use client';

import { useState } from 'react';
import DateTimePicker, { DateTimePickerProps } from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export type CalendarDatetimePickerProps = {
  initialValue?: string;
  locale: string;
};

export const CalendarDatetimePicker = ({
  initialValue,
  locale,
}: CalendarDatetimePickerProps) => {
  const [value, onChange] = useState<DateTimePickerProps['value']>(
    initialValue ? new Date(initialValue) : undefined,
  );

  return (
    <DateTimePicker
      dayPlaceholder="dd"
      hourPlaceholder="hh"
      locale={locale}
      minutePlaceholder="mm"
      monthPlaceholder="mm"
      onChange={onChange}
      value={value}
      yearPlaceholder="yyyy"
    />
  );
};
