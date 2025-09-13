'use client';

import { useAppContext } from './AppProvider';
import { TodoForm } from './TodoForm/TodoForm';

export const CreateTodo = () => {
  const { editTodo } = useAppContext();
  if (editTodo) return null;

  return <TodoForm type="create" />;
};
