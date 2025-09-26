import { SortOrder } from '@/components/AppProvider';
import { FormData } from '@/actions/createTodo';
import { Todo } from './types';

const TodoStore = () => {
  const getAllTodos = ({
    locale,
    sortOrder,
    todos,
  }: {
    locale: string;
    sortOrder: SortOrder;
    todos: Todo[];
  }) =>
    Array.from(todos).sort((a, b) => {
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
    });

  const getTodo = ({ id, todos }: { id: number; todos: Todo[] }) => {
    const foundTodo = todos.find(({ id: thisId }) => id === thisId);
    return foundTodo ?? null;
  };

  const createTodo = ({ form, todos }: { form: FormData; todos: Todo[] }) => {
    const id = todos.length ? todos[todos.length - 1].id + 1 : 0;
    return [...todos, { ...form, id }];
  };

  const updateTodo = ({
    form,
    id,
    todos,
  }: {
    form: FormData;
    id: number;
    todos: Todo[];
  }) => {
    const updatedTodos = todos.map((thisTodo) => {
      if (thisTodo.id !== id) return thisTodo;

      return {
        ...thisTodo,
        ...form,
      };
    });
    return updatedTodos;
  };

  const deleteTodo = ({ id, todos }: { id: number; todos: Todo[] }) =>
    todos.filter((todo) => todo.id !== id);

  const toggleTodo = ({ id, todos }: { id: number; todos: Todo[] }) => {
    return todos.map((thisTodo) => {
      if (thisTodo.id !== id) return thisTodo;

      return {
        ...thisTodo,
        done: !thisTodo.done,
      };
    });
  };

  return {
    createTodo,
    deleteTodo,
    getAllTodos,
    getTodo,
    toggleTodo,
    updateTodo,
  };
};

export const todoStore = TodoStore();
