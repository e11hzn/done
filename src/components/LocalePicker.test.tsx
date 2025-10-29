import { screen, fireEvent, within, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { LocalePicker } from './LocalePicker';
import { locales } from '@/utils/i18n';
import { renderWithProvider } from '@/test-utils/renderWithProvider';
import { setClientCookieConfig } from '@/utils/cookieClient';

vi.mock('@/utils/cookieClient', () => ({
  COOKIE_KEY: 'done-todos-config',
  getClientCookieConfig: vi.fn(),
  setClientCookieConfig: vi.fn().mockResolvedValue(undefined),
}));

const renderPickerAndGetSelect = () => {
  renderWithProvider(<LocalePicker />);

  return screen.getByRole('combobox') as HTMLSelectElement;
};

describe('LocalePicker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders a select with all options and selects current locale by default', () => {
    const select = renderPickerAndGetSelect();

    expect(select).toBeInTheDocument();

    const options = within(select).getAllByRole('option');
    expect(options).toHaveLength(locales.length);

    const optionValues = options.map((opt) => (opt as HTMLOptionElement).value);
    const expectedValues = locales.map((l) => l.locale);
    expect(optionValues).toEqual(expectedValues);

    expect(options[0]).toHaveTextContent(locales[0].flag);
    expect(select.value).toBe('en-US');
  });

  it('updates locale in the store when selection changes', async () => {
    const select = renderPickerAndGetSelect();

    fireEvent.change(select, { target: { value: 'fr-FR' } });

    await waitFor(() => expect(select.value).toBe('fr-FR'));
    expect(setClientCookieConfig).toHaveBeenCalledWith({ locale: 'fr-FR' });
  });
});
