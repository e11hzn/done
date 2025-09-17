import { useMemo, useState } from 'react';
import { useAppContext } from '../AppProvider';

export const useList = () => {
  const {
    createButtonClicked,
    filteredCategories,
    locale,
    setCreateButtonClicked,
    setEditTodo,
    setTodos,
    sortOrder,
    t,
    todos,
  } = useAppContext();
  const [showSidebar, setShowSidebar] = useState(false);

  const onSetShowSidebar = () => {
    setCreateButtonClicked();
    setEditTodo(undefined);
    setShowSidebar(true);
  };

  const onDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onTodoDone = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;

        return {
          ...todo,
          done: !todo.done,
        };
      }),
    );
  };

  const filteredTodos = useMemo(
    () =>
      filteredCategories.length === 0
        ? todos.map((t) => t)
        : todos.filter((item) =>
            item.categories.some((cat) => filteredCategories.includes(cat)),
          ),
    [filteredCategories, todos],
  );

  const renderedTodos = useMemo(
    () =>
      filteredTodos.sort((a, b) => {
        if (sortOrder === 'create-asc') {
          return a.id < b.id ? -1 : 1;
        }
        if (sortOrder === 'create-desc') {
          return a.id < b.id ? 1 : -1;
        }
        if (sortOrder === 'deadline') {
          if (!b.date) return -1;
          if (!a.date) return 1;

          const aTime = new Date(a.date as string).getTime();
          const bTime = new Date(b.date as string).getTime();
          return aTime < bTime ? -1 : 1;
        }
        if (sortOrder === 'name-asc') {
          return a.name.localeCompare(b.name, locale);
        }
        if (sortOrder === 'name-desc') {
          return b.name.localeCompare(a.name, locale);
        }
        return 0;
      }),
    [filteredTodos, locale, sortOrder],
  );

  return {
    createButtonClicked,
    locale,
    onCloseSidebar: () => setShowSidebar(false),
    onDeleteTodo,
    onSetShowSidebar,
    onTodoDone,
    renderedTodos,
    setCreateButtonClicked,
    setEditTodo,
    showSidebar,
    t,
  };
};
