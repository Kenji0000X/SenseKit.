/**
 * Enhanced Speech Synthesis Utility
 * Handles text-to-speech with character-level pronunciation
 * Supports vibration API for haptic feedback
 */

export const speakText = (text, options = {}) => {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech Synthesis API not supported')
    return
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = options.rate || 1
  utterance.pitch = options.pitch || 1
  utterance.volume = options.volume || 1

  if (options.onEnd) {
    utterance.onend = options.onEnd
  }

  if (options.onError) {
    utterance.onerror = options.onError
  }

  window.speechSynthesis.speak(utterance)
}

/**
 * Speak individual character with haptic feedback
 * Useful for letter-by-letter pronunciation while typing
 */
export const speakCharacter = (char, options = {}) => {
  const charName = getCharacterName(char)
  
  speakText(charName, {
    rate: options.rate || 1.2,
    pitch: 1,
    volume: 1,
  })

  // Haptic feedback if enabled and supported
  if (options.enableVibration && 'vibrate' in navigator) {
    navigator.vibrate(50) // 50ms vibration
  }
}

/**
 * Convert character to pronounceable name
 * E.g., 'A' -> 'Capital A', '1' -> 'Number one', ' ' -> 'Space'
 */
export const getCharacterName = (char) => {
  // Uppercase letters
  if (char >= 'A' && char <= 'Z') {
    return `Capital ${char}`
  }

  // Lowercase letters
  if (char >= 'a' && char <= 'z') {
    return char
  }

  // Numbers
  if (char >= '0' && char <= '9') {
    return `Number ${char}`
  }

  // Common punctuation
  const punctuation = {
    '.': 'Period',
    ',': 'Comma',
    '!': 'Exclamation mark',
    '?': 'Question mark',
    ';': 'Semicolon',
    ':': 'Colon',
    "'": 'Apostrophe',
    '"': 'Quotation mark',
    '-': 'Hyphen',
    '_': 'Underscore',
    '/': 'Forward slash',
    '\\': 'Backslash',
    '(': 'Left parenthesis',
    ')': 'Right parenthesis',
    '[': 'Left bracket',
    ']': 'Right bracket',
    '{': 'Left brace',
    '}': 'Right brace',
    '@': 'At sign',
    '#': 'Hash',
    '$': 'Dollar sign',
    '%': 'Percent sign',
    '&': 'Ampersand',
    '*': 'Asterisk',
    '+': 'Plus sign',
    '=': 'Equals sign',
    '<': 'Less than',
    '>': 'Greater than',
    '~': 'Tilde',
    '`': 'Backtick',
    ' ': 'Space',
  }

  return punctuation[char] || char
}

export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
}

export const isSpeechSynthesisSupported = () => {
  return 'speechSynthesis' in window
}

export const isVibrationSupported = () => {
  return 'vibrate' in navigator
}

/**
 * Get available voices for speech synthesis
 */
export const getAvailableVoices = () => {
  if (!('speechSynthesis' in window)) return []
  return window.speechSynthesis.getVoices()
}
