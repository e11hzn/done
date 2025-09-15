import { LocalePicker } from '@/components/LocalePicker';
import { getServerCookieConfig } from '@/utils/cookieServer';
import { TodosList } from '@/components/TodosList';
import { AppProvider } from '@/components/AppProvider';
import { CreateEditForm } from '@/components/CreateEditForm';

export default async function Home() {
  const cookieConfig = await getServerCookieConfig();

  return (
    <AppProvider cookieConfig={cookieConfig}>
      <div className="font-sans min-h-screen p-4">
        <main className="flex flex-col gap-6 w-full max-w-[1024px] mx-auto">
          <div className="flex justify-between items-center border-b-4 border-gray-400 pb-2 w-full">
            <h1 className="text-4xl text-orange-900">Done Todos Now</h1>
            <LocalePicker />
          </div>
          <CreateEditForm />
          <TodosList />
        </main>
      </div>
    </AppProvider>
  );
}
