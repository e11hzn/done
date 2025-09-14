'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useAppContext } from './AppProvider';
import { TodoForm } from './TodoForm/TodoForm';

export const CreateEditForm = () => {
  const { editTodo } = useAppContext();

  return (
    <AnimatePresence mode="wait">
      {!editTodo ? (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          key="create"
          transition={{ duration: 0.5 }}
        >
          <TodoForm type="create" />
        </motion.div>
      ) : (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          key="edit"
          transition={{ duration: 0.5 }}
        >
          <TodoForm todo={editTodo} type="edit" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
