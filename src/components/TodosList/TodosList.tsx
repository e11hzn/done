import { Todo } from '@/utils/types';

export type TodosListProps = {
  list: Todo[];
  locale: string;
};

export const TodosList = ({ list, locale }: TodosListProps) => {
  return (
    <div className="border-t-3 border-gray-600 w-full pt-4">
      {list.length === 0 ? (
        <p className="text-amber-600">
          No Todos created yet, create one now above!
        </p>
      ) : (
        <>
          <h2 className="text-2xl text-orange-900 mb-4">Todos List</h2>
          <div className="flex flex-col gap-6">
            {list.map((item) => (
              <div
                key={item.id}
                className="flex flex-col w-full border-2 border-gray-200 p-2 rounded gap-4"
              >
                <h3 className="text-2xl font-bold">{item.name}</h3>
                {item.date && (
                  <span className="italic">
                    Due date:&nbsp;
                    {new Date(item.date as string).toLocaleDateString(locale)}
                  </span>
                )}
                {item.description && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: item.description.replace(
                        /(?:\r\n|\r|\n)/g,
                        '<br>',
                      ),
                    }}
                  />
                )}
                {item.categories.length !== 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.categories.map((category) => (
                      <div
                        key={category}
                        className="border-gray-200 border-2 rounded p-1"
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                )}
                <span className="border-t-2 border-gray-200 pt-2">
                  Done: {item.done ? 'yes' : 'no'}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
