'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useAppContext } from './AppProvider';
import { TodoForm } from './TodoForm/TodoForm';

export const CreateEditForm = () => {
  const { createButtonClicked, editTodo, todos } = useAppContext();

  if (todos.length && !editTodo && !createButtonClicked) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <div className="border-b-3 border-gray-600 pb-8">
        {todos.length === 0 || createButtonClicked ? (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            key="create"
            transition={{ duration: 0.5 }}
          >
            <TodoForm showCancel={!!todos.length} type="create" />
          </motion.div>
        ) : !!editTodo ? (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            key="edit"
            transition={{ duration: 0.5 }}
          >
            <TodoForm todo={editTodo} type="edit" />
          </motion.div>
        ) : null}
      </div>
    </AnimatePresence>
  );
};
