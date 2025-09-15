'use client';

import { CalendarDatetimePicker } from '@/components/CalenderDatetimePicker';
import { useForm } from './useForm';
import { Todo } from '@/utils/types';

export type TodoFormProps =
  | {
      showCancel: boolean;
      type: 'create';
    }
  | {
      todo: Todo;
      type: 'edit';
    };

export const TodoForm = (props: TodoFormProps) => {
  const { type } = props;
  const showCancel = type === 'create' ? props.showCancel : true;
  const todo = type === 'edit' ? props.todo : undefined;
  const {
    form,
    onCancel,
    onCreate,
    onEdit,
    showNameError,
    t,
    updateCategories,
    updateDate,
    updateDescription,
    updateName,
  } = useForm(todo);

  const title =
    type === 'edit'
      ? `${t.todoForm.edit.title} "${todo?.name}"`
      : t.todoForm.create.title;
  const action = type === 'edit' ? onEdit : onCreate;
  const buttonTitle =
    type === 'edit'
      ? t.todoForm.edit.updateButton
      : t.todoForm.create.addButton;

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl text-orange-900">{title}</h2>
      <label className="flex flex-col">
        {`${t.todoForm.name}:`}
        <input
          className="border-2 border-gray-300 rounded"
          onChange={updateName}
          required
          value={form.name}
        />
        {showNameError && (
          <span className="text-red-500 text-sm">{t.todoForm.nameError}</span>
        )}
      </label>
      <label className="flex flex-col">
        <span>{`${t.todoForm.description}:`}</span>
        <textarea
          className="border-2 border-gray-300 rounded"
          onChange={updateDescription}
          rows={5}
          value={form.description}
        />
      </label>
      <label className="flex flex-col">
        {`${t.todoForm.date}:`}
        <CalendarDatetimePicker date={form.date} onChange={updateDate} />
      </label>
      <label className="flex flex-col">
        {`${t.todoForm.categories}:`}
        <input
          className="border-2 border-gray-300 rounded"
          onChange={updateCategories}
          value={form.categories.join(' ')}
        />
      </label>
      <div className="flex gap-6 w-full">
        <button
          className="mt-4 bg-black text-white border-2 border-gray-200 rounded cursor-pointer py-1 font-bold flex-1"
          onClick={action}
        >
          {buttonTitle}
        </button>
        {showCancel && (
          <button
            className="mt-4 bg-white text-black border-2 border-gray-200 rounded cursor-pointer px-3 py-1 font-bold"
            onClick={onCancel}
          >
            {t.todoForm.cancelButton}
          </button>
        )}
      </div>
    </div>
  );
};
