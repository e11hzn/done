import { useState } from 'react';

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.FC<{ fill: string }>;
  iconFill?: string;
};

export const IconButton = (props: IconButtonProps) => {
  const { children, className, icon: Icon, iconFill, ...restProps } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      {...restProps}
      className={`w-6 h-6 cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon fill={isHovered ? '#0078d7' : (iconFill ?? 'black')} />
    </button>
  );
};
