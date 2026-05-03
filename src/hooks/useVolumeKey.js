import { useEffect, useRef } from 'react';
import SpeechEngine from '../utils/speechEngine';

export function useVolumeKey({ 
  cards = [],      // array of {title, description}
  pageTitle = '',  // current page/section title
  elements = [],   // extra elements to cycle through
}) {

  const currentIndex = useRef(0);
  const allItems = useRef([]);

  // Build the full list of speakable items
  useEffect(() => {
    allItems.current = [
      pageTitle && { text: pageTitle, type: 'title' },
      ...cards.map(c => ({
        text: `${c.title}. ${c.description}`,
        type: 'card',
      })),
      ...elements.map(e => ({
        text: e,
        type: 'element',
      })),
    ].filter(Boolean);
  }, [cards, pageTitle, elements]);

  useEffect(() => {
    let lastVolume = null;

    const handleVolumeKey = (e) => {
      // MediaSession API for volume keys
      // Works on Android Chrome
      if (e.type === 'keydown') {
        
        // Volume Up → speak NEXT item
        if (e.key === 'AudioVolumeUp' || 
            e.key === 'VolumeUp' ||
            e.keyCode === 175) {
          e.preventDefault();
          
          const items = allItems.current;
          if (!items.length) return;

          // Move to next item
          currentIndex.current = 
            (currentIndex.current + 1) % items.length;

          const item = items[currentIndex.current];
          SpeechEngine.speak(item.text, { rate: 0.9 });
        }

        // Volume Down → speak PREVIOUS item
        if (e.key === 'AudioVolumeDown' || 
            e.key === 'VolumeDown' ||
            e.keyCode === 174) {
          e.preventDefault();

          const items = allItems.current;
          if (!items.length) return;

          // Move to previous item
          currentIndex.current = 
            (currentIndex.current - 1 + items.length) 
            % items.length;

          const item = items[currentIndex.current];
          SpeechEngine.speak(item.text, { rate: 0.9 });
        }

        // Volume Mute → stop all speech
        if (e.key === 'AudioVolumeMute' ||
            e.keyCode === 173) {
          e.preventDefault();
          SpeechEngine.stop();
          currentIndex.current = 0;
        }
      }
    };

    // Also handle via MediaSession API for 
    // better mobile support
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler(
        'nexttrack', () => {
          const items = allItems.current;
          if (!items.length) return;
          currentIndex.current = 
            (currentIndex.current + 1) % items.length;
          SpeechEngine.speak(
            items[currentIndex.current].text
          );
        }
      );
      navigator.mediaSession.setActionHandler(
        'previoustrack', () => {
          const items = allItems.current;
          if (!items.length) return;
          currentIndex.current = 
            (currentIndex.current - 1 + items.length) 
            % items.length;
          SpeechEngine.speak(
            items[currentIndex.current].text
          );
        }
      );
    }

    window.addEventListener('keydown', handleVolumeKey);
    return () => {
      window.removeEventListener('keydown', handleVolumeKey);
    };
  }, []);

  // Reset index when cards change
  const resetIndex = () => { currentIndex.current = 0; };

  return { resetIndex };
}
