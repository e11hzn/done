import { CalendarDatetimePickerProps } from '@/components/CalenderDatetimePicker';

export type Todo = {
  categories: string[];
  date?: CalendarDatetimePickerProps['date'];
  description?: string;
  done?: boolean;
  id: number;
  name: string;
};

export type FormData = Omit<Todo, 'id'>;
