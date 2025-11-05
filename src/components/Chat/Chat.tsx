'use client';

import { useRef } from 'react';
import { useChat } from './useChat';
import { SpeechToText } from './SpeechToText';

export const Chat = () => {
  const { error, input, messages, onSpeechEnd, onSubmit, setInput, status, t } =
    useChat();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div>
      <form className="mb-4" onSubmit={onSubmit} ref={formRef}>
        <label className="flex flex-col">
          <span className="text-orange-900">{t.chatbot.input.label}</span>
          <div className="relative">
            <input
              className="border-2 border-gray-300 rounded pl-1 pr-6 w-full"
              disabled={status !== 'ready'}
              id="chatbot"
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chatbot.input.placeholder}
              value={input}
            />
            <SpeechToText
              className="absolute right-0 top-0.5"
              onSpeechEnd={onSpeechEnd}
            />
          </div>
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
