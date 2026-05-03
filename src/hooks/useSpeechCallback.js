import { useCallback } from 'react';
import SpeechEngine from '../utils/speechEngine';

export function useSpeechCallback() {

  // Speak any text on demand
  const speak = useCallback((text, options) => {
    SpeechEngine.speak(text, options);
  }, []);

  // Speak on click — attach to any element
  const speakOnClick = useCallback((text) => ({
    onClick: () => SpeechEngine.speak(text),
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        SpeechEngine.speak(text);
      }
    },
  }), []);

  return { speak, speakOnClick, stop: SpeechEngine.stop };
}
