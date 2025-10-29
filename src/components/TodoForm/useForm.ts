import { ChangeEvent, useState } from 'react';
import { CalendarDatetimePickerProps } from '@/components/CalenderDatetimePicker';
import {
  cancelEditing,
  setTodos as setTodosThunk,
  useAppDispatch,
  useAppSelector,
} from '@/components/AppProvider';
import { FormData, Todo } from '@/utils/types';

export const useForm = (todo?: Todo) => {
  const [form, setForm] = useState<FormData>(
    todo ?? {
      categories: [],
      name: '',
    },
  );
  const [showNameError, setShowNameError] = useState(false);
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.app.todos);
  const translations = useAppSelector((state) => state.app.translations);

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

    const id = todos.length ? todos[todos.length - 1].id + 1 : 0;
    void dispatch(setTodosThunk([...todos, { ...form, id }]));
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
    void dispatch(setTodosThunk(updatedTodos));
  };

  return {
    form,
    onCancel: () => {
      dispatch(cancelEditing());
    },
    onCreate,
    onEdit,
    showNameError,
    t: translations,
    updateCategories,
    updateDate,
    updateDescription,
    updateName,
  };
};
