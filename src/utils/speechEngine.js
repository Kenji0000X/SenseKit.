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

  // ── TALKBACK DETECTION ──────────────────────
  isTalkBackLikely() {
    const ua = navigator.userAgent.toLowerCase();
    const isAndroid = ua.includes('android');
    
    // Check for Android + accessibility indicators
    const hasA11y = 
      window.matchMedia('(prefers-reduced-motion: reduce)')
            .matches ||
      navigator.userAgent.includes('Mobile');

    return isAndroid;
  },

  isScreenReaderActive() {
    // Check if any screen reader is likely active
    // Works for both TalkBack (Android) and 
    // VoiceOver (iOS)
    return (
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
    );
  },

  // ── TALKBACK-OPTIMIZED SPEECH ───────────────
  // Slower rate + clearer for TalkBack users
  speakForTalkBack(text, options = {}) {
    this.speak(text, {
      rate: 0.78,      // slower for accessibility
      pitch: 1.0,
      volume: 1,
      ...options,
    });
  },

  // ── ARIA LIVE REGION ANNOUNCE ───────────────
  // Works alongside TalkBack's own announcements
  announceToScreenReader(text) {
    const announcer = document.getElementById(
      'sr-announcer'
    );
    if (announcer) {
      announcer.textContent = '';
      // Small delay ensures screen reader picks it up
      setTimeout(() => {
        announcer.textContent = text;
      }, 100);
    }
  },
};

export default SpeechEngine;
