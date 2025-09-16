'use client';

import { motion } from 'motion/react';
import { IconButton } from '../IconButton';
import { CloseIcon } from '@/icons/CloseIcon';
import { useAppContext } from '../AppProvider';

export type SidebarProps = {
  children: React.ReactNode;
  onClose: () => void;
  show: boolean;
};

export const Sidebar = ({ children, onClose, show }: SidebarProps) => {
  const { t } = useAppContext();
  return (
    <>
      <motion.div
        animate={
          show
            ? { display: 'block', opacity: 1 }
            : { display: 'none', opacity: 0 }
        }
        className="bg-black/70 h-screen w-screen fixed left-0 top-0 m-0 select-none hidden"
        onTap={onClose}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        animate={show ? { right: 0 } : { right: '-20rem' }}
        className="fixed top-0 right-[-20rem] w-80 max-w-full h-screen bg-white shadow-[16px_0_32px_-16px_#000] p-4 z-10 flex flex-col gap-4"
        transition={{ duration: 0.3 }}
      >
        <div className="text-2xl text-orange-900 pb-2 border-b-2 border-b-gray-200 flex justify-between items-center">
          <h2>{t.sidebar.filterSort.title}</h2>
          <IconButton icon={CloseIcon} onClick={onClose} />
        </div>
        {children}
      </motion.div>
    </>
  );
};
