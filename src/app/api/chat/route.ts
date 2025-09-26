// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { todoTools } from '@/utils/todo-tools';
import { Todo } from '@/utils/types';

export async function POST(req: Request) {
  const {
    locale,
    messages,
    todos,
  }: { locale: string; messages: UIMessage[]; todos: Todo[] } =
    await req.json();

  const tools = todoTools({ locale, todos });

  const result = streamText({
    messages: convertToModelMessages(messages),
    model: openai('gpt-4o'),
    system:
      `Your role in life is to create todos, ` +
      `update todos, delete todos, search and sort todos. ` +
      `Use the tool provided to create todos, ` +
      `update todos, delete todos, search and sort todos. ` +
      `Do not set a date when creating a todo if user has not asked for it. ` +
      `The list of current todos will always be provided as an input to the tool handler.`,
    tools,
  });

  return result.toUIMessageStreamResponse({
    onError: (error: unknown) => {
      if (error == null) {
        return 'unknown error';
      }

      if (typeof error === 'string') {
        return error;
      }

      if (error instanceof Error) {
        return error.message;
      }

      return JSON.stringify(error);
    },
  });
}
