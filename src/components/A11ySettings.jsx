import { useState, useContext } from 'react'
import { X, Monitor, Volume2, Shield } from 'lucide-react'
import { A11yContext } from '../context/A11yContext'
import SpeechEngine from '../utils/speechEngine'

/**
 * A11ySettings Component
 * WCAG 2.1 AA Compliant Settings Panel with proper contrast, focus states, and accessibility
 */
export default function A11ySettings({ isOpen, onClose }) {
  const { settings, updateSetting, resetSettings } = useContext(A11yContext)
  const [activeTab, setActiveTab] = useState('display')

  const handleSettingChange = (key, value) => {
    updateSetting(key, value)
  }

  const handleReset = () => {
    if (confirm('Reset all settings to defaults?')) {
      resetSettings()
      SpeechEngine.speak('Settings reset to defaults')
    }
  }

  const handleClose = () => {
    onClose()
    SpeechEngine.speak('Settings saved and closed')
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    SpeechEngine.speak(`${tab} settings tab selected`)
  }

  const handleReducedMotionChange = (checked) => {
    handleSettingChange('reducedMotion', checked)
    SpeechEngine.speak(`Reduce motion ${checked ? 'enabled' : 'disabled'}`)
  }

  const handleFocusVisibleChange = (checked) => {
    handleSettingChange('focusVisible', checked)
    SpeechEngine.speak(`Focus indicators ${checked ? 'enabled' : 'disabled'}`)
  }

  const tabs = [
    { id: 'display', label: 'Display', icon: Monitor },
    { id: 'audio', label: 'Audio', icon: Volume2 },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ]

  if (!isOpen) return null

  return (
    <>
      {/* WCAG AA Compliant Backdrop/Scrim: Semi-transparent dark background */}
      <div
        style={{ 
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          transition: 'opacity 0.2s ease-out',
        }}
        onClick={handleClose}
        aria-hidden="true"
        role="presentation"
      />

      {/* Settings Panel Container: WCAG AA compliant dark theme */}
      <div
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          width: '280px',
          background: 'var(--color-bg-panel, #1a1f2e)',
          boxShadow: '4px 0 24px rgba(0,0,0,0.8)',
          transition: 'transform 0.3s ease-out',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--color-border, #2d3a52)' }}>
          <h2 
            id="settings-title" 
            className="text-lg font-bold"
            style={{ color: 'var(--color-text-primary, #e2e8f0)' }}
          >
            Settings
          </h2>
          {/* Close Button: 40x40px minimum touch target, WCAG AA compliant */}
          <button
            onClick={handleClose}
            className="p-2 rounded transition-colors focus-visible:ring-2 focus-visible:ring-offset-1"
            style={{
              width: '40px',
              height: '40px',
              minWidth: '40px',
              minHeight: '40px',
              backgroundColor: 'var(--color-bg-input, #2d3348)',
              color: 'var(--color-text-primary, #e2e8f0)',
              focusVisibleOutlineColor: 'var(--color-primary, #4a90d9)',
            }}
            aria-label="Close settings"
            title="Close settings (Escape)"
            onKeyDown={(e) => e.key === 'Escape' && handleClose()}
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b p-2" style={{ borderColor: 'var(--color-border, #2d3a52)' }}>
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-t transition-colors focus-visible:ring-2"
                style={{
                  backgroundColor: isActive ? 'rgba(74, 144, 217, 0.2)' : 'transparent',
                  color: isActive ? 'var(--color-primary, #4a90d9)' : 'var(--color-text-muted, #8a9ab5)',
                  fontWeight: isActive ? '600' : '500',
                  borderBottom: isActive ? '2px solid var(--color-primary, #4a90d9)' : 'none',
                  marginBottom: '-2px',
                }}
                aria-selected={isActive}
                role="tab"
              >
                <Icon className="w-4 h-4" strokeWidth={2} />
                <span className="text-sm">{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Display Tab */}
          {activeTab === 'display' && (
            <div className="space-y-6">
              {/* Theme Section */}
              <div>
                <h3 
                  className="text-xs font-bold uppercase tracking-wider mb-4"
                  style={{
                    color: 'var(--color-text-label, #c8d0e0)',
                    letterSpacing: '0.08em',
                    opacity: 1,
                    padding: '0 0 6px 0',
                  }}
                >
                  Theme
                </h3>
                <div className="space-y-2">
                  {[
                    { value: 'light', label: 'Light' },
                    { value: 'dark', label: 'Dark' },
                    { value: 'high-contrast', label: 'High Contrast' },
                  ].map((theme) => (
                    <label
                      key={theme.value}
                      className="flex items-center gap-3 p-3 rounded cursor-pointer transition-colors"
                      style={{
                        backgroundColor: 'transparent',
                        border: `1px solid var(--color-border, #2d3a52)`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(74, 144, 217, 0.1)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }}
                    >
                      {/* Custom Radio Button */}
                      <div
                        className="relative flex items-center justify-center flex-shrink-0"
                        style={{
                          width: '18px',
                          height: '18px',
                          border: settings.theme === theme.value 
                            ? '2px solid var(--color-primary, #4a90d9)' 
                            : '2px solid var(--color-border-subtle, #4a5568)',
                          borderRadius: '50%',
                          backgroundColor: 'transparent',
                          transition: 'all 0.2s',
                        }}
                      >
                        {settings.theme === theme.value && (
                          <div
                            style={{
                              width: '10px',
                              height: '10px',
                              backgroundColor: 'var(--color-primary, #4a90d9)',
                              borderRadius: '50%',
                            }}
                          />
                        )}
                      </div>
                      <input
                        type="radio"
                        name="theme"
                        value={theme.value}
                        checked={settings.theme === theme.value}
                        onChange={(e) => {
                          handleSettingChange('theme', e.target.value)
                          SpeechEngine.speak(`Theme changed to ${theme.label}`)
                        }}
                        className="sr-only"
                        onFocus={(e) => {
                          e.currentTarget.parentElement.style.outline = '2px solid var(--color-primary, #4a90d9)'
                          e.currentTarget.parentElement.style.outlineOffset = '2px'
                        }}
                        onBlur={(e) => {
                          e.currentTarget.parentElement.style.outline = 'none'
                        }}
                      />
                      <span 
                        className="font-medium text-sm"
                        style={{ color: 'var(--color-text-primary, #e2e8f0)' }}
                      >
                        {theme.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Font Size Section */}
              <div style={{ paddingTop: '16px', borderTop: `1px solid var(--color-border, #2d3a52)` }}>
                <h3 
                  className="text-xs font-bold uppercase tracking-wider mb-3"
                  style={{
                    color: 'var(--color-text-label, #c8d0e0)',
                    letterSpacing: '0.08em',
                  }}
                >
                  Font Size
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {['xs', 'sm', 'base', 'lg', 'xl', '2xl'].map((size) => {
                    const isSelected = settings.fontSize === size
                    return (
                      <button
                        key={size}
                        onClick={() => {
                          handleSettingChange('fontSize', size)
                          const sizeLabel = size === 'xs' ? 'Extra Small' : size === 'sm' ? 'Small' : size === 'base' ? 'Medium' : size === 'lg' ? 'Large' : size === 'xl' ? 'Extra Large' : 'Extra Extra Large'
                          SpeechEngine.speak(`Font size set to ${sizeLabel}`)
                        }}
                        className="px-2 py-2 rounded text-sm font-medium transition-all focus-visible:ring-2"
                        style={{
                          backgroundColor: isSelected 
                            ? 'var(--color-primary, #4a90d9)' 
                            : 'var(--color-bg-input, #2d3348)',
                          color: isSelected
                            ? '#ffffff'
                            : 'var(--color-text-muted, #8a9ab5)',
                          border: isSelected
                            ? `1px solid var(--color-primary, #4a90d9)`
                            : `1px solid var(--color-button-inactive, #3d4563)`,
                          cursor: 'pointer',
                        }}
                        aria-pressed={isSelected}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = 'var(--color-bg-hover, #374060)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = 'var(--color-bg-input, #2d3348)'
                          }
                        }}
                      >
                        {size === 'xs' && 'XS'}
                        {size === 'sm' && 'S'}
                        {size === 'base' && 'M'}
                        {size === 'lg' && 'L'}
                        {size === 'xl' && 'XL'}
                        {size === '2xl' && 'XXL'}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Contrast Section */}
              <div style={{ paddingTop: '16px', borderTop: `1px solid var(--color-border, #2d3a52)` }}>
                <h3 
                  className="text-xs font-bold uppercase tracking-wider mb-3"
                  style={{
                    color: 'var(--color-text-label, #c8d0e0)',
                    letterSpacing: '0.08em',
                  }}
                >
                  Contrast
                </h3>
                <select
                  value={settings.contrast}
                  onChange={(e) => {
                    handleSettingChange('contrast', e.target.value)
                    const contrastLabel = e.target.value === 'normal' ? 'Normal' : e.target.value === 'high' ? 'High, WCAG AA' : 'Ultra, WCAG AAA'
                    SpeechEngine.speak(`Contrast set to ${contrastLabel}`)
                  }}
                  className="w-full px-3 py-2 rounded text-sm font-medium focus-visible:ring-2 transition-colors"
                  style={{
                    backgroundColor: 'var(--color-bg-input, #2d3348)',
                    color: 'var(--color-text-primary, #e2e8f0)',
                    border: `1px solid var(--color-border-subtle, #4a5568)`,
                    borderRadius: '4px',
                  }}
                  aria-label="Select contrast level"
                >
                  <option value="normal">Normal</option>
                  <option value="high">High (WCAG AA)</option>
                  <option value="ultra">Ultra (WCAG AAA)</option>
                </select>
              </div>

              {/* Text Spacing Section */}
              <div style={{ paddingTop: '16px', borderTop: `1px solid var(--color-border, #2d3a52)` }}>
                <h3 
                  className="text-xs font-bold uppercase tracking-wider mb-3"
                  style={{
                    color: 'var(--color-text-label, #c8d0e0)',
                    letterSpacing: '0.08em',
                  }}
                >
                  Text Spacing
                </h3>
                <div className="flex gap-2">
                  {['normal', 'wide'].map((spacing) => {
                    const isSelected = settings.textSpacing === spacing
                    return (
                      <button
                        key={spacing}
                        onClick={() => {
                          handleSettingChange('textSpacing', spacing)
                          SpeechEngine.speak(`Text spacing set to ${spacing === 'normal' ? 'Normal' : 'Wide'}`)
                        }}
                        className="flex-1 px-4 py-2 rounded font-medium transition-all focus-visible:ring-2"
                        style={{
                          backgroundColor: isSelected
                            ? 'var(--color-primary, #4a90d9)'
                            : 'var(--color-bg-input, #2d3348)',
                          color: isSelected
                            ? '#ffffff'
                            : 'var(--color-text-muted, #8a9ab5)',
                          border: isSelected
                            ? `1px solid var(--color-primary, #4a90d9)`
                            : `1px solid var(--color-button-inactive, #3d4563)`,
                          cursor: 'pointer',
                        }}
                        aria-pressed={isSelected}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = 'var(--color-bg-hover, #374060)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = 'var(--color-bg-input, #2d3348)'
                          }
                        }}
                      >
                        {spacing === 'normal' ? 'Normal' : 'Wide'}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Toggle Options */}
              <div style={{ paddingTop: '16px', borderTop: `1px solid var(--color-border, #2d3a52)` }} className="space-y-3">
                <ToggleRow
                  label="Reduce Motion"
                  description="Minimize animations"
                  checked={settings.reducedMotion}
                  onChange={handleReducedMotionChange}
                />
                <ToggleRow
                  label="Focus Visible"
                  description="Show focus indicators"
                  checked={settings.focusVisible}
                  onChange={handleFocusVisibleChange}
                />
              </div>
            </div>
          )}

          {/* Audio Tab */}
          {activeTab === 'audio' && (
            <div className="space-y-6">
              {/* Speech Rate */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold" style={{ color: 'var(--color-text-primary, #e2e8f0)' }}>
                    Speech Rate
                  </label>
                  <span style={{ color: 'var(--color-primary, #4a90d9)', fontWeight: 'bold', fontSize: '0.875rem' }}>
                    {settings.speechRate.toFixed(1)}x
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={settings.speechRate}
                  onChange={(e) => handleSettingChange('speechRate', parseFloat(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: 'var(--color-bg-input, #2d3348)',
                    accentColor: 'var(--color-primary, #4a90d9)',
                  }}
                  aria-label="Adjust speech rate"
                />
                <div className="flex justify-between text-xs mt-2" style={{ color: 'var(--color-text-muted, #8a9ab5)' }}>
                  <span>0.5x (slow)</span>
                  <span>2.0x (fast)</span>
                </div>
              </div>

              {/* Volume */}
              <div style={{ paddingTop: '16px', borderTop: `1px solid var(--color-border, #2d3a52)` }}>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold" style={{ color: 'var(--color-text-primary, #e2e8f0)' }}>
                    Volume
                  </label>
                  <span style={{ color: 'var(--color-primary, #4a90d9)', fontWeight: 'bold', fontSize: '0.875rem' }}>
                    {Math.round(settings.speechVolume * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.speechVolume}
                  onChange={(e) => handleSettingChange('speechVolume', parseFloat(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: 'var(--color-bg-input, #2d3348)',
                    accentColor: 'var(--color-primary, #4a90d9)',
                  }}
                  aria-label="Adjust volume"
                />
              </div>

              {/* Speech Toggles */}
              <div style={{ paddingTop: '16px', borderTop: `1px solid var(--color-border, #2d3a52)` }} className="space-y-3">
                <ToggleRow
                  label="Enable Speech"
                  description="Text-to-speech feedback"
                  checked={settings.enableSpeech}
                  onChange={(checked) => handleSettingChange('enableSpeech', checked)}
                />
                <ToggleRow
                  label="Letter Pronunciation"
                  description="Speak each letter typed"
                  checked={settings.enableLetterPronunciation}
                  onChange={(checked) => handleSettingChange('enableLetterPronunciation', checked)}
                />
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div 
                className="p-4 rounded-lg text-sm"
                style={{
                  backgroundColor: 'rgba(74, 144, 217, 0.1)',
                  border: `1px solid var(--color-border, #2d3a52)`,
                  color: 'var(--color-text-secondary, #a0b0c8)',
                }}
              >
                <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary, #e2e8f0)' }}>
                  Data Privacy
                </h3>
                <p>All data stays on your device. No tracking, no telemetry, no external API calls.</p>
              </div>

              <div style={{ paddingTop: '16px', borderTop: `1px solid var(--color-border, #2d3a52)` }}>
                <ToggleRow
                  label="Haptic Feedback"
                  description="Vibration on supported devices"
                  checked={settings.enableVibration}
                  onChange={(checked) => handleSettingChange('enableVibration', checked)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div 
          className="flex gap-3 p-4 border-t"
          style={{ borderColor: 'var(--color-border, #2d3a52)' }}
        >
          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2 text-sm font-medium rounded transition-all focus-visible:ring-2"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--color-danger, #fc8181)',
              border: `1px solid var(--color-danger, #fc8181)`,
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(252, 129, 129, 0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
            aria-label="Reset all settings to defaults"
          >
            Reset
          </button>

          {/* Done Button */}
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 text-sm font-medium rounded font-bold transition-all focus-visible:ring-2"
            style={{
              backgroundColor: 'var(--color-primary, #4a90d9)',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary-hover, #357abd)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary, #4a90d9)'
            }}
            aria-label="Close settings and apply changes"
          >
            Done
          </button>
        </div>
      </div>
    </>
  )
}

/**
 * Toggle Row Component - WCAG AA Compliant
 * Implements accessible toggle switch with proper contrast and focus states
 */
function ToggleRow({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: 'rgba(74, 144, 217, 0.05)' }}>
      <div>
        <p 
          className="font-semibold text-sm"
          style={{ color: 'var(--color-text-primary, #e2e8f0)' }}
        >
          {label}
        </p>
        {description && (
          <p 
            className="text-xs mt-1"
            style={{ color: 'var(--color-text-muted, #8a9ab5)' }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Custom Toggle Switch: WCAG AA Compliant */}
      <button
        onClick={() => onChange(!checked)}
        className="relative inline-flex flex-shrink-0 h-6 w-11 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-offset-1"
        style={{
          backgroundColor: checked ? 'var(--color-primary, #4a90d9)' : 'var(--color-bg-input, #2d3348)',
          cursor: 'pointer',
          border: `1px solid ${checked ? 'var(--color-primary, #4a90d9)' : 'var(--color-button-inactive, #3d4563)'}`,
        }}
        role="switch"
        aria-checked={checked}
        aria-label={label}
      >
        <span
          className="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform"
          style={{
            transform: checked ? 'translateX(20px)' : 'translateX(2px)',
          }}
        />
      </button>
    </div>
  )
}
