import { useChat as useChatSDK } from '@ai-sdk/react';
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithToolCalls,
} from 'ai';
import { FormEvent, useEffect, useState } from 'react';
import { getTodosCategories, SortOrder, useAppContext } from '../AppProvider';
import { FormData, Todo } from '@/utils/types';

let currentTodos: Todo[] = [];
let currentCategories: string[] = [];

export const useChat = () => {
  const [input, setInput] = useState('');
  const {
    locale,
    setFilteredCategories,
    setSearch,
    setSortOrder,
    setTodos,
    t,
    todos,
  } = useAppContext();

  useEffect(() => {
    currentTodos = todos;
    currentCategories = getTodosCategories(todos, locale);
  }, [locale, todos]);

  const { addToolResult, error, messages, setMessages, sendMessage, status } =
    useChatSDK({
      sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
      transport: new DefaultChatTransport({ api: '/api/chat' }),
      async onToolCall({ toolCall }) {
        let toolOutput: unknown;

        switch (toolCall.toolName) {
          case 'addTodo':
            toolOutput = true;

            const createId = currentTodos.length
              ? currentTodos[currentTodos.length - 1].id + 1
              : 0;
            const { form: createForm } = toolCall.input as { form: FormData };

            setTodos([...currentTodos, { ...createForm, id: createId }]);
            break;

          case 'clearSearch':
            toolOutput = true;
            setSearch('');
            break;

          case 'deleteTodo':
            let deleteTodoWithNameFound = false;
            const { name: deleteName } = toolCall.input as { name: string };

            const updatedTodosAfterDelete = currentTodos.filter((todo) => {
              if (
                todo.name.toLocaleLowerCase() === deleteName.toLocaleLowerCase()
              ) {
                deleteTodoWithNameFound = true;
              }
              return (
                todo.name.toLocaleLowerCase() !== deleteName.toLocaleLowerCase()
              );
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
              currentCategories.includes(cat),
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
            const foundTodo = currentTodos.find(
              ({ name }) =>
                name.toLocaleLowerCase() === getName.toLocaleLowerCase(),
            );

            toolOutput = foundTodo ? true : foundTodo;
            break;

          case 'getAllTodos':
            toolOutput = currentTodos;
            break;

          case 'searchTodos':
            const { searchTerm } = toolCall.input as { searchTerm: string };
            toolOutput = true;
            setSearch(searchTerm);
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

            const toggledTodos = currentTodos.map((thisTodo) => {
              if (
                thisTodo.name.toLocaleLowerCase() !==
                toggleName.toLocaleLowerCase()
              ) {
                return thisTodo;
              }

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

            const updatedTodos = currentTodos.map((thisTodo) => {
              if (
                thisTodo.name.toLocaleLowerCase() !==
                updateName.toLocaleLowerCase()
              ) {
                return thisTodo;
              }

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

  const onSpeechEnd = (transcript: string) => {
    if (transcript.trim()) {
      setMessages([]);
      sendMessage({ text: transcript });
    }
  };

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
    onSpeechEnd,
    onSubmit,
    setInput,
    status,
    t,
  };
};
