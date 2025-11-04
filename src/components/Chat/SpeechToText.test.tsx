import { screen, fireEvent, waitFor, act } from '@testing-library/react';
import { SpeechToText, type SpeechToTextProps } from './SpeechToText';
import { renderWithProvider } from '@/test-utils/renderWithProvider';

const renderComponent = (props: SpeechToTextProps) =>
  renderWithProvider(<SpeechToText {...props} />);

type SpeechRecognitionLike = {
  continuous: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  start: ReturnType<typeof vi.fn>;
  stop: ReturnType<typeof vi.fn>;
};

const unsetSpeechRecognition = () => {
  delete (window as unknown as { SpeechRecognition?: unknown })
    .SpeechRecognition;
  delete (window as unknown as { webkitSpeechRecognition?: unknown })
    .webkitSpeechRecognition;
};

const mockSpeechRecognitionConstructor = () => {
  let recognitionInstance: SpeechRecognitionLike | null = null;

  const createRecognition = (): SpeechRecognitionLike => ({
    continuous: false,
    lang: '',
    onresult: null,
    onerror: null,
    start: vi.fn(),
    stop: vi.fn(),
  });

  const SpeechRecognitionMock = vi.fn(function MockSpeechRecognition(
    this: unknown,
  ) {
    const instance = createRecognition();
    recognitionInstance = instance;
    return instance as unknown as SpeechRecognition;
  });

  type SpeechRecognitionConstructor = new () => SpeechRecognition;
  (
    window as unknown as { SpeechRecognition?: SpeechRecognitionConstructor }
  ).SpeechRecognition =
    SpeechRecognitionMock as unknown as SpeechRecognitionConstructor;

  return {
    recognitionInstance: () => recognitionInstance,
    SpeechRecognitionMock,
  };
};

describe('SpeechToText', () => {
  afterEach(() => {
    unsetSpeechRecognition();
    vi.restoreAllMocks();
  });

  it('returns null when the browser does not support speech recognition', () => {
    unsetSpeechRecognition();

    renderComponent({ onSpeechEnd: vi.fn() });

    expect(screen.queryByRole('button', { name: /microphone/i })).toBeNull();
  });

  it('starts recording, handles results, and reports errors', async () => {
    const { recognitionInstance, SpeechRecognitionMock } =
      mockSpeechRecognitionConstructor();

    const onSpeechEnd = vi.fn();
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const { rerender } = renderComponent({ onSpeechEnd });

    const button = await screen.findByRole('button', { name: /microphone/i });
    const recognition = recognitionInstance();
    if (!recognition) throw new Error('SpeechRecognition was not initialised');

    expect(recognition.continuous).toBe(true);
    expect(recognition.lang).toBe('en-US');

    fireEvent.click(button);
    expect(recognition.start).toHaveBeenCalled();

    await waitFor(() => {
      const path = button.querySelector('path');
      expect(path).not.toBeNull();
      expect(path).toHaveStyle({ fill: 'green' });
    });

    act(() => {
      recognition.onresult?.({
        resultIndex: 0,
        results: [
          {
            isFinal: false,
            0: { transcript: 'ignore me' },
            length: 1,
          },
        ],
      } as unknown as SpeechRecognitionEvent);
    });
    expect(onSpeechEnd).not.toHaveBeenCalled();
    expect(recognition.stop).not.toHaveBeenCalled();

    const transcript = 'hello from playwright';
    act(() => {
      recognition.onresult?.({
        resultIndex: 0,
        results: [
          {
            isFinal: true,
            0: { transcript },
            length: 1,
          },
        ],
      } as unknown as SpeechRecognitionEvent);
    });

    await waitFor(() => {
      expect(onSpeechEnd).toHaveBeenCalledWith(transcript);
      expect(recognition.stop).toHaveBeenCalled();
      const path = button.querySelector('path');
      expect(path).not.toBeNull();
      expect(path).toHaveStyle({ fill: 'black' });
    });

    act(() => {
      recognition.onerror?.({
        error: 'network',
      } as SpeechRecognitionErrorEvent);
    });

    expect(consoleError).toHaveBeenCalledWith(
      'Speech recognition error:',
      'network',
    );

    const nextOnSpeechEnd = vi.fn();
    rerender(<SpeechToText onSpeechEnd={nextOnSpeechEnd} />);
    expect(SpeechRecognitionMock).toHaveBeenCalledTimes(1);
  });
});
