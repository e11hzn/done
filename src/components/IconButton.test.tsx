import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { IconButton } from './IconButton';

const MockIcon = ({ fill }: { fill: string }) => (
  <svg data-testid="mock-icon" fill={fill} />
);

describe('IconButton', () => {
  it('renders without crashing', () => {
    render(<IconButton icon={MockIcon} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<IconButton icon={MockIcon} className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('changes icon fill on hover', () => {
    render(<IconButton icon={MockIcon} />);
    const button = screen.getByRole('button');
    const icon = screen.getByTestId('mock-icon');

    expect(icon).toHaveAttribute('fill', 'black');

    fireEvent.mouseEnter(button);
    expect(icon).toHaveAttribute('fill', '#0078d7');

    fireEvent.mouseLeave(button);
    expect(icon).toHaveAttribute('fill', 'black');
  });

  it('uses iconFill prop when provided', () => {
    render(<IconButton icon={MockIcon} iconFill="red" />);
    const button = screen.getByRole('button');
    const icon = screen.getByTestId('mock-icon');

    expect(icon).toHaveAttribute('fill', 'red');

    fireEvent.mouseEnter(button);
    expect(icon).toHaveAttribute('fill', '#0078d7');

    fireEvent.mouseLeave(button);
    expect(icon).toHaveAttribute('fill', 'red');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<IconButton icon={MockIcon} onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
