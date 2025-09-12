import { CreateTodo } from '@/components/CreateTodo/CreateTodo';
import { LocalePicker } from '@/components/LocalePicker';
import { getTranslations } from '@/utils/i18n';
import { getServerCookieConfig } from '@/utils/cookieServer';
import { TodosList } from '@/components/TodosList/TodosList';

export default async function Home() {
  const t = await getTranslations();
  const { list, locale } = await getServerCookieConfig();

  return (
    <div className="font-sans min-h-screen p-4">
      <main className="flex flex-col gap-6 w-full max-w-[600px] mx-auto">
        <h1 className="text-4xl w-full border-b-4 border-gray-400 pb-2 text-orange-900">
          Done Todos Now
        </h1>
        <LocalePicker locale={locale} t={t} />
        <CreateTodo locale={locale} />
        <TodosList list={list} locale={locale} />
      </main>
    </div>
  );
}
