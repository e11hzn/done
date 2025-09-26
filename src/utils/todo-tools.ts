import { tool } from 'ai';
import { z } from 'zod';
import { todoStore } from './todo-store';
import { sortOrderValues } from '@/components/AppProvider';
import { Todo } from './types';

const formDataParam = z.object({
  categories: z
    .array(z.string())
    .describe('The categories of the todo as an array of string'),
  date: z.string().optional().describe('The date of the todo'),
  description: z.string().optional().describe('The description of the todo'),
  done: z.boolean().optional().describe('Whether the todo is done'),
  name: z.string().describe('The name of the todo'),
});

const idParam = z.number().describe('The ID of the todo');

// const todoParam = formDataParam.extend({
//   id: idParam,
// });

// const todosParam = z.array(todoParam);

export const todoTools = ({
  locale,
  todos,
}: {
  locale: string;
  todos: Todo[];
}) => ({
  getAllTodos: tool({
    description: 'Get all todos from the todo list',
    inputSchema: z.object({
      sortOrder: z
        .enum(sortOrderValues)
        .optional()
        .describe('The sortorder for the list'),
    }),
    execute: ({ sortOrder }) => {
      return todoStore.getAllTodos({
        locale,
        sortOrder: sortOrder ?? 'create-asc',
        todos,
      });
    },
  }),

  getTodo: tool({
    description: 'Get a specific todo by its ID',
    inputSchema: z.object({
      id: idParam,
    }),
    execute: ({ id }) => {
      return todoStore.getTodo({ id, todos });
    },
  }),

  createTodo: tool({
    description: 'Create a new todo item',
    inputSchema: z.object({
      form: formDataParam,
    }),
    execute: ({ form }) => {
      return todoStore.createTodo({ form, todos });
    },
  }),

  updateTodo: tool({
    description: 'Update an existing todo item',
    inputSchema: z.object({
      form: formDataParam,
      id: idParam,
    }),
    execute: ({ form, id }) => {
      return todoStore.updateTodo({ form, id, todos });
    },
  }),

  deleteTodo: tool({
    description: 'Delete a todo item',
    inputSchema: z.object({
      id: idParam,
    }),
    execute: ({ id }) => {
      return todoStore.deleteTodo({ id, todos });
    },
  }),

  toggleTodo: tool({
    description: 'Toggle the done status of a todo',
    inputSchema: z.object({
      id: idParam,
    }),
    execute: ({ id }) => {
      return todoStore.toggleTodo({ id, todos });
    },
  }),
});
