'use client';

import {
  SortOrder,
  setSortOrder,
  useAppDispatch,
  useAppSelector,
} from '../AppProvider';

const sortOptions: SortOrder[] = [
  'create-asc',
  'create-desc',
  'deadline',
  'name-asc',
  'name-desc',
];
export const SortingTodos = () => {
  const dispatch = useAppDispatch();
  const sortOrder = useAppSelector((state) => state.app.sortOrder);
  const translations = useAppSelector((state) => state.app.translations);

  return (
    <fieldset className="border-b-3 border-gray-600 pb-8">
      <legend className="text-orange-900 mb-4">
        {translations.sidebar.filterSort.sorting.title}
      </legend>
      <ul className="flex flex-col gap-2">
        {sortOptions.map((sortKey) => (
          <li className="flex gap-2" key={sortKey}>
            <input
              checked={sortKey === sortOrder}
              id={sortKey}
              name="sorting-todos"
              onChange={() => dispatch(setSortOrder(sortKey))}
              type="radio"
              value={sortKey}
            />
            <label htmlFor={sortKey}>
              {translations.sidebar.filterSort.sorting.options[sortKey]}
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
};
