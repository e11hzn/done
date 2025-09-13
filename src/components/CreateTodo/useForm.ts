import { ChangeEvent, useState } from 'react';
import { CalendarDatetimePickerProps } from '@/components/CalenderDatetimePicker';
import { createTodo, FormData } from '@/actions/createTodo';
import { getClientCookieConfig } from '@/utils/cookieClient';
import { useTodos } from '@/components/AppProvider';

export const useForm = () => {
  const [form, setForm] = useState<FormData>({
    categories: [],
    name: '',
  });
  const [showNameError, setShowNameError] = useState(false);
  const { setTodos } = useTodos();

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

  const onSubmit = async () => {
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

    const { list } = await getClientCookieConfig();
    const id = list.length ? list[list.length - 1].id + 1 : 0;

    setTodos([
      ...list,
      {
        ...form,
        id,
      },
    ]);
  };

  return {
    form,
    onSubmit,
    showNameError,
    updateCategories,
    updateDate,
    updateDescription,
    updateName,
  };
};
