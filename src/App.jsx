import { useState } from 'react'
import { A11yProvider } from './context/A11yContext'
import Header from './components/Header'
import LetterPronunciation from './components/LetterPronunciation'
import A11ySettings from './components/A11ySettings'
import FeedbackWidget from './components/FeedbackWidget'
import './App.css'
import './components/FeedbackWidget.css'

/**
 * Main App Component - SenseKit
 * Accessibility Toolkit for Deaf/HoH and Blind/Low Vision Users
 */
export default function App() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [speakingCard, setSpeakingCard] = useState(null)

  /**
   * Speak card content using Web Speech API
   * Provides audio description of feature cards for accessibility
   */
  const speakCardContent = (cardId, title, description) => {
    // Cancel any ongoing speech first
    window.speechSynthesis.cancel()
    setSpeakingCard(cardId)

    const utterance = new SpeechSynthesisUtterance(
      `${title}. ${description}`
    )

    // Settings for accessibility
    utterance.rate = 0.92   // slightly slower for clarity
    utterance.pitch = 1
    utterance.volume = 1

    // Use the first available natural voice, fallback to default
    const voices = window.speechSynthesis.getVoices()
    const preferred = voices.find(v =>
      v.lang.startsWith('en') && v.localService
    )
    if (preferred) utterance.voice = preferred

    // Clear active state when done speaking
    utterance.onend = () => setSpeakingCard(null)
    utterance.onerror = () => setSpeakingCard(null)

    window.speechSynthesis.speak(utterance)
  }

  // Preload voices async
  if (typeof window !== 'undefined') {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices()
    }
  }

  // SenseKit Features: 3 for Deaf/HoH, 3 for Blind/Low Vision
  const features = [
    // Deaf/Hard of Hearing
    {
      icon: '📺',
      title: 'Live Captions',
      description: 'Real-time transcription of audio content with speaker identification and emotion indicators.',
      category: 'deaf',
      accentColor: '#4a90d9',
    },
    {
      icon: '⚡',
      title: 'Visual Alerts',
      description: 'Screen flashes, color changes, and vibration patterns for notifications and alerts.',
      category: 'deaf',
      accentColor: '#f59e0b',
    },
    {
      icon: '🤟',
      title: 'Sign Language Cam',
      description: 'Video relay services and interpretation tools with real-time sign language recognition.',
      category: 'deaf',
      accentColor: '#10b981',
    },
    // Blind/Low Vision
    {
      icon: '🔊',
      title: 'Screen Reader',
      description: 'Advanced audio navigation with customizable voices, speeds, and content preferences.',
      category: 'vision',
      accentColor: '#7c3aed',
    },
    {
      icon: '◎',
      title: 'High Contrast Themes',
      description: 'Multiple theme options with adjustable text sizes and enhanced visual hierarchy.',
      category: 'vision',
      accentColor: '#ec4899',
    },
    {
      icon: '🎙️',
      title: 'Voice Navigation',
      description: 'Voice commands and keyboard shortcuts to navigate and control the entire interface.',
      category: 'vision',
      accentColor: '#4a90d9',
    },
  ]

  return (
    <A11yProvider>
      <div style={{ minHeight: '100vh', background: '#0d1117', color: 'white' }}>
        {/* Skip to main content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-blue-600 focus:text-white focus:rounded-br"
        >
          Skip to main content
        </a>

        {/* Header */}
        <Header onOpenSettings={() => setSettingsOpen(true)} />

        {/* Main Content Area */}
        <main
          id="main-content"
          style={{
            marginTop: '64px',
            marginBottom: '60px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Hero Section */}
          <section
            style={{
              background: 'radial-gradient(ellipse at 50% -20%, rgba(74,144,217,0.15) 0%, transparent 60%)',
              padding: '60px 32px',
              textAlign: 'center',
            }}
          >
            <h1 
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                marginBottom: '20px',
                lineHeight: 1.2,
              }}
            >
              SenseKit — Accessibility for Deaf & Blind Users
            </h1>
            
            <p 
              style={{
                color: '#a0b4cc',
                fontSize: '1rem',
                maxWidth: '580px',
                margin: '0 auto 32px',
                lineHeight: 1.7,
              }}
            >
              Real-time captions, audio descriptions, voice input, and high-contrast tools — built for those who rely on them most.
            </p>

            {/* Two CTA Buttons */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={() => {
                  document.getElementById('voice-input-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
                style={{
                  minHeight: '48px',
                  padding: '12px 28px',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#4a90d9',
                  color: '#ffffff',
                  boxShadow: '0 0 20px rgba(74, 144, 217, 0.3)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#357abd'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(74, 144, 217, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#4a90d9'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(74, 144, 217, 0.3)'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = '3px solid #4a90d9'
                  e.currentTarget.style.outlineOffset = '2px'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none'
                }}
                aria-label="Start Voice Input"
              >
                🎤 Start Voice Input
              </button>

              <button
                style={{
                  minHeight: '48px',
                  padding: '12px 28px',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  background: 'transparent',
                  border: '2px solid #7c3aed',
                  color: '#c4b5fd',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(124, 58, 237, 0.1)'
                  e.currentTarget.style.borderColor = '#c4b5fd'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = '#7c3aed'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = '3px solid #4a90d9'
                  e.currentTarget.style.outlineOffset = '2px'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none'
                }}
                aria-label="Enable Captions"
              >
                📝 Enable Captions
              </button>
            </div>
          </section>

          {/* Features Section */}
          <section
            style={{
              padding: '48px 32px',
              background: '#0d1117',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  marginBottom: '12px',
                }}
              >
                Core Features
              </h2>
              <p
                style={{
                  color: '#a0b4cc',
                  fontSize: '1rem',
                  maxWidth: '600px',
                  margin: '0 auto',
                }}
              >
                Accessibility tools designed for Deaf, Hard of Hearing, Blind, and Low Vision users
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '14px',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 32px',
              }}
            >
              {features.map((feature, index) => {
                const cardId = ['live-captions', 'visual-alerts', 'sign-language', 'screen-reader', 'contrast-themes', 'voice-navigation'][index]
                const isCurrentlySpeaking = speakingCard === cardId
                
                return (
                  <div
                    key={index}
                    onClick={() => speakCardContent(cardId, feature.title, feature.description)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        speakCardContent(cardId, feature.title, feature.description)
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Click to hear about: ${feature.title}`}
                    className={`feature-card ${isCurrentlySpeaking ? 'is-speaking' : ''}`}
                    style={{
                      background: '#141c2e',
                      border: `1px solid #1e2d42`,
                      borderRadius: '14px',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      position: 'relative',
                      boxShadow: isCurrentlySpeaking 
                        ? `0 0 0 3px rgba(74,143,255,0.12), 0 8px 28px rgba(74,143,255,0.15)` 
                        : 'none',
                      background: isCurrentlySpeaking 
                        ? 'rgba(20, 28, 46, 0.8)' 
                        : '#141c2e',
                      borderColor: isCurrentlySpeaking 
                        ? 'rgba(74,143,255,0.45)' 
                        : '#1e2d42',
                    }}
                    onMouseEnter={(e) => {
                      if (!isCurrentlySpeaking) {
                        e.currentTarget.style.borderColor = feature.accentColor
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = `0 0 20px ${feature.accentColor}20`
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isCurrentlySpeaking) {
                        e.currentTarget.style.borderColor = '#1e2d42'
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = 'none'
                      }
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.outline = '2px solid #4a8fff'
                      e.currentTarget.style.outlineOffset = '3px'
                      e.currentTarget.style.borderColor = 'rgba(74,143,255,0.3)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.outline = 'none'
                      e.currentTarget.style.outlineOffset = '0'
                      if (!isCurrentlySpeaking) {
                        e.currentTarget.style.borderColor = '#1e2d42'
                      }
                    }}
                  >
                    {/* Speaking indicator */}
                    {isCurrentlySpeaking && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '12px',
                          fontSize: '0.75rem',
                          opacity: 0.7,
                          animation: 'speaker-pulse 1s ease infinite',
                        }}
                      >
                        🔊
                      </div>
                    )}

                    {/* Coming Soon Badge */}
                    {(cardId === 'sign-language' || cardId === 'voice-navigation') && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          borderRadius: '16px',
                          padding: '4px 12px',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          background: 'rgba(96, 165, 250, 0.15)',
                          color: '#60a5fa',
                          border: '1px solid rgba(96, 165, 250, 0.3)',
                          zIndex: 10,
                        }}
                      >
                        Coming Soon
                      </div>
                    )}

                    {/* Card Top: Icon + Badge */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: '8px',
                      }}
                    >
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '10px',
                          background: `${feature.accentColor}20`,
                          border: `1px solid ${feature.accentColor}50`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.3rem',
                          color: feature.accentColor,
                          flexShrink: 0,
                        }}
                      >
                        {feature.icon}
                      </div>
                      
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 600,
                          borderRadius: '20px',
                          padding: '2px 10px',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          border: '1px solid',
                          whiteSpace: 'nowrap',
                          background: feature.category === 'deaf' 
                            ? 'rgba(245, 158, 11, 0.1)' 
                            : 'rgba(124, 58, 237, 0.1)',
                          color: feature.category === 'deaf' 
                            ? '#f59e0b' 
                            : '#c4b5fd',
                          borderColor: feature.category === 'deaf' 
                            ? '#f59e0b' 
                            : '#7c3aed',
                        }}
                      >
                        {feature.category === 'deaf' ? 'For Deaf & HoH' : 'For Blind & Low Vision'}
                      </span>
                    </div>

                    {/* Card Title */}
                    <h3
                      style={{
                        color: '#ffffff',
                        fontSize: '1rem',
                        fontWeight: 700,
                        margin: 0,
                      }}
                    >
                      {feature.title}
                    </h3>

                    {/* Card Description */}
                    <p
                      style={{
                        color: '#8a9ab5',
                        fontSize: '0.83rem',
                        lineHeight: 1.55,
                        margin: 0,
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Voice Input Section */}
          <section
            id="voice-input-section"
            style={{
              padding: '48px 32px',
              background: '#0d1117',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  marginBottom: '12px',
                }}
              >
                Voice & Text Input
              </h2>
              <p
                style={{
                  color: '#a0b4cc',
                  fontSize: '1rem',
                  maxWidth: '600px',
                  margin: '0 auto',
                }}
              >
                Type or speak — each letter is read aloud in real-time
              </p>
            </div>

            <div
              style={{
                background: '#111827',
                border: '1px solid #1e2d42',
                borderRadius: '16px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                maxWidth: '800px',
                margin: '0 auto',
              }}
            >
              <LetterPronunciation label="Type or speak - each letter will be pronounced aloud" />
            </div>
          </section>

          {/* Footer */}
          <footer
            style={{
              background: '#0a0f1a',
              borderTop: '1px solid #1e2d42',
              padding: '16px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              textAlign: 'center',
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              height: '60px',
            }}
          >
            <div style={{ color: '#4a5568', fontSize: '0.78rem' }}>
              © 2025 SenseKit
            </div>
            <div style={{ color: '#a0b4cc', fontSize: '0.78rem', flex: 1 }}>
              Designed for Deaf, HoH, Blind & Low Vision users
            </div>
            <span
              style={{
                background: '#1a2035',
                border: '1px solid #4a5568',
                color: '#a0b4cc',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              ✓ WCAG 2.1 AA
            </span>
          </footer>
        </main>

        {/* Settings Panel */}
        <A11ySettings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
        
        {/* Feedback Widget */}
        <FeedbackWidget />
      </div>
    </A11yProvider>
  )
}
