import { createContext } from 'react'

/**
 * Accessibility Context
 * Manages user preferences for themes, contrast, font sizes, and accessibility features
 * Persists to LocalStorage for seamless user experience
 */
export const A11yContext = createContext()

export const DEFAULT_SETTINGS = {
  theme: 'light', // 'light', 'dark', 'high-contrast'
  fontSize: 'base', // 'xs', 'sm', 'base', 'lg', 'xl', '2xl'
  contrast: 'normal', // 'normal', 'high', 'ultra'
  enableSpeech: true,
  speechRate: 1, // 0.5 to 2.0
  speechVolume: 1, // 0 to 1
  speechPitch: 1, // 0.5 to 2.0
  enableLetterPronunciation: true,
  textSpacing: 'normal', // 'normal', 'wide'
  enableVibration: false,
  reducedMotion: false,
  focusVisible: true,
  reduceFlash: false,
}

export const STORAGE_KEY = 'pwd_a11y_settings'
