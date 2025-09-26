import { z } from 'zod';
import { sortOrderValues } from '@/components/AppProvider';

export const formDataParam = z.object({
  categories: z
    .array(z.string())
    .describe('The categories of the todo as an array of string'),
  date: z.string().optional().describe('The date of the todo'),
  description: z.string().optional().describe('The description of the todo'),
  done: z.boolean().optional().describe('Whether the todo is done'),
  name: z.string().describe('The name of the todo'),
});

export const idParam = z.number().describe('The ID of the todo');

export const todoSchema = {
  ADD_TODO: z.object({ form: formDataParam }),
  DELETE_TODO: z.object({ idParam }),
  GET_TODO: z.object({ idParam }),
  LIST_TODOS: z.object({
    filter: z
      .array(z.string())
      .optional()
      .describe('Filter todos by categories'),
    sortOrder: z
      .enum(sortOrderValues)
      .optional()
      .describe('The sortorder for the list'),
  }),
  TOGGLE_TODO: z.object({ idParam }),
  UPDATE_TODO: z.object({ idParam, form: formDataParam }),
};

export const todoActions = {
  ADD_TODO: {
    description: 'Add a new todo item',
    inputSchema: todoSchema.ADD_TODO,
  },
  DELETE_TODO: {
    description: 'Delete a todo item',
    inputSchema: todoSchema.DELETE_TODO,
  },
  GET_TODO: {
    description: 'Get a todo item',
    inputSchema: todoSchema.GET_TODO,
  },
  LIST_TODOS: {
    description: 'List all todo items with optional filtering and sorting',
    inputSchema: todoSchema.LIST_TODOS,
  },
  TOGGLE_TODO: {
    description: 'Toggle the done status of a todo item',
    inputSchema: todoSchema.TOGGLE_TODO,
  },
  UPDATE_TODO: {
    description: 'Update the content of a todo item',
    inputSchema: todoSchema.UPDATE_TODO,
  },
};
