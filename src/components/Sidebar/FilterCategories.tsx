import { FilterRemove } from '@/icons/FilterRemove';
import {
  getTodosCategories,
  setFilteredCategories,
  useAppDispatch,
  useAppSelector,
} from '../AppProvider';
import { IconButton } from '../IconButton';

export const FilterCategories = () => {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.app.locale);
  const filteredCategories = useAppSelector(
    (state) => state.app.filteredCategories,
  );
  const translations = useAppSelector((state) => state.app.translations);
  const todos = useAppSelector((state) => state.app.todos);

  const onAddCategoryToFilter = (category: string, filtered: boolean) => {
    if (filtered) {
      dispatch(
        setFilteredCategories(
          filteredCategories.filter((cat) => cat !== category),
        ),
      );
    } else {
      dispatch(setFilteredCategories(filteredCategories.concat([category])));
    }
  };

  const onClearAllFilters = () => dispatch(setFilteredCategories([]));
  const categories = getTodosCategories(todos, locale);

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-orange-900 mb-4">
          {translations.sidebar.filterSort.filter.title}
        </h2>
        {filteredCategories.length > 0 && (
          <IconButton icon={FilterRemove} onClick={onClearAllFilters} />
        )}
      </div>
      <div className="flex flex-wrap gap-4">
        {categories.length > 0 ? (
          categories.map((category) => {
            const filtered = filteredCategories.includes(category);
            return (
              <button
                className={`border-gray-200 border-2 rounded p-1 cursor-pointer ${filtered ? 'bg-black text-white' : 'bg-white text-black'}`}
                onClick={() => onAddCategoryToFilter(category, filtered)}
                key={category}
              >
                {category}
              </button>
            );
          })
        ) : (
          <span className="text-amber-600">
            {translations.sidebar.filterSort.filter.noCategories}
          </span>
        )}
      </div>
    </div>
  );
};
