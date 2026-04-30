/**
 * Accessibility Settings Manager
 * Manages user preferences stored in localStorage
 */

const SETTINGS_KEY = 'pwd_a11y_settings';

const DEFAULT_SETTINGS = {
  theme: 'light', // 'light', 'dark', 'high-contrast'
  fontSize: 'base', // 'sm', 'base', 'lg', 'xl', '2xl'
  textSpacing: 'normal', // 'normal', 'wide'
  enableSpeech: true,
  speechRate: 0.9,
  enableKeyboardNav: true,
  reducedMotion: false,
};

/**
 * Get current settings
 */
export const getSettings = () => {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Failed to load accessibility settings:', error);
    return DEFAULT_SETTINGS;
  }
};

/**
 * Save a single setting
 */
export const saveSetting = (key, value) => {
  try {
    const current = getSettings();
    const updated = { ...current, [key]: value };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    
    // Dispatch event to notify other components
    window.dispatchEvent(
      new CustomEvent('a11ySettingsChanged', { detail: updated })
    );
    
    return updated;
  } catch (error) {
    console.error('Failed to save accessibility setting:', error);
    return null;
  }
};

/**
 * Save multiple settings at once
 */
export const saveSettings = (settings) => {
  try {
    const current = getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    
    // Dispatch event to notify other components
    window.dispatchEvent(
      new CustomEvent('a11ySettingsChanged', { detail: updated })
    );
    
    return updated;
  } catch (error) {
    console.error('Failed to save accessibility settings:', error);
    return null;
  }
};

/**
 * Reset to default settings
 */
export const resetSettings = () => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
    window.dispatchEvent(
      new CustomEvent('a11ySettingsChanged', { detail: DEFAULT_SETTINGS })
    );
    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Failed to reset settings:', error);
    return null;
  }
};

/**
 * Apply settings to document
 */
export const applySettings = (settings) => {
  const root = document.documentElement;

  // Apply theme
  if (settings.theme === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light', 'high-contrast');
  } else if (settings.theme === 'high-contrast') {
    root.classList.add('high-contrast');
    root.classList.remove('light', 'dark');
  } else {
    root.classList.add('light');
    root.classList.remove('dark', 'high-contrast');
  }

  // Apply font size
  root.style.setProperty('--font-size', settings.fontSize);
  root.classList.remove('text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl');
  root.classList.add(`text-${settings.fontSize}`);

  // Apply text spacing
  if (settings.textSpacing === 'wide') {
    root.style.setProperty('--letter-spacing', '0.36px');
    root.style.setProperty('--line-height', '1.8');
  } else {
    root.style.setProperty('--letter-spacing', '0.18px');
    root.style.setProperty('--line-height', '1.45');
  }

  // Apply reduced motion preference
  if (settings.reducedMotion) {
    root.style.setProperty('--animation-duration', '0s');
    root.classList.add('reduce-motion');
  } else {
    root.classList.remove('reduce-motion');
  }
};

/**
 * Initialize settings on app load
 */
export const initializeSettings = () => {
  const settings = getSettings();
  applySettings(settings);
  return settings;
};
