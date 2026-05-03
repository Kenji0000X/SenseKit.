import { useState, useEffect } from 'react';
import SpeechEngine from '../utils/speechEngine';
import { useAccessibility } from '../context/AccessibilityContext.jsx';
import './TalkBackSettings.css';

const DEFAULT_AUDIO = {
  speechRate:       1.0,    // 0.1 to 2.0
  speechPitch:      1.0,    // 0.1 to 2.0
  speechVolume:     1.0,    // 0.0 to 1.0
  verbosity:        'normal',  // minimal/normal/verbose
  punctuation:      'some',    // none/some/all
  speakPasswords:   false,
  speakCallerId:    true,
  usageHints:       true,
  soundFeedback:    true,
  vibrationFeedback: true,
  keyboardEcho:     'characters', // none/chars/words/both
};

export default function TalkBackSettings({ 
  isOpen, 
  onClose 
}) {
  const [activeTab, setActiveTab]   = useState('audio');
  const [audio, setAudio]           = useState(() => {
    const saved = localStorage.getItem('sensekit-talkback');
    return saved ? JSON.parse(saved) : DEFAULT_AUDIO;
  });
  const [previewText, setPreviewText] = useState('');

  // Save to localStorage whenever audio changes
  useEffect(() => {
    localStorage.setItem(
      'sensekit-talkback', 
      JSON.stringify(audio)
    );
    // Apply to SpeechEngine globally
    SpeechEngine.defaultRate   = audio.speechRate;
    SpeechEngine.defaultPitch  = audio.speechPitch;
    SpeechEngine.defaultVolume = audio.speechVolume;
  }, [audio]);

  const { safeSpeech } = useAccessibility();

  // Announce panel open to screen readers
  useEffect(() => {
    if (isOpen) {
      SpeechEngine.announceToScreenReader(
        'TalkBack settings opened. ' +
        'Audio tab selected.'
      );
    }
  }, [isOpen]);

  const updateAudio = (key, value) => {
    setAudio(prev => ({ ...prev, [key]: value }));
  };

  // Preview speech with current settings
  const handlePreview = () => {
    const text = previewText || 
      'This is a preview of your speech settings ' +
      'in SenseKit accessibility toolkit.';
    SpeechEngine.speak(text, {
      rate:   audio.speechRate,
      pitch:  audio.speechPitch,
      volume: audio.speechVolume,
    });
  };

  const handleReset = () => {
    setAudio(DEFAULT_AUDIO);
    SpeechEngine.speak('Audio settings reset to defaults');
  };

  const handleSave = () => {
    localStorage.setItem(
      'sensekit-talkback',
      JSON.stringify(audio)
    );
    SpeechEngine.speak('TalkBack audio settings saved');
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Screen reader live region */}
      <div 
        id="sr-announcer"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      {/* Backdrop */}
      <div 
        className="tb-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="tb-panel"
        role="dialog"
        aria-modal="true"
        aria-label="TalkBack Settings"
      >
        {/* Header */}
        <div className="tb-header">
          <div className="tb-header-left">
            <div className="tb-logo" aria-hidden="true">
              TB
            </div>
            <div>
              <h2 className="tb-title">TalkBack Settings</h2>
              <p className="tb-subtitle">
                SenseKit Audio Accessibility
              </p>
            </div>
          </div>
          <button
            className="tb-close"
            onClick={onClose}
            aria-label="Close TalkBack settings"
          >
            ✕
          </button>
        </div>

        {/* Tabs: Audio / Speech / Gestures */}
        <div 
          className="tb-tabs"
          role="tablist"
          aria-label="TalkBack settings sections"
        >
          {['audio', 'speech', 'gestures'].map(tab => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={`tb-tab ${
                activeTab === tab ? 'active' : ''
              }`}
                onClick={() => {
                  setActiveTab(tab);
                  safeSpeech(
                    `${tab} settings tab selected`
                  );
                }}
            >
              {tab === 'audio'    && '🔊'}
              {tab === 'speech'   && '🗣'}
              {tab === 'gestures' && '👆'}
              {' '}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="tb-content">

          {/* ── AUDIO TAB ─────────────────── */}
          {activeTab === 'audio' && (
            <div 
              role="tabpanel"
              aria-label="Audio settings"
            >

              {/* Speech Rate */}
              <div className="tb-setting-group">
                <label 
                  className="tb-label"
                  htmlFor="speech-rate"
                >
                  Speech Rate
                  <span className="tb-value">
                    {audio.speechRate.toFixed(1)}x
                  </span>
                </label>
                <p className="tb-desc">
                  How fast text is read aloud
                </p>
                <input
                  id="speech-rate"
                  type="range"
                  min="0.1"
                  max="2.0"
                  step="0.1"
                  value={audio.speechRate}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    updateAudio('speechRate', val);
                  }}
                  onMouseUp={() => SpeechEngine.speak(
                    `Speech rate set to ${
                      audio.speechRate.toFixed(1)
                    } times`,
                    { rate: audio.speechRate }
                  )}
                  className="tb-slider"
                  aria-label={`Speech rate: ${
                    audio.speechRate.toFixed(1)
                  } times`}
                  aria-valuemin="0.1"
                  aria-valuemax="2.0"
                  aria-valuenow={audio.speechRate}
                />
                <div className="tb-slider-labels">
                  <span>Slow</span>
                  <span>Normal</span>
                  <span>Fast</span>
                </div>
              </div>

              {/* Speech Pitch */}
              <div className="tb-setting-group">
                <label 
                  className="tb-label"
                  htmlFor="speech-pitch"
                >
                  Speech Pitch
                  <span className="tb-value">
                    {audio.speechPitch.toFixed(1)}
                  </span>
                </label>
                <p className="tb-desc">
                  Tone of the voice — lower or higher
                </p>
                <input
                  id="speech-pitch"
                  type="range"
                  min="0.1"
                  max="2.0"
                  step="0.1"
                  value={audio.speechPitch}
                  onChange={(e) => {
                    updateAudio(
                      'speechPitch', 
                      parseFloat(e.target.value)
                    );
                  }}
                  onMouseUp={() => SpeechEngine.speak(
                    'Testing pitch',
                    { pitch: audio.speechPitch }
                  )}
                  className="tb-slider tb-slider-pitch"
                  aria-label={`Speech pitch: ${
                    audio.speechPitch.toFixed(1)
                  }`}
                />
                <div className="tb-slider-labels">
                  <span>Low</span>
                  <span>Normal</span>
                  <span>High</span>
                </div>
              </div>

              {/* Speech Volume */}
              <div className="tb-setting-group">
                <label 
                  className="tb-label"
                  htmlFor="speech-volume"
                >
                  Speech Volume
                  <span className="tb-value">
                    {Math.round(audio.speechVolume * 100)}%
                  </span>
                </label>
                <p className="tb-desc">
                  Loudness of spoken text
                </p>
                <input
                  id="speech-volume"
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={audio.speechVolume}
                  onChange={(e) => {
                    updateAudio(
                      'speechVolume', 
                      parseFloat(e.target.value)
                    );
                  }}
                  className="tb-slider tb-slider-volume"
                  aria-label={`Volume: ${
                    Math.round(audio.speechVolume * 100)
                  } percent`}
                />
                <div className="tb-slider-labels">
                  <span>Quiet</span>
                  <span>Medium</span>
                  <span>Loud</span>
                </div>
              </div>

              {/* Verbosity */}
              <div className="tb-setting-group">
                <label className="tb-label">
                  Verbosity
                </label>
                <p className="tb-desc">
                  How much detail is spoken for elements
                </p>
                <div className="tb-radio-group">
                  {['minimal', 'normal', 'verbose'].map(v => (
                    <label key={v} className="tb-radio-item">
                      <input
                        type="radio"
                        name="verbosity"
                        value={v}
                        checked={audio.verbosity === v}
                        onChange={() => {
                          updateAudio('verbosity', v);
                          SpeechEngine.speak(
                            `Verbosity set to ${v}`
                          );
                        }}
                      />
                      <span className="tb-radio-label">
                        {v.charAt(0).toUpperCase() + 
                         v.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Keyboard Echo */}
              <div className="tb-setting-group">
                <label className="tb-label">
                  Keyboard Echo
                </label>
                <p className="tb-desc">
                  What is spoken while typing
                </p>
                <select
                  className="tb-select"
                  value={audio.keyboardEcho}
                  onChange={(e) => {
                    updateAudio('keyboardEcho', e.target.value);
                    SpeechEngine.speak(
                      `Keyboard echo: ${e.target.value}`
                    );
                  }}
                  aria-label="Keyboard echo setting"
                >
                  <option value="none">None</option>
                  <option value="characters">
                    Characters
                  </option>
                  <option value="words">Words</option>
                  <option value="both">
                    Characters and Words
                  </option>
                </select>
              </div>

              {/* Toggle switches */}
              {[
                { 
                  key: 'soundFeedback',
                  label: 'Sound Feedback',
                  desc: 'Play sounds for actions and alerts'
                },
                { 
                  key: 'vibrationFeedback',
                  label: 'Vibration Feedback',
                  desc: 'Vibrate for notifications and touch'
                },
                { 
                  key: 'speakPasswords',
                  label: 'Speak Passwords',
                  desc: 'Read password characters aloud'
                },
                { 
                  key: 'usageHints',
                  label: 'Usage Hints',
                  desc: 'Hear tips on how to interact'
                },
              ].map(item => (
                <div 
                  key={item.key}
                  className="tb-toggle-row"
                >
                  <div className="tb-toggle-info">
                    <span className="tb-toggle-label">
                      {item.label}
                    </span>
                    <span className="tb-toggle-desc">
                      {item.desc}
                    </span>
                  </div>
                  <button
                    role="switch"
                    aria-checked={audio[item.key]}
                    className={`tb-switch ${
                      audio[item.key] ? 'on' : ''
                    }`}
                    onClick={() => {
                      const next = !audio[item.key];
                      updateAudio(item.key, next);
                      SpeechEngine.speak(
                        `${item.label} ${
                          next ? 'enabled' : 'disabled'
                        }`
                      );
                    }}
                    aria-label={`${item.label}: ${
                      audio[item.key] ? 'on' : 'off'
                    }`}
                  />
                </div>
              ))}

              {/* Speech Preview */}
              <div className="tb-preview-group">
                <label 
                  className="tb-label"
                  htmlFor="preview-text"
                >
                  Preview Speech
                </label>
                <textarea
                  id="preview-text"
                  className="tb-preview-input"
                  placeholder="Type text to preview..."
                  value={previewText}
                  onChange={(e) => 
                    setPreviewText(e.target.value)
                  }
                  rows={2}
                  aria-label="Preview text input"
                />
                <button
                  className="tb-preview-btn"
                  onClick={handlePreview}
                  aria-label="Preview speech with current settings"
                >
                  🔊 Preview Voice
                </button>
              </div>

            </div>
          )}

          {/* ── SPEECH TAB ────────────────── */}
          {activeTab === 'speech' && (
            <div role="tabpanel" aria-label="Speech settings">
              <div className="tb-info-card">
                <h3>Find Your TalkBack Version</h3>
                <ol className="tb-steps">
                  <li>Open TalkBack menu</li>
                  <li>Select TalkBack Settings</li>
                  <li>Open Advanced Settings</li>
                  <li>Go to Others section</li>
                  <li>Find version under Play Store link</li>
                </ol>
              </div>
              <div className="tb-info-card">
                <h3>Open TalkBack Settings</h3>
                <p className="tb-desc">
                  Multi-finger gestures:
                </p>
                <ul className="tb-steps">
                  <li>Three-finger tap</li>
                  <li>Or swipe down then right in one motion</li>
                </ul>
              </div>
              <div className="tb-setting-group">
                <label className="tb-label">
                  Punctuation Level
                </label>
                <p className="tb-desc">
                  How punctuation marks are spoken
                </p>
                <div className="tb-radio-group">
                  {['none','some','all'].map(p => (
                    <label key={p} className="tb-radio-item">
                      <input
                        type="radio"
                        name="punctuation"
                        value={p}
                        checked={audio.punctuation === p}
                        onChange={() => {
                          updateAudio('punctuation', p);
                          SpeechEngine.speak(
                            `Punctuation set to ${p}`
                          );
                        }}
                      />
                      <span className="tb-radio-label">
                        {p.charAt(0).toUpperCase() + 
                         p.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── GESTURES TAB ──────────────── */}
          {activeTab === 'gestures' && (
            <div role="tabpanel" aria-label="Gesture guide">
              {[
                {
                  gesture: 'Volume Up',
                  action: 'Speak next feature card',
                  icon: '🔼'
                },
                {
                  gesture: 'Volume Down',
                  action: 'Speak previous feature card',
                  icon: '🔽'
                },
                {
                  gesture: 'Three-finger tap',
                  action: 'Open TalkBack menu',
                  icon: '☝️'
                },
                {
                  gesture: 'Swipe Down → Right',
                  action: 'Open TalkBack settings',
                  icon: '↘️'
                },
                {
                  gesture: 'Single tap',
                  action: 'Select and speak element',
                  icon: '👆'
                },
                {
                  gesture: 'Double tap',
                  action: 'Activate selected element',
                  icon: '👆👆'
                },
              ].map((g, i) => (
                <div 
                  key={i} 
                  className="tb-gesture-row"
                  onClick={() => SpeechEngine.speak(
                    `${g.gesture}: ${g.action}`
                  )}
                  role="button"
                  tabIndex={0}
                  aria-label={`${g.gesture}: ${g.action}`}
                >
                  <span className="tb-gesture-icon">
                    {g.icon}
                  </span>
                  <div>
                    <span className="tb-gesture-name">
                      {g.gesture}
                    </span>
                    <span className="tb-gesture-action">
                      {g.action}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="tb-footer">
          <button
            className="tb-btn-reset"
            onClick={handleReset}
            aria-label="Reset all TalkBack settings"
          >
            Reset
          </button>
          <button
            className="tb-btn-save"
            onClick={handleSave}
            aria-label="Save TalkBack settings"
          >
            Save Settings
          </button>
        </div>

      </div>
    </>
  );
}
