'use client';

import { SortOrder, useAppContext } from '../AppProvider';

const sortOptions: SortOrder[] = [
  'create-asc',
  'create-desc',
  'deadline',
  'name-asc',
  'name-desc',
];

export const SortingTodos = () => {
  const { setSortOrder, sortOrder, t } = useAppContext();

  return (
    <fieldset className="border-b-3 border-gray-600 pb-8">
      <legend className="text-orange-900 mb-4">
        {t.sidebar.filterSort.sorting.title}
      </legend>
      <ul className="flex flex-col gap-2">
        {sortOptions.map((sortKey) => (
          <li className="flex gap-2" key={sortKey}>
            <input
              checked={sortKey === sortOrder}
              id={sortKey}
              name="sorting-todos"
              onChange={() => setSortOrder(sortKey)}
              type="radio"
              value={sortKey}
            />
            <label htmlFor={sortKey}>
              {t.sidebar.filterSort.sorting.options[sortKey]}
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
};
