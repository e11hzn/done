export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.FC;
};

export const IconButton = (props: IconButtonProps) => {
  const { children, className, icon: Icon, ...restProps } = props;
  return (
    <button
      className={`w-6 h-6 cursor-pointer hover:border-2 hover:border-gray-300 hover:rounded ${className}`}
      {...restProps}
    >
      <Icon />
    </button>
  );
};
