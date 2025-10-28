import { render, screen, fireEvent, within } from '@testing-library/react';
import { vi } from 'vitest';
import { LocalePicker } from './LocalePicker';
import { locales } from '@/utils/i18n';
import * as AppProvider from '@/components/AppProvider';

type AppContext = ReturnType<typeof AppProvider.useAppContext>;
type ViMockFn = ReturnType<typeof vi.fn>;

const spyUseAppContext = (
  locale: string = 'en-US',
  setLocale: ViMockFn = vi.fn(),
) => {
  const mockCtx: Pick<AppContext, 'locale' | 'setLocale'> = {
    locale,
    setLocale,
  };
  vi.spyOn(AppProvider, 'useAppContext').mockImplementation(
    () => mockCtx as AppContext,
  );
  return { setLocale };
};

const renderPickerAndGetSelect = () => {
  render(<LocalePicker />);
  return screen.getByRole('combobox');
};

describe('LocalePicker', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a select with all options and selects current locale by default', () => {
    spyUseAppContext('en-US');
    const select = renderPickerAndGetSelect();

    expect(select).toBeInTheDocument();

    const options = within(select).getAllByRole('option');
    expect(options).toHaveLength(locales.length);

    // Ensure each option value is present
    const optionValues = options.map((opt) => (opt as HTMLOptionElement).value);
    const expectedValues = locales.map((l) => l.locale);
    expect(optionValues).toEqual(expectedValues);

    // Spot-check that flag text is rendered for the first option
    expect(options[0]).toHaveTextContent(locales[0].flag);

    // Default selected value should match context locale
    expect((select as HTMLSelectElement).value).toBe('en-US');
  });

  it('calls setLocale when selection changes', () => {
    const { setLocale } = spyUseAppContext('en-US');
    const select = renderPickerAndGetSelect();

    fireEvent.change(select, { target: { value: 'fr-FR' } });

    expect(setLocale).toHaveBeenCalledTimes(1);
    expect(setLocale).toHaveBeenCalledWith('fr-FR');
  });
});
