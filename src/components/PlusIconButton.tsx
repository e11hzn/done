'use client';

import { PlusIcon } from '@/icons/PlusIcon';
import { IconButton } from './IconButton';
import { useAppContext } from './AppProvider';

export type PlusIconButtonProps = {
  className: string;
};

export const PlusIconButton = ({ className }: PlusIconButtonProps) => {
  const { setCreateButtonClicked } = useAppContext();

  return (
    <IconButton
      className={className}
      icon={PlusIcon}
      onClick={setCreateButtonClicked}
    />
  );
};
