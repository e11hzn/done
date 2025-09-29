'use client';

import { useChat } from './useChat';

export const Chat = () => {
  const { error, input, messages, onSubmit, setInput, status, t } = useChat();

  return (
    <div>
      <form className="mb-4" onSubmit={onSubmit}>
        <label className="flex flex-col" key="search-todos">
          <span className="text-orange-900">{t.chatbot.input.label}</span>
          <input
            className="border-2 border-gray-300 rounded px-1 w-full"
            disabled={status !== 'ready'}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.chatbot.input.placeholder}
            value={input}
          />
        </label>
      </form>
      {messages?.map((message) => (
        <div key={message.id}>
          <span className="font-bold">{`${t.chatbot.role[message.role]}: `}</span>
          {message.parts.map((part) => ('text' in part ? part.text : null))}
        </div>
      ))}

      {error && <span>{`${t.chatbot.error}: ${error.message}`}</span>}
    </div>
  );
};
