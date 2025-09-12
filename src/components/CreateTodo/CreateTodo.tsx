'use client';

import { CalendarDatetimePicker } from '@/components/CalenderDatetimePicker';
import { useForm } from './useForm';

export type CreateTodoProps = {
  locale: string;
};

export const CreateTodo = ({ locale }: CreateTodoProps) => {
  const {
    form,
    onSubmit,
    showNameError,
    updateCategories,
    updateDate,
    updateDescription,
    updateName,
  } = useForm();

  return (
    <div className="flex flex-col gap-4 w-full">
      <label className="flex flex-col">
        Name:&nbsp;
        <input
          className="border-2 border-[#ddd] rounded"
          onChange={updateName}
          required
          value={form.name}
        />
        {showNameError && (
          <span className="text-red-500 text-sm">Name is required</span>
        )}
      </label>
      <label className="flex flex-col">
        <span>Description:&nbsp;</span>
        <textarea
          className="border-2 border-[#ddd] rounded"
          onChange={updateDescription}
          rows={5}
          value={form.description}
        />
      </label>
      <label className="flex flex-col">
        Date:&nbsp;
        <CalendarDatetimePicker
          date={form.date}
          locale={locale}
          onChange={updateDate}
        />
      </label>
      <label className="flex flex-col">
        Categories (separate with a space):&nbsp;
        <input
          className="border-2 border-[#ddd] rounded"
          onChange={updateCategories}
          value={form.categories.join(' ')}
        />
      </label>
      <button
        className="mt-4 bg-black text-white border-2 border-[#ccc] rounded cursor-pointer py-1"
        onClick={onSubmit}
      >
        Add
      </button>
    </div>
  );
};
