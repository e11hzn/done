'use client';

import { useChat } from './useChat';

export const Chat = () => {
  const { error, input, messages, onSubmit, setInput } = useChat();

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

      <form onSubmit={onSubmit}>
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
