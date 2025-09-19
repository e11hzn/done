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
  const [search, setSearch] = useState('');

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

  const sortedTodos = useMemo(
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

  const renderedTodos = useMemo(() => {
    if (search === '') return sortedTodos;

    const searchTerms = search.split(' ');

    return sortedTodos.filter((todo) =>
      searchTerms.some((term) => {
        if (term === '') return false;

        const inCategories = todo.categories.some((cat) => cat.includes(term));
        const inDescription = todo.description?.includes(term);
        const inName = todo.name.includes(term);
        return inCategories || inDescription || inName;
      }),
    );
  }, [filteredTodos, search, sortOrder]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    createButtonClicked,
    hasFilters: filteredCategories.length > 0,
    locale,
    onCloseSidebar: () => setShowSidebar(false),
    onDeleteTodo,
    onSetShowSidebar,
    onTodoDone,
    renderedTodos,
    search,
    setCreateButtonClicked,
    setEditTodo,
    setSearch,
    showSearch: todos.length > 1,
    showSidebar,
    t,
  };
};
