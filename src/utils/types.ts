import { CalendarDatetimePickerProps } from '@/components/CalenderDatetimePicker';

export type Todo = {
  categories: string[];
  date?: CalendarDatetimePickerProps['date'];
  description?: string;
  id: number;
  name: string;
};
