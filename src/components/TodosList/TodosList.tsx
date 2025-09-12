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
                className="flex flex-col w-full border-2 border-gray-200 p-2 rounded"
              >
                <h3>{item.name}</h3>
                {item.date && (
                  <span>
                    {new Date(item.date as string).toLocaleDateString(locale)}
                  </span>
                )}
                {item.description && <span>{item.description}</span>}
                {item.categories.length === 0 && (
                  <div className="flex flex-wrap gap-4">
                    {item.categories.map((category) => (
                      <div key={category}>{category}</div>
                    ))}
                  </div>
                )}
                <span>Done: {item.done ? 'yes' : 'no'}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
