import { useMemo, useState } from 'react';
import type { Todo } from '@/utils/types';
import {
  setEditTodo,
  setSearch as setSearchAction,
  setTodos as setTodosThunk,
  toggleCreateButton,
  useAppDispatch,
  useAppSelector,
} from '../AppProvider';

export const useList = () => {
  const dispatch = useAppDispatch();
  const createButtonClicked = useAppSelector(
    (state) => state.app.createButtonClicked,
  );
  const filteredCategories = useAppSelector(
    (state) => state.app.filteredCategories,
  );
  const locale = useAppSelector((state) => state.app.locale);
  const search = useAppSelector((state) => state.app.search);
  const sortOrder = useAppSelector((state) => state.app.sortOrder);
  const translations = useAppSelector((state) => state.app.translations);
  const todos = useAppSelector((state) => state.app.todos);
  const [showSidebar, setShowSidebar] = useState(false);

  const onSetShowSidebar = () => {
    dispatch(toggleCreateButton());
    dispatch(setEditTodo(undefined));
    setShowSidebar(true);
  };

  const onDeleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    void dispatch(setTodosThunk(updatedTodos));
  };

  const onTodoDone = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id !== id) return todo;

      return {
        ...todo,
        done: !todo.done,
      };
    });
    void dispatch(setTodosThunk(updatedTodos));
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
    setCreateButtonClicked: () => dispatch(toggleCreateButton()),
    setEditTodo: (todo?: Todo) => dispatch(setEditTodo(todo)),
    setSearch: (term: string) => dispatch(setSearchAction(term)),
    showSearch: todos.length > 1,
    showSidebar,
    t: translations,
  };
};
