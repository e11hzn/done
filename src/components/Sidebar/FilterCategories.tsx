import { FilterRemove } from '@/icons/FilterRemove';
import { getTodosCategories, useAppContext } from '../AppProvider';
import { IconButton } from '../IconButton';

export const FilterCategories = () => {
  const { locale, filteredCategories, setFilteredCategories, t, todos } =
    useAppContext();

  const onAddCategoryToFilter = (category: string, filtered: boolean) => {
    if (filtered) {
      setFilteredCategories(
        filteredCategories.filter((cat) => cat !== category),
      );
    } else {
      setFilteredCategories(filteredCategories.concat([category]));
    }
  };

  const onClearAllFilters = () => setFilteredCategories([]);
  const categories = getTodosCategories(todos, locale);

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-orange-900 mb-4">
          {t.sidebar.filterSort.filter.title}
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
            {t.sidebar.filterSort.filter.noCategories}
          </span>
        )}
      </div>
    </div>
  );
};
