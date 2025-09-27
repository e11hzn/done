'use client';

import { useChat } from '@ai-sdk/react';
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithToolCalls,
} from 'ai';
import { useRef, useState } from 'react';
import { SortOrder, useAppContext } from './AppProvider';
import { FormData } from '@/actions/createTodo';
import { Todo } from '@/utils/types';

export const Chat = () => {
  const { categories, setFilteredCategories, setSortOrder, setTodos, todos } =
    useAppContext();

  const todosRef = useRef(todos);
  todosRef.current = todos;

  const { addToolResult, error, messages, setMessages, sendMessage } = useChat({
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    transport: new DefaultChatTransport({ api: '/api/chat' }),
    async onToolCall({ toolCall }) {
      console.log('onToolCall', { toolCall, todos: todosRef.current });

      switch (toolCall.toolName) {
        case 'addTodo':
          const createId = todosRef.current.length
            ? todosRef.current[todosRef.current.length - 1].id + 1
            : 0;
          const { form: createForm } = toolCall.input as { form: FormData };
          addToolResult({
            tool: toolCall.toolName,
            toolCallId: toolCall.toolCallId,
            output: true,
          });
          setTodos([...todosRef.current, { ...createForm, id: createId }]);
          return;
        case 'deleteTodo':
          const { id: deleteId } = toolCall.input as { id: number };
          addToolResult({
            tool: toolCall.toolName,
            toolCallId: toolCall.toolCallId,
            output: true,
          });
          setTodos(todosRef.current.filter((todo) => todo.id !== deleteId));
          return;
        case 'filterTodos':
          const { filter } = toolCall.input as { filter?: string[] };
          if (!filter) {
            addToolResult({
              tool: toolCall.toolName,
              toolCallId: toolCall.toolCallId,
              output: true,
            });
            setFilteredCategories([]);
            return;
          }
          const filterInCategories = filter.filter((cat) =>
            categories.includes(cat),
          );
          if (filterInCategories.length === 0) {
            addToolResult({
              tool: toolCall.toolName,
              toolCallId: toolCall.toolCallId,
              output: false,
            });
            setFilteredCategories([]);
            return;
          }
          addToolResult({
            tool: toolCall.toolName,
            toolCallId: toolCall.toolCallId,
            output: true,
          });
          setFilteredCategories(filterInCategories);
          return;
        case 'getTodo':
          const { id: getId } = toolCall.input as { id: number };
          const foundTodo = todosRef.current.find(({ id }) => id === getId);
          if (!foundTodo) {
            addToolResult({
              output: false,
              tool: toolCall.toolName,
              toolCallId: toolCall.toolCallId,
            });
          } else {
            addToolResult({
              tool: toolCall.toolName,
              toolCallId: toolCall.toolCallId,
              output: foundTodo,
            });
          }
          return;
        case 'getAllTodos':
          addToolResult({
            tool: toolCall.toolName,
            toolCallId: toolCall.toolCallId,
            output: todosRef.current,
          });
          return;
        case 'sortTodos':
          const { field, order } = toolCall.input as {
            field: keyof Pick<Todo, 'done' | 'id' | 'name'>;
            order: 'asc' | 'desc';
          };
          let newSortOrder: SortOrder = 'create-asc';
          if (field === 'done') {
            newSortOrder = 'deadline';
          } else if (field === 'id') {
            newSortOrder = `create-${order}`;
          } else {
            newSortOrder = `name-${order}`;
          }
          addToolResult({
            tool: toolCall.toolName,
            toolCallId: toolCall.toolCallId,
            output: true,
          });
          setSortOrder(newSortOrder);
          return;
        case 'toggleTodo':
          const { id: toggleId } = toolCall.input as { id: number };
          addToolResult({
            tool: toolCall.toolName,
            toolCallId: toolCall.toolCallId,
            output: true,
          });
          setTodos(
            todosRef.current.map((thisTodo) => {
              if (thisTodo.id !== toggleId) return thisTodo;

              return {
                ...thisTodo,
                done: !thisTodo.done,
              };
            }),
          );
          return;
        case 'updateTodo':
          const { form: editForm, id: updateId } = toolCall.input as {
            form: FormData;
            id: number;
          };
          addToolResult({
            tool: toolCall.toolName,
            toolCallId: toolCall.toolCallId,
            output: true,
          });
          setTodos(
            todosRef.current.map((thisTodo) => {
              if (thisTodo.id !== updateId) return thisTodo;

              return {
                ...thisTodo,
                ...editForm,
              };
            }),
          );
          return;
        default:
          addToolResult({
            output: false,
            tool: toolCall.toolName,
            toolCallId: toolCall.toolCallId,
          });
      }
    },
  });
  const [input, setInput] = useState('');

  return (
    <>
      {messages?.map((message) => (
        <div key={message.id}>
          <strong>{`${message.role}: `}</strong>
          {message.parts.map((part) => ('text' in part ? part.text : null))}
          <br />
        </div>
      ))}

      {error && <span>{`An error occured: ${error.message}`}</span>}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) {
            setMessages([]);
            setInput('');
            sendMessage({ text: input });
          }
        }}
      >
        <label className="flex flex-col" key="search-todos">
          <span className="text-orange-900">Write a message to chatbot</span>
          <input
            className="border-2 border-gray-300 rounded px-1 w-full"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
        </label>
      </form>
    </>
  );
};
