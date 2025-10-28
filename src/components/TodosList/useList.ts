import { useMemo, useState } from 'react';
import { useAppContext } from '../AppProvider';

export const useList = () => {
  const {
    createButtonClicked,
    filteredCategories,
    locale,
    search,
    setCreateButtonClicked,
    setEditTodo,
    setSearch,
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
          if (!b.date || b.done) return -1;
          if (!a.date || a.done) return 1;

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

  const getRenderedTodos = () => {
    const trimmedSearch = search.trim();
    if (trimmedSearch === '') return sortedTodos;

    const searchTerms = trimmedSearch.split(' ').filter((t) => t !== '');

    return sortedTodos.filter((todo) =>
      searchTerms.some((term) => {
        const inCategories = todo.categories.some((cat) =>
          cat.toLocaleLowerCase().includes(term.toLocaleLowerCase()),
        );
        const inDescription = todo.description
          ?.toLocaleLowerCase()
          .includes(term.toLocaleLowerCase());
        const inName = todo.name
          .toLocaleLowerCase()
          .includes(term.toLocaleLowerCase());
        return inCategories || inDescription || inName;
      }),
    );
  };

  return {
    createButtonClicked,
    hasFilters: filteredCategories.length > 0,
    locale,
    onCloseSidebar: () => setShowSidebar(false),
    onDeleteTodo,
    onSetShowSidebar,
    onTodoDone,
    renderedTodos: getRenderedTodos(),
    search,
    setCreateButtonClicked,
    setEditTodo,
    setSearch,
    showSearch: todos.length > 1,
    showSidebar,
    t,
  };
};
