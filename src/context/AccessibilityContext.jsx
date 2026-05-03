import { 
  createContext, 
  useContext, 
  useState, 
  useEffect 
} from 'react';
import SpeechEngine from '../utils/speechEngine';

const AccessibilityContext = createContext(null);

export function AccessibilityProvider({ children }) {

  const [visionMode, setVisionMode] = useState(() => {
    return localStorage.getItem('sensekit-vision') 
      === 'true';
  });

  const [deafMode, setDeafMode] = useState(() => {
    return localStorage.getItem('sensekit-deaf') 
      === 'true';
  });

  // ── VISION MODE EFFECT ─────────────────────
  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('sensekit-vision', visionMode);

    if (visionMode) {
      root.classList.add('vision-mode');
      root.setAttribute('data-vision', 'true');

      // Announce to screen reader
      SpeechEngine.announceToScreenReader(
        'Vision mode enabled. ' +
        'High contrast and large text activated.'
      );
      if (!deafMode) {
        SpeechEngine.speak(
          'Vision mode enabled. ' +
          'High contrast and large text activated.',
          { rate: 0.88 }
        );
      }
    } else {
      root.classList.remove('vision-mode');
      root.removeAttribute('data-vision');

      if (!deafMode) {
        SpeechEngine.speak('Vision mode disabled.');
      }
    }
  }, [visionMode, deafMode]);

  // ── DEAF MODE EFFECT ───────────────────────
  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('sensekit-deaf', deafMode);

    if (deafMode) {
      root.classList.add('deaf-mode');
      root.setAttribute('data-deaf', 'true');

      // Stop all speech immediately
      SpeechEngine.stop();

      // Show visual notification instead
      showVisualAlert(
        '🔇 Deaf Mode ON — Audio disabled. Visual alerts active.'
      );
    } else {
      root.classList.remove('deaf-mode');
      root.removeAttribute('data-deaf');

      if (!visionMode) {
        SpeechEngine.speak('Deaf mode disabled. Audio restored.');
      }
    }
  }, [deafMode, visionMode]);

  // ── VISION MODE TOGGLE ─────────────────────
  const toggleVisionMode = () => {
    setVisionMode(prev => !prev);
  };

  // ── DEAF MODE TOGGLE ───────────────────────
  const toggleDeafMode = () => {
    setDeafMode(prev => !prev);
  };

  // ── SAFE SPEAK: respects deaf mode ─────────
  // Use this instead of SpeechEngine.speak() 
  // everywhere in the app
  const safeSpeech = (text, options = {}) => {
    if (deafMode) {
      // Don't speak — show visual caption instead
      showVisualCaption(text);
      return;
    }
    SpeechEngine.speak(text, options);
  };

  // ── VISUAL CAPTION (for deaf mode) ─────────
  const showVisualCaption = (text) => {
    const caption = document.getElementById(
      'visual-caption'
    );
    if (!caption) return;
    caption.textContent = text;
    caption.classList.add('caption-show');
    clearTimeout(caption._timer);
    caption._timer = setTimeout(() => {
      caption.classList.remove('caption-show');
    }, 4000);
  };

  // ── VISUAL ALERT (flash for deaf mode) ─────
  const showVisualAlert = (text) => {
    showVisualCaption(text);
    const flash = document.getElementById('visual-flash');
    if (!flash) return;
    flash.classList.add('flash-active');
    setTimeout(() => {
      flash.classList.remove('flash-active');
    }, 600);
  };

  return (
    <AccessibilityContext.Provider value={{
      visionMode,
      deafMode,
      toggleVisionMode,
      toggleDeafMode,
      safeSpeech,
      showVisualCaption,
      showVisualAlert,
    }}>

      {/* Global visual flash overlay for deaf mode */}
      <div 
        id="visual-flash" 
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(74,143,255,0.3)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          transition: 'opacity 0.2s ease'
        }}
      />

      {/* Global visual caption bar for deaf mode */}
      <div
        id="visual-caption"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%) translateY(20px)',
          background: 'rgba(0,0,0,0.95)',
          color: '#ffffff',
          border: '2px solid #4a8fff',
          borderRadius: '12px',
          padding: '16px 24px',
          fontSize: '1rem',
          fontWeight: '600',
          maxWidth: 'min(500px, 90vw)',
          textAlign: 'center',
          zIndex: 10000,
          pointerEvents: 'none',
          opacity: 0,
          transition: 'all 0.3s ease',
          lineHeight: 1.4,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
        }}
      />

      {/* Screen reader announcer (shared) */}
      <div
        id="sr-announcer"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      {children}
    </AccessibilityContext.Provider>
  );
}

// Hook to use in any component
export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error(
    'useAccessibility must be inside AccessibilityProvider'
  );
  return ctx;
}
