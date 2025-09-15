'use client';

import { CalendarDatetimePicker } from '@/components/CalenderDatetimePicker';
import { useForm } from './useForm';
import { Todo } from '@/utils/types';

export type TodoFormProps =
  | {
      type: 'create';
    }
  | {
      todo: Todo;
      type: 'edit';
    };

export const TodoForm = (props: TodoFormProps) => {
  const { type } = props;
  const todo = type === 'edit' ? props.todo : undefined;
  const {
    form,
    onCreate,
    onEdit,
    showNameError,
    updateCategories,
    updateDate,
    updateDescription,
    updateName,
  } = useForm(todo);

  const title = type === 'edit' ? `Edit "${todo?.name}"` : 'Create a Todo';
  const action = type === 'edit' ? () => onEdit(todo!.id) : onCreate;
  const buttonTitle = type === 'edit' ? 'Update' : 'Add';

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl text-orange-900">{title}</h2>
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
        <CalendarDatetimePicker date={form.date} onChange={updateDate} />
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
        onClick={action}
      >
        {buttonTitle}
      </button>
    </div>
  );
};
