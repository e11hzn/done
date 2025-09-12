import { CreateTodo } from '@/components/CreateTodo/CreateTodo';
import { LocalePicker } from '@/components/LocalePicker';
import { getTranslations } from '@/utils/i18n';
import { getServerCookieConfig } from '@/utils/cookieServer';

export default async function Home() {
  const t = await getTranslations();
  const { locale } = await getServerCookieConfig();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 gap-16 sm:p-8">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-[600px]">
        <LocalePicker locale={locale} t={t} />
        <CreateTodo locale={locale} />
      </main>
    </div>
  );
}
