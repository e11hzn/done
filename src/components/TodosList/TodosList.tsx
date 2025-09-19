'use client';

import { AnimatePresence, motion } from 'motion/react';
import { DeleteIcon } from '@/icons/DeleteIcon';
import { IconButton } from '../IconButton';
import { PencilIcon } from '@/icons/PencilIcon';
import { CheckIcon } from '@/icons/CheckIcon';
import { PlusIcon } from '@/icons/PlusIcon';
import { AlertIcon } from '@/icons/AlertIcon';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { FilterIcon } from '@/icons/FilterIcon';
import { FilterCategories } from '../Sidebar/FilterCategories';
import { SortingTodos } from '../Sidebar/SortingTodos';
import { useList } from './useList';

export const TodosList = () => {
  const {
    createButtonClicked,
    hasFilters,
    locale,
    onCloseSidebar,
    onDeleteTodo,
    onSetShowSidebar,
    onTodoDone,
    renderedTodos,
    search,
    setCreateButtonClicked,
    setEditTodo,
    setSearch,
    showSearch,
    showSidebar,
    t,
  } = useList();

  return (
    <>
      <div className="w-full">
        <AnimatePresence>
          {!showSearch && renderedTodos.length === 0 ? (
            <motion.p
              animate={{ opacity: 1, height: 'auto' }}
              className="text-amber-600"
              exit={{ opacity: 0, height: 0 }}
              key="no-todos"
              transition={{ duration: 0.5 }}
            >
              {t.todosList.emptyList}
            </motion.p>
          ) : (
            <motion.div
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              key="has-todos"
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between">
                <h2 className="text-2xl text-orange-900 mb-4">
                  {t.todosList.title}
                </h2>
                <div className="flex gap-4">
                  <IconButton
                    iconFill={hasFilters ? 'green' : undefined}
                    icon={FilterIcon}
                    onClick={onSetShowSidebar}
                  />
                  {!createButtonClicked && (
                    <IconButton
                      icon={PlusIcon}
                      onClick={setCreateButtonClicked}
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <AnimatePresence>
                  {showSearch && (
                    <label className="flex flex-col">
                      <span className="text-orange-900">{`Search`}</span>
                      <input
                        className="border-2 border-gray-300 rounded"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Categories, description or name"
                        value={search}
                      />
                    </label>
                  )}
                  {renderedTodos.map((item) => {
                    let datePassed = false;
                    let withinOneDay = false;
                    if (!item.done && item.date) {
                      const currentTime = new Date().getTime();
                      const itemTime = new Date(item.date as string).getTime();
                      datePassed = currentTime > itemTime;
                      withinOneDay = itemTime - currentTime < 24 * 3600 * 1000;
                    }

                    return (
                      <motion.div
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex flex-col w-full border-gray-200 border-2 p-2 rounded gap-4 relative"
                        exit={{ opacity: 0, height: 0 }}
                        initial={{ opacity: 0, height: 0 }}
                        key={item.id}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="flex gap-4 items-center">
                          <h3 className="text-2xl font-bold">{item.name}</h3>
                          <div className="flex justify-end gap-4 flex-1">
                            <IconButton
                              icon={PencilIcon}
                              onClick={() => setEditTodo(item)}
                            />
                            <IconButton
                              icon={DeleteIcon}
                              onClick={() => onDeleteTodo(item.id)}
                            />
                          </div>
                        </div>
                        {item.date && (
                          <div className="flex flex-col">
                            <span className="italic">
                              {`${t.todosList.dueDate}: `}
                              {new Date(item.date as string).toLocaleString(
                                locale,
                              )}
                            </span>
                            <span className="italic">
                              {datePassed ? (
                                <div className="flex">
                                  <AlertIcon fill="red" />
                                  <span className="ml-2">
                                    {t.todosList.datePassed}
                                  </span>
                                </div>
                              ) : (
                                withinOneDay && (
                                  <div className="flex">
                                    <AlertIcon fill="orange" />
                                    <span className="ml-2">
                                      {t.todosList.withinOneDay}
                                    </span>
                                  </div>
                                )
                              )}
                            </span>
                          </div>
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
                        <div className="flex gap-4 justify-between items-center border-t-2 border-gray-200 pt-2">
                          <div>
                            <span>{`${t.todosList.done}: `}</span>
                            <span
                              className={
                                item.done ? 'text-green-600' : 'text-red-700'
                              }
                            >
                              {item.done ? t.todosList.yes : t.todosList.no}
                            </span>
                          </div>
                          <IconButton
                            icon={CheckIcon}
                            onClick={() => onTodoDone(item.id)}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Sidebar onClose={onCloseSidebar} show={showSidebar}>
        <SortingTodos />
        <FilterCategories />
      </Sidebar>
    </>
  );
};
