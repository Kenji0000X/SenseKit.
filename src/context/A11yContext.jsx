import React, { useState, useEffect, useCallback } from 'react'
import { A11yContext, DEFAULT_SETTINGS, STORAGE_KEY } from './A11yContextCreate'

/**
 * Lazy initializer function for settings
 */
const loadInitialSettings = () => {
  const savedSettings = localStorage.getItem(STORAGE_KEY)
  if (savedSettings) {
    try {
      const parsed = JSON.parse(savedSettings)
      return { ...DEFAULT_SETTINGS, ...parsed }
    } catch (error) {
      console.error('Failed to parse saved settings:', error)
      return DEFAULT_SETTINGS
    }
  }
  return DEFAULT_SETTINGS
}

export function A11yProvider({ children }) {
  const [settings, setSettings] = useState(loadInitialSettings)

  // Apply theme class to document root
  useEffect(() => {
    const root = document.documentElement
    
    // Remove all theme classes first
    root.classList.remove('theme-light', 'theme-dark', 'theme-high-contrast')
    
    // Apply the selected theme class
    if (settings.theme === 'light') {
      root.classList.add('theme-light')
    } else if (settings.theme === 'high-contrast') {
      root.classList.add('theme-high-contrast')
    } else {
      root.classList.add('theme-dark')
    }
  }, [settings.theme])

  // Apply settings to document attributes
  useEffect(() => {
    const root = document.documentElement
    
    // Apply contrast level
    root.setAttribute('data-contrast', settings.contrast)
    
    // Apply font size - BOTH attribute AND inline style for reliability
    root.setAttribute('data-font-size', settings.fontSize)
    
    // Map font size to pixel value
    const fontSizeMap = {
      'sm': '14px',
      'base': '16px',
      'lg': '18px'
    }
    const pixelSize = fontSizeMap[settings.fontSize] || '16px'
    root.style.fontSize = pixelSize
    
    // Apply text spacing
    root.setAttribute('data-text-spacing', settings.textSpacing)
    
    // Apply motion preferences
    if (settings.reducedMotion) {
      root.setAttribute('data-reduce-motion', 'true')
    } else {
      root.removeAttribute('data-reduce-motion')
    }
  }, [settings])

  const updateSetting = useCallback((key, value) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: value }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      window.dispatchEvent(
        new CustomEvent('a11ySettingsChanged', { detail: updated })
      )
      return updated
    })
  }, [])

  const updateSettings = useCallback((newSettings) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      window.dispatchEvent(
        new CustomEvent('a11ySettingsChanged', { detail: updated })
      )
      return updated
    })
  }, [])

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS))
    window.dispatchEvent(
      new CustomEvent('a11ySettingsChanged', { detail: DEFAULT_SETTINGS })
    )
  }, [])

  const value = {
    settings,
    updateSetting,
    updateSettings,
    resetSettings,
  }

  return (
    <A11yContext.Provider value={value}>
      {children}
    </A11yContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useA11y() {
  const context = React.useContext(A11yContext)
  if (!context) {
    throw new Error('useA11y must be used within A11yProvider')
  }
  return context
}

// Re-export context for convenience
export { A11yContext }
