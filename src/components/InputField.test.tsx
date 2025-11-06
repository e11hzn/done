import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { InputField } from './InputField';

const MockIcon = ({ fill }: { fill: string }) => (
  <svg data-testid="mock-icon" fill={fill} />
);

describe('InputField', () => {
  it('renders without crashing', () => {
    render(
      <InputField
        disabled
        label="Email"
        placeholder="Enter password"
        type="password"
        value="test@example.com"
      />,
    );

    const input = screen.getByLabelText('Email') as HTMLInputElement;
    expect(input).toBeVisible();
    expect(input.value).toBe('test@example.com');
    expect(input.type).toBe('password');
    expect(input.placeholder).toBe('Enter password');
    expect(input.disabled).toBe(true);
    expect(input).toHaveClass('pr-1');
  });

  it('calls onChange handler when input value changes', () => {
    const handleChange = vi.fn();
    render(<InputField label="Name" onChange={handleChange} />);

    const input = screen.getByLabelText('Name');
    fireEvent.change(input, { target: { value: 'John' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders IconButton when icon and onIconClick are provided', () => {
    const handleIconClick = vi.fn();
    render(
      <InputField
        label="Search"
        icon={MockIcon}
        onIconClick={handleIconClick}
      />,
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleIconClick).toHaveBeenCalledTimes(1);
  });

  it('does not render IconButton when only icon is provided without onIconClick', () => {
    render(<InputField label="Test" icon={MockIcon} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('does not render IconButton when only onIconClick is provided without icon', () => {
    const handleIconClick = vi.fn();
    render(<InputField label="Test" onIconClick={handleIconClick} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders custom icon when provided', () => {
    const customIcon = <div data-testid="custom-icon">Custom</div>;
    render(<InputField label="Test" customIcon={customIcon} />);
    expect(screen.getByTestId('custom-icon')).toBeVisible();
  });

  it('displays error message when inputError is provided', () => {
    render(<InputField label="Email" inputError="Invalid email address" />);
    expect(screen.getByTestId('input-error')).toHaveTextContent(
      'Invalid email address',
    );
  });

  it('does not display error message when inputError is not provided', () => {
    render(<InputField label="Email" />);
    expect(screen.queryByTestId('input-error')).not.toBeInTheDocument();
  });

  it('applies correct padding class when icon is present', () => {
    const handleIconClick = vi.fn();
    render(
      <InputField
        label="Search"
        icon={MockIcon}
        onIconClick={handleIconClick}
      />,
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('pr-6');
  });
});
