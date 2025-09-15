'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useAppContext } from './AppProvider';
import { TodoForm } from './TodoForm/TodoForm';

export const CreateEditForm = () => {
  const { createButtonClicked, editTodo, todos } = useAppContext();

  return (
    <AnimatePresence mode="wait">
      {todos.length === 0 || createButtonClicked ? (
        <motion.div
          animate={{ opacity: 1, height: 'auto' }}
          className="border-b-3 border-gray-600 pb-8"
          exit={{ opacity: 0, height: 0 }}
          initial={{ opacity: 0, height: 0 }}
          key="create"
          transition={{ duration: 0.5 }}
        >
          <TodoForm showCancel={!!todos.length} type="create" />
        </motion.div>
      ) : (
        !!editTodo && (
          <motion.div
            animate={{ opacity: 1, height: 'auto' }}
            className="border-b-3 border-gray-600 pb-8"
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
            key="edit"
            transition={{ duration: 0.5 }}
          >
            <TodoForm todo={editTodo} type="edit" />
          </motion.div>
        )
      )}
    </AnimatePresence>
  );
};
