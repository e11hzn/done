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
    <div className="flex flex-col gap-4 w-full border-t-3 border-gray-600 pt-4">
      <h2 className="text-2xl text-orange-900">Create a Todo</h2>
      <label className="flex flex-col">
        Name:
        <input
          className="border-2 border-gray-300 rounded"
          onChange={updateName}
          required
          value={form.name}
        />
        {showNameError && (
          <span className="text-red-500 text-sm">Name is required</span>
        )}
      </label>
      <label className="flex flex-col">
        <span>Description:</span>
        <textarea
          className="border-2 border-gray-300 rounded"
          onChange={updateDescription}
          rows={5}
          value={form.description}
        />
      </label>
      <label className="flex flex-col">
        Date:
        <CalendarDatetimePicker
          date={form.date}
          locale={locale}
          onChange={updateDate}
        />
      </label>
      <label className="flex flex-col">
        Categories (separate with a space):
        <input
          className="border-2 border-gray-300 rounded"
          onChange={updateCategories}
          value={form.categories.join(' ')}
        />
      </label>
      <button
        className="mt-4 bg-black text-white border-2 border-gray-200 rounded cursor-pointer py-1 font-bold"
        onClick={onSubmit}
      >
        Add
      </button>
    </div>
  );
};
