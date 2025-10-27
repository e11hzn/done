'use client';

import { startTransition, useEffect, useRef, useState } from 'react';
import { useAppContext } from '../AppProvider';
import { IconButton } from '../IconButton';
import { MicrophoneIcon } from '@/icons/MicrophoneIcon';

export type SpeechToTextProps = {
  className?: string;
  onSpeechEnd: (transcript: string) => void;
};

export const SpeechToText = ({
  className = '',
  onSpeechEnd,
}: SpeechToTextProps) => {
  const { locale } = useAppContext();
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;

    hasInitialized.current = true;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      startTransition(() => {
        setShowComponent(true);
      });
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = locale;

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          recognitionRef.current?.stop();
          setIsRecording(false);
          onSpeechEnd(event.results[i][0].transcript);
        }
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognitionRef.current = recognition;
  }, [locale, onSpeechEnd]);

  if (!showComponent) {
    return null;
  }

  const onCaptureStart = () => {
    recognitionRef.current?.start();
    setIsRecording(true);
  };

  return (
    <IconButton
      className={className}
      icon={MicrophoneIcon}
      iconFill={isRecording ? 'green' : undefined}
      onClick={onCaptureStart}
      type="button"
    />
  );
};
