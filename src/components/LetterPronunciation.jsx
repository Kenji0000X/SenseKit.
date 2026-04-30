import { useState, useRef, useContext } from 'react'
import { Volume2, Trash2, Square } from 'lucide-react'

import { speakCharacter, stopSpeech } from '../utils/enhancedSpeechHelper'
import { A11yContext } from '../context/A11yContext'


/**
 * Letter Pronunciation Component
 * Reads aloud each letter as the user types
 * Core feature for PWD accessibility toolkit
 */
export default function LetterPronunciation({ label = 'Type here for letter pronunciation' }) {
  const [text, setText] = useState('')
  const [lastChar, setLastChar] = useState('')
  const textareaRef = useRef(null)
  const { settings } = useContext(A11yContext)

  const handleChange = (e) => {
    const newText = e.target.value
    const oldLength = text.length
    const newLength = newText.length

    setText(newText)

    // Detect if character was added or removed
    if (newLength > oldLength) {
      // Character added - get the last character
      const addedChar = newText[newLength - 1]
      setLastChar(addedChar)

      // Speak the character if feature is enabled
      if (settings.enableLetterPronunciation && settings.enableSpeech) {
        speakCharacter(addedChar, {
          rate: settings.speechRate,
          enableVibration: settings.enableVibration,
        })
      }
    } else if (newLength < oldLength) {
      // Character removed (backspace)
      setLastChar('Deleted')
      
      if (settings.enableLetterPronunciation && settings.enableSpeech) {
        speakCharacter('Deleted', { rate: settings.speechRate })
      }
    }
  }

  const handleClear = () => {
    stopSpeech()
    setText('')
    setLastChar('')
    textareaRef.current?.focus()
  }

  const handleSpeak = () => {
    if (text) {
      speakCharacter(text, {
        rate: settings.speechRate,
        enableVibration: settings.enableVibration,
      })
    }
  }

  return (
    <div className="w-full space-y-6">
      {/* Voice Input Group - WCAG AA Accessible */}
      <div role="group" aria-labelledby="voice-input-label">
        {/* Input Label */}
        <label 
          id="voice-input-label" 
          className="input-label"
          style={{
            color: '#c8d6e8',
            fontSize: '0.9rem',
            fontWeight: 500,
            display: 'block',
            marginBottom: '8px',
          }}
        >
          Type or speak — text will be transcribed in real time
        </label>

        {/* Textarea */}
        <textarea
          id="voice-text"
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          placeholder="Start typing or press the mic to speak..."
          aria-describedby="input-hint"
          rows="3"
          className="voice-textarea"
          style={{
            width: '100%',
            backgroundColor: '#12182b',
            border: '2px solid #3d4f6e',
            borderRadius: '8px',
            color: '#e2e8f0',
            fontSize: '1rem',
            padding: '12px 14px',
            resize: 'vertical',
            lineHeight: '1.5',
            transition: 'border-color 0.2s ease',
            fontFamily: 'Atkinson Hyperlegible, system-ui, sans-serif',
            outline: 'none',
          }}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#4a90d9'
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(74,144,217,0.25)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#3d4f6e'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />

        {/* Input Hint */}
        <span 
          id="input-hint" 
          className="input-hint"
          style={{
            color: '#8a9ab5',
            fontSize: '0.78rem',
            marginTop: '6px',
            display: 'block',
          }}
        >
          Each letter is pronounced as you type. Supports keyboard navigation.
        </span>
      </div>


      {/* Character display */}
      {lastChar && (
        <div
          role="status"
          aria-live="polite"
          className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl text-center shadow-[0_0_20px_rgba(6,182,212,0.1)]"
        >
          <p className="text-2xl font-bold text-cyan-400">{lastChar}</p>
          <p className="text-xs text-gray-400 mt-1">Last input</p>

        </div>
      )}


      {/* Control buttons */}
      <div className="flex gap-3 justify-center flex-wrap">
        <button
          onClick={handleSpeak}
          disabled={!text}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-semibold hover:from-cyan-400 hover:to-blue-500 disabled:bg-slate-800/50 disabled:text-slate-600 disabled:cursor-not-allowed focus-visible:ring-4 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b14] transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
          aria-label="Speak all text"
        >
          <Volume2 className="w-5 h-5" strokeWidth={2} />
          Speak All
        </button>

        <button
          onClick={handleClear}
          disabled={!text}
          className="flex items-center gap-2 px-6 py-3 bg-[#0c1220] text-slate-300 border border-white/10 rounded-2xl font-semibold hover:bg-[#131d35] hover:text-white disabled:bg-slate-800/50 disabled:text-slate-600 disabled:cursor-not-allowed focus-visible:ring-4 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b14] transition-all"
          aria-label="Clear text"
        >
          <Trash2 className="w-5 h-5" strokeWidth={2} />
          Clear
        </button>

        <button
          onClick={stopSpeech}
          className="flex items-center gap-2 px-6 py-3 bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-2xl font-semibold hover:bg-rose-500/20 focus-visible:ring-4 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b14] transition-all"
          aria-label="Stop speech"
        >
          <Square className="w-5 h-5" strokeWidth={2} />
          Stop
        </button>

      </div>
    </div>
  )

}
