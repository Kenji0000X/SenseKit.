const SpeechEngine = {
  
  // ── CORE SPEAK FUNCTION ─────────────────────
  speak(text, options = {}) {
    if (!window.speechSynthesis) return;

    // Cancel any current speech first
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Defaults — good for accessibility
    utterance.rate   = options.rate   ?? 0.9;
    utterance.pitch  = options.pitch  ?? 1;
    utterance.volume = options.volume ?? 1;
    utterance.lang   = options.lang   ?? 'en-US';

    // Pick best available voice
    const voices = window.speechSynthesis.getVoices();
    const preferred = 
      voices.find(v => v.name.includes('Google') && v.lang.startsWith('en')) ||
      voices.find(v => v.lang.startsWith('en') && v.localService) ||
      voices.find(v => v.lang.startsWith('en')) ||
      voices[0];

    if (preferred) utterance.voice = preferred;

    // Callbacks
    utterance.onstart  = options.onStart  ?? null;
    utterance.onend    = options.onEnd    ?? null;
    utterance.onerror  = options.onError  ?? null;

    window.speechSynthesis.speak(utterance);
    return utterance;
  },

  // ── STOP ALL SPEECH ─────────────────────────
  stop() {
    window.speechSynthesis?.cancel();
  },

  // ── PAUSE / RESUME ──────────────────────────
  pause()  { window.speechSynthesis?.pause(); },
  resume() { window.speechSynthesis?.resume(); },

  // ── IS SPEAKING CHECK ────────────────────────
  isSpeaking() {
    return window.speechSynthesis?.speaking ?? false;
  },

  // ── PRELOAD VOICES ───────────────────────────
  preload() {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  },
};

export default SpeechEngine;
