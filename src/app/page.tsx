import { getServerCookieConfig } from '@/utils/cookieServer';
import { TodosList } from '@/components/TodosList/TodosList';
import { AppProvider } from '@/components/AppProvider';
import { CreateEditForm } from '@/components/CreateEditForm';
import { AppHeader } from '@/components/AppHeader';
import { Chat } from '@/components/Chat';

export default async function Home() {
  const cookieConfig = await getServerCookieConfig();

  return (
    <AppProvider cookieConfig={cookieConfig}>
      <div className="font-sans min-h-screen p-4">
        <main className="flex flex-col gap-6 w-full max-w-[1024px] mx-auto">
          <AppHeader />
          <CreateEditForm />
          <TodosList />
          <Chat />
        </main>
      </div>
    </AppProvider>
  );
}
