'use client';

import { useAppContext } from './AppProvider';
import { TodoForm } from './TodoForm/TodoForm';

export const EditTodo = () => {
  const { editTodo } = useAppContext();
  if (!editTodo) return null;

  return <TodoForm todo={editTodo} type="edit" />;
};
