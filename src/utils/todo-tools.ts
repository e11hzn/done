import { tool } from 'ai';
import { z } from 'zod';

const formDataParam = z.object({
  categories: z
    .array(z.string())
    .describe('The categories of the todo as an array of string'),
  date: z.string().optional().describe('The date of the todo'),
  description: z.string().optional().describe('The description of the todo'),
  done: z.boolean().optional().describe('Whether the todo is done'),
  name: z.string().describe('The name of the todo'),
});

const nameParam = z.string().describe('The name of the todo');

export const todoTools = {
  addTodo: tool({
    description: 'Add a new todo item',
    inputSchema: z.object({ form: formDataParam }),
  }),
  clearSearch: tool({
    description: 'Clear search term',
    inputSchema: z.object({}),
  }),
  deleteTodo: tool({
    description: 'Delete a todo item by name',
    inputSchema: z.object({ name: nameParam }),
  }),
  filterTodos: tool({
    description: 'Add an array of filter or clear the filters',
    inputSchema: z.object({
      filter: z
        .array(z.string())
        .optional()
        .describe('Filter todos by categories'),
    }),
  }),
  getAllTodos: tool({
    description: 'List all todo items',
    inputSchema: z.object({}),
  }),
  getTodo: tool({
    description: 'Get a todo item',
    inputSchema: z.object({ name: nameParam }),
  }),
  searchTodos: tool({
    description: 'Search for todos on their categories, description and name',
    inputSchema: z.object({ searchTerm: z.string().describe('Search term') }),
  }),
  sortTodos: tool({
    description: 'Set sort order by specific field and order',
    inputSchema: z.object({
      field: z.enum(['done', 'id', 'name']).describe('Field to sort by'),
      order: z.enum(['asc', 'desc']).default('asc').describe('Sort order'),
    }),
  }),
  toggleTodo: tool({
    description: 'Toggle the done status of a todo item',
    inputSchema: z.object({ name: nameParam }),
  }),
  updateTodo: tool({
    description: 'Update the content of a todo item',
    inputSchema: z.object({ form: formDataParam, name: nameParam }),
  }),
};
