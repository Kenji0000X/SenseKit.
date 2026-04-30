/**
 * Speech Synthesis Helper
 * Provides text-to-speech functionality for accessibility
 */

export const speakText = (text, options = {}) => {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech Synthesis API not supported in this browser');
    return;
  }

  // Cancel any ongoing speech first
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set speech options (with defaults)
  utterance.rate = options.rate || 0.9; // Slightly slower for better clarity
  utterance.pitch = options.pitch || 1;
  utterance.volume = options.volume || 1;

  // Optional: Handle completion
  if (options.onEnd) {
    utterance.onend = options.onEnd;
  }

  // Optional: Handle errors
  if (options.onError) {
    utterance.onerror = options.onError;
  }

  window.speechSynthesis.speak(utterance);
};

/**
 * Stop any ongoing speech
 */
export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

/**
 * Check if Speech Synthesis is supported
 */
export const isSpeechSynthesisSupported = () => {
  return 'speechSynthesis' in window;
};

/**
 * Get available voices
 */
export const getAvailableVoices = () => {
  if (!('speechSynthesis' in window)) return [];
  return window.speechSynthesis.getVoices();
};

/**
 * Set voice for speech synthesis
 */
export const setVoice = (voiceIndex = 0) => {
  if (!('speechSynthesis' in window)) return;
  
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > voiceIndex) {
    return voices[voiceIndex];
  }
  return null;
};
