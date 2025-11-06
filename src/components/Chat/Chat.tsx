'use client';

import { useRef } from 'react';
import { useChat } from './useChat';
import { SpeechToText } from './SpeechToText';
import { InputField } from '../InputField';

export const Chat = () => {
  const { error, input, messages, onSpeechEnd, onSubmit, setInput, status, t } =
    useChat();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div>
      <form className="mb-4" onSubmit={onSubmit} ref={formRef}>
        <InputField
          customIcon={<SpeechToText onSpeechEnd={onSpeechEnd} />}
          disabled={status !== 'ready'}
          id="chatbot"
          label={t.chatbot.input.label}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.chatbot.input.placeholder}
          value={input}
        />
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
