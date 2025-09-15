import { ChangeEvent, useState } from 'react';
import { CalendarDatetimePickerProps } from '@/components/CalenderDatetimePicker';
import { FormData } from '@/actions/createTodo';
import { useAppContext } from '@/components/AppProvider';
import { Todo } from '@/utils/types';

export const useForm = (todo?: Todo) => {
  const [form, setForm] = useState<FormData>(
    todo ?? {
      categories: [],
      name: '',
    },
  );
  const [showNameError, setShowNameError] = useState(false);
  const { onCancel, setTodos, t, todos } = useAppContext();

  const updateName = (e: ChangeEvent<HTMLInputElement>) => {
    setShowNameError(false);
    setForm((prevForm) => ({
      ...prevForm,
      name: e.target.value,
    }));
  };

  const updateDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setForm((prevForm) => ({
      ...prevForm,
      description: e.target.value,
    }));
  };

  const updateDate: CalendarDatetimePickerProps['onChange'] = (date) => {
    setForm((prevForm) => ({
      ...prevForm,
      date,
    }));
  };

  const updateCategories = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) => ({
      ...prevForm,
      categories: e.target.value.split(' '),
    }));
  };

  const onCreate = () => {
    if (!form.name) {
      setShowNameError(true);
      return;
    }

    setForm({
      categories: [],
      description: '',
      name: '',
    });

    // TODO: if user is logged in --> call server action instead of below
    // await createTodo(form);

    const id = todos.length ? todos[todos.length - 1].id + 1 : 0;
    setTodos([...todos, { ...form, id }]);
  };

  const onEdit = () => {
    if (!form.name) {
      setShowNameError(true);
      return;
    }

    const updatedTodos = todos.map((thisTodo) => {
      if (thisTodo.id !== todo!.id) return thisTodo;

      return {
        ...thisTodo,
        ...form,
      };
    });
    setTodos(updatedTodos);
  };

  return {
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
  };
};
