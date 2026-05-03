import { Settings } from 'lucide-react'
import { useState } from 'react'
import SpeechEngine from '../utils/speechEngine'

/**
 * Header Component - SenseKit Design
 * WCAG AA accessible navbar with Vision/Deaf toggles
 */
export default function Header({ onOpenSettings }) {
  const [visionMode, setVisionMode] = useState(false)
  const [deafMode, setDeafMode] = useState(false)

  const toggleVisionMode = () => {
    setVisionMode(!visionMode)
    SpeechEngine.speak(`Vision mode ${!visionMode ? 'enabled' : 'disabled'}`)
  }

  const toggleDeafMode = () => {
    setDeafMode(!deafMode)
    SpeechEngine.speak(`Deaf mode ${!deafMode ? 'enabled' : 'disabled'}`)
  }

  const handleOpenSettings = () => {
    onOpenSettings()
    SpeechEngine.speak('Settings panel opened')
  }

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-30"
      style={{
        height: '64px',
        background: '#0d1117',
        borderBottom: '1px solid #1e2a3a',
        boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '32px',
        paddingRight: '32px',
      }}
    >
      {/* Logo & Brand */}
      <a 
        href="#" 
        className="flex items-center gap-3 text-decoration-none"
        style={{ textDecoration: 'none', color: 'inherit' }}
        aria-label="SenseKit - Accessibility for Deaf and Blind users"
      >
        <div
          style={{
            width: '42px',
            height: '42px',
            background: 'linear-gradient(135deg, #4a90d9 50%, #7c3aed 50%)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            color: 'white',
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          👁️👂
        </div>
        <div>
          <h1 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', margin: 0, lineHeight: 1.2 }}>
            SenseKit
          </h1>
          <p style={{ fontSize: '0.65rem', color: '#a0b4cc', fontWeight: 500, letterSpacing: '0.03em', margin: 0, lineHeight: 1 }}>
            See with sound. Hear with sight.
          </p>
        </div>
      </a>

      {/* Nav Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Vision Mode Toggle */}
        <button
          onClick={toggleVisionMode}
          className={`transition-all`}
          aria-label="Toggle Vision Mode for high contrast and large text"
          aria-pressed={visionMode}
          title="Vision Mode"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '8px',
            background: visionMode ? '#4a90d9' : '#141c2e',
            border: `1px solid ${visionMode ? '#4a90d9' : '#1e2d42'}`,
            color: visionMode ? '#ffffff' : '#a0b4cc',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (!visionMode) e.currentTarget.style.background = '#253050'
            e.currentTarget.style.color = '#ffffff'
          }}
          onMouseLeave={(e) => {
            if (!visionMode) e.currentTarget.style.background = '#141c2e'
            if (!visionMode) e.currentTarget.style.color = '#a0b4cc'
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = '3px solid #4a90d9'
            e.currentTarget.style.outlineOffset = '2px'
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none'
          }}
        >
          👁️
        </button>

        {/* Deaf Mode Toggle */}
        <button
          onClick={toggleDeafMode}
          className={`transition-all`}
          aria-label="Toggle Deaf Mode for visual-only interface"
          aria-pressed={deafMode}
          title="Deaf Mode"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '8px',
            background: deafMode ? '#7c3aed' : '#141c2e',
            border: `1px solid ${deafMode ? '#7c3aed' : '#1e2d42'}`,
            color: deafMode ? '#ffffff' : '#a0b4cc',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (!deafMode) e.currentTarget.style.background = '#253050'
            e.currentTarget.style.color = '#ffffff'
          }}
          onMouseLeave={(e) => {
            if (!deafMode) e.currentTarget.style.background = '#141c2e'
            if (!deafMode) e.currentTarget.style.color = '#a0b4cc'
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = '3px solid #4a90d9'
            e.currentTarget.style.outlineOffset = '2px'
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none'
          }}
        >
          🤐
        </button>

        {/* Settings Button */}
        <button
          onClick={handleOpenSettings}
          className="group relative transition-all"
          aria-label="Open settings"
          style={{
            width: '44px',
            height: '44px',
            minWidth: '44px',
            minHeight: '44px',
            backgroundColor: '#141c2e',
            border: '1px solid #1e2d42',
            borderRadius: '8px',
            color: '#a0b4cc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            outline: 'none',
            fontSize: '1.2rem',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#253050'
            e.currentTarget.style.color = '#ffffff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#141c2e'
            e.currentTarget.style.color = '#a0b4cc'
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = '3px solid #4a90d9'
            e.currentTarget.style.outlineOffset = '2px'
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none'
          }}
        >
          <Settings className="w-5 h-5" strokeWidth={2} />
        </button>
      </div>
    </header>
  )
}
