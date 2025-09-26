'use client';

import { useChat } from '@ai-sdk/react';
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithToolCalls,
} from 'ai';
import { useRef, useState } from 'react';
import { SortOrder, useAppContext } from './AppProvider';
import { FormData } from '@/actions/createTodo';

export const Chat = () => {
  const { setFilteredCategories, setSortOrder, setTodos, todos } =
    useAppContext();

  const todosRef = useRef(todos);
  todosRef.current = todos;

  const { addToolResult, error, messages, sendMessage } = useChat({
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    transport: new DefaultChatTransport({ api: '/api/chat' }),
    async onToolCall({ toolCall }) {
      console.log('onToolCall', { toolCall });

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
        case 'getTodo':
          const { id: getId } = toolCall.input as { id: number };
          const foundTodo = todosRef.current.find(({ id }) => id === getId);
          if (!foundTodo) {
            addToolResult({
              // @ts-expect-error will fix this when I know why there's a type mismatch for the error
              errorText: 'Sorry, could not find your todo',
              state: 'output-error',
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
          const toolInput = toolCall.input as {
            filter?: string[];
            sortOrder?: SortOrder;
          };
          if (toolInput.filter) {
            setFilteredCategories(toolInput.filter);
          }
          if (toolInput.sortOrder) {
            setSortOrder(toolInput.sortOrder);
          }
          addToolResult({
            tool: toolCall.toolName,
            toolCallId: toolCall.toolCallId,
            output: todosRef.current,
          });
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
            // @ts-expect-error will fix this when I know why there's a type mismatch for the error
            errorText: 'Sorry, dont know how to handle your request',
            state: 'output-error',
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
            sendMessage({ text: input });
            setInput('');
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
