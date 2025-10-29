'use client';

import { AnimatePresence, motion } from 'motion/react';
import { TodoForm } from './TodoForm/TodoForm';
import { useAppSelector } from './AppProvider';

export const CreateEditForm = () => {
  const createButtonClicked = useAppSelector(
    (state) => state.app.createButtonClicked,
  );
  const editTodo = useAppSelector((state) => state.app.editTodo);
  const todos = useAppSelector((state) => state.app.todos);

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
