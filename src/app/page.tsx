import { getServerCookieConfig } from '@/utils/cookieServer';
import { TodosList } from '@/components/TodosList/TodosList';
import { AppProvider } from '@/components/AppProvider';
import { CreateEditForm } from '@/components/CreateEditForm';
import { AppHeader } from '@/components/AppHeader';
import { Chat } from '@/components/Chat/Chat';

export default async function Home() {
  const cookieConfig = await getServerCookieConfig();
  const hasOpenApiKey = !!process.env.OPENAI_API_KEY;

  return (
    <AppProvider cookieConfig={cookieConfig}>
      <div className="font-sans min-h-screen p-4">
        <main className="flex flex-col gap-6 w-full max-w-[1024px] mx-auto break-words">
          <AppHeader />
          <CreateEditForm />
          <TodosList />
          {hasOpenApiKey && <Chat />}
        </main>
      </div>
    </AppProvider>
  );
}
