import { useChat as useChatSDK } from '@ai-sdk/react';
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithToolCalls,
} from 'ai';
import { FormEvent, useRef, useState } from 'react';
import { SortOrder, useAppContext } from '../AppProvider';
import { FormData, Todo } from '@/utils/types';

export const useChat = () => {
  const [input, setInput] = useState('');
  const {
    categories,
    setFilteredCategories,
    setSortOrder,
    setTodos,
    t,
    todos,
  } = useAppContext();

  const todosRef = useRef(todos);
  todosRef.current = todos;

  const { addToolResult, error, messages, setMessages, sendMessage, status } =
    useChatSDK({
      sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
      transport: new DefaultChatTransport({ api: '/api/chat' }),
      async onToolCall({ toolCall }) {
        console.log('onToolCall', { toolCall, todos: todosRef.current });
        let toolOutput: unknown;

        switch (toolCall.toolName) {
          case 'addTodo':
            toolOutput = true;

            const createId = todosRef.current.length
              ? todosRef.current[todosRef.current.length - 1].id + 1
              : 0;
            const { form: createForm } = toolCall.input as { form: FormData };

            setTodos([...todosRef.current, { ...createForm, id: createId }]);
            break;

          case 'deleteTodo':
            let deleteTodoWithNameFound = false;
            const { name: deleteName } = toolCall.input as { name: string };

            const updatedTodosAfterDelete = todosRef.current.filter((todo) => {
              if (todo.name === deleteName) {
                deleteTodoWithNameFound = true;
              }
              return todo.name !== deleteName;
            });

            if (deleteTodoWithNameFound) {
              setTodos(updatedTodosAfterDelete);
            }
            toolOutput = deleteTodoWithNameFound;
            break;

          case 'filterTodos':
            const { filter } = toolCall.input as { filter?: string[] };
            if (!filter) {
              toolOutput = true;
              setFilteredCategories([]);
              break;
            }

            const filterInCategories = filter.filter((cat) =>
              categories.includes(cat),
            );
            if (filterInCategories.length === 0) {
              toolOutput = false;
              setFilteredCategories([]);
              break;
            }

            toolOutput = true;
            setFilteredCategories(filterInCategories);
            break;

          case 'getTodo':
            const { name: getName } = toolCall.input as { name: string };
            const foundTodo = todosRef.current.find(
              ({ name }) => name === getName,
            );

            toolOutput = foundTodo ? true : foundTodo;
            break;

          case 'getAllTodos':
            toolOutput = todosRef.current;
            break;

          case 'sortTodos':
            toolOutput = true;

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

            setSortOrder(newSortOrder);
            break;

          case 'toggleTodo':
            let toggleTodoWithNameFound = false;
            const { name: toggleName } = toolCall.input as { name: string };

            const toggledTodos = todosRef.current.map((thisTodo) => {
              if (thisTodo.name !== toggleName) return thisTodo;

              toggleTodoWithNameFound = true;
              return {
                ...thisTodo,
                done: !thisTodo.done,
              };
            });

            if (toggleTodoWithNameFound) {
              setTodos(toggledTodos);
            }
            toolOutput = toggleTodoWithNameFound;
            break;

          case 'updateTodo':
            let updateTodoWithNameFound = false;

            const { form: editForm, name: updateName } = toolCall.input as {
              form: FormData;
              name: string;
            };

            const updatedTodos = todosRef.current.map((thisTodo) => {
              if (thisTodo.name !== updateName) return thisTodo;

              updateTodoWithNameFound = true;
              return {
                ...thisTodo,
                ...editForm,
              };
            });

            if (updateTodoWithNameFound) {
              setTodos(updatedTodos);
            }
            toolOutput = updateTodoWithNameFound;
            break;

          default:
            toolOutput = false;
        }

        addToolResult({
          output: toolOutput,
          tool: toolCall.toolName,
          toolCallId: toolCall.toolCallId,
        });
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([]);
      setInput('');
      sendMessage({ text: input });
    }
  };

  return {
    error,
    input,
    messages,
    onSubmit,
    setInput,
    status,
    t,
  };
};
