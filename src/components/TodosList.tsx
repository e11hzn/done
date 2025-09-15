'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useAppContext } from '@/components/AppProvider';
import { DeleteIcon } from '@/icons/DeleteIcon';
import { IconButton } from './IconButton';
import { PencilIcon } from '@/icons/PencilIcon';
import { CheckIcon } from '@/icons/CheckIcon';

export const TodosList = () => {
  const { locale, setEditTodo, setTodos, todos } = useAppContext();

  const onDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onTodoDone = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;

        return {
          ...todo,
          done: !todo.done,
        };
      }),
    );
  };

  return (
    <div className="w-full">
      <AnimatePresence>
        {todos.length === 0 ? (
          <motion.p
            animate={{ opacity: 1, height: 'auto' }}
            className="text-amber-600"
            exit={{ opacity: 0, height: 0 }}
            key="no-todos"
            transition={{ duration: 0.5 }}
          >
            No Todos created yet, create one now above!
          </motion.p>
        ) : (
          <motion.div
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            key="has-todos"
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl text-orange-900 mb-4">Todos List</h2>
            <div className="flex flex-col gap-6">
              <AnimatePresence>
                {todos.map((item) => (
                  <motion.div
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex flex-col w-full border-2 border-gray-200 p-2 rounded gap-4 relative"
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
                      <span className="italic">
                        Due date:&nbsp;
                        {new Date(item.date as string).toLocaleDateString(
                          locale,
                        )}
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
                    <div className="flex gap-4 justify-between items-center border-t-2 border-gray-200 pt-2">
                      <span>Done: {item.done ? 'yes' : 'no'}</span>
                      <IconButton
                        icon={CheckIcon}
                        iconFill={item.done ? 'green' : undefined}
                        onClick={() => onTodoDone(item.id)}
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
