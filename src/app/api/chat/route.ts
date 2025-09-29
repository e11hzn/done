// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { todoTools } from '@/utils/todo-tools';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    messages: convertToModelMessages(messages),
    model: openai('gpt-4o-mini'),
    system:
      `Your role in life is to return the action and its parameters to manage a todos list. ` +
      `Use the tool provided to return the action and its parameters to manage a todos list. ` +
      `Do not set a date when creating a todo if user has not asked for it. ` +
      `When deleting or updating a todo item by name, return an error if a todo with the name is not found.`,
    tools: todoTools,
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
