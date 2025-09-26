'use client';

import { useChat } from '@ai-sdk/react';
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithToolCalls,
} from 'ai';
import { useEffect, useState } from 'react';
import { useAppContext } from './AppProvider';
import { Todo } from '@/utils/types';

export const Chat = () => {
  const { locale, setTodos, todos } = useAppContext();
  const { error, messages, sendMessage } = useChat({
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    if (!messages.length) return;

    const latestMessage = messages[messages.length - 1];
    if (latestMessage.role !== 'assistant') return;

    const toolPart = latestMessage.parts.find((part) =>
      part.type.startsWith('tool-'),
    );
    if (!toolPart) return;

    const lastToolPart = latestMessage.parts[latestMessage.parts.length - 1];
    if (
      lastToolPart.type === 'text' &&
      lastToolPart.state === 'done' &&
      'output' in toolPart
    ) {
      setTodos(toolPart.output as Todo[]);
    }
  }, [messages]); // eslint-disable-line react-hooks/exhaustive-deps

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
            sendMessage({ text: input }, { body: { locale, todos } });
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
