import { CreateTodo } from '@/components/CreateTodo';
import { LocalePicker } from '@/components/LocalePicker';
import { getServerCookieConfig } from '@/utils/cookieServer';
import { TodosList } from '@/components/TodosList';
import { AppProvider } from '@/components/AppProvider';
import { EditTodo } from '@/components/EditTodo';

export default async function Home() {
  const cookieConfig = await getServerCookieConfig();

  return (
    <AppProvider cookieConfig={cookieConfig}>
      <div className="font-sans min-h-screen p-4">
        <main className="flex flex-col gap-6 w-full max-w-[600px] mx-auto">
          <h1 className="text-4xl w-full border-b-4 border-gray-400 pb-2 text-orange-900">
            Done Todos Now
          </h1>
          <LocalePicker />
          <CreateTodo />
          <EditTodo />
          <TodosList />
        </main>
      </div>
    </AppProvider>
  );
}
