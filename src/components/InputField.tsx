import { IconButton, IconButtonProps } from '@/components/IconButton';

export type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  customIcon?: React.ReactNode;
  icon?: IconButtonProps['icon'];
  inputError?: string;
  label: string;
  onIconClick?: IconButtonProps['onClick'];
};

export const InputField = (props: InputFieldProps) => {
  const {
    customIcon,
    icon,
    inputError,
    label,
    onIconClick,
    ...restInputProps
  } = props;
  return (
    <label className="flex flex-col">
      <span className="text-orange-900">{label}</span>
      <div className="relative">
        <input
          className={`border-2 border-gray-300 rounded w-full pl-1${icon ? ' pr-6' : ' pr-1'}`}
          {...restInputProps}
        />
        {!!(icon && onIconClick) && (
          <IconButton
            className="absolute right-0 top-0.5"
            icon={icon}
            onClick={onIconClick}
          />
        )}
        {customIcon && !icon ? customIcon : null}
      </div>
      {inputError && (
        <span className="text-red-500 text-sm" data-testid="input-error">
          {inputError}
        </span>
      )}
    </label>
  );
};
