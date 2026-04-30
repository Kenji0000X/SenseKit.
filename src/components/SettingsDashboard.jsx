import { useState, useContext, useRef, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Slider from '@radix-ui/react-slider'
import * as Switch from '@radix-ui/react-switch'
import {
  Menu,
  X,
  Settings as SettingsIcon,
  BarChart3,
  MessageSquare,
  User,
  CreditCard,
  Bell,
  Lock,
  Palette,
  Volume2,
  Type,
  Zap,
  Eye,
  Keyboard,
  ChevronRight,
} from 'lucide-react'
import { A11yContext } from '../context/A11yContext'
import { speakCharacter, stopSpeech } from '../utils/enhancedSpeechHelper'

/**
 * Modern Settings Dashboard
 */
export default function SettingsDashboard({ isOpen, onClose }) {
  const { settings, updateSetting } = useContext(A11yContext)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeSection, setActiveSection] = useState('overview')
  const [activeCategory, setActiveCategory] = useState('display')
  const [voiceInput, setVoiceInput] = useState('')
  const voiceInputRef = useRef(null)
  const firstFocusRef = useRef(null)

  useEffect(() => {
    if (isOpen && firstFocusRef.current) {
      setTimeout(() => firstFocusRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handleSettingChange = (key, value) => {
    updateSetting(key, value)
  }

  const handleVoiceInput = (e) => {
    const text = e.target.value
    const newChars = text.slice(voiceInput.length)

    if (newChars.length > 0 && settings.enableLetterPronunciation) {
      newChars.split('').forEach((char) => {
        speakCharacter(char, {
          rate: settings.speechRate,
          enableVibration: settings.enableVibration,
        })
      })
    }

    setVoiceInput(text)
  }

  const handleClearVoice = () => {
    stopSpeech()
    setVoiceInput('')
    voiceInputRef.current?.focus()
  }

  const sidebarSections = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'sessions', label: 'Sessions', icon: Zap },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ]

  const settingsCategories = [
    { id: 'audio', label: 'Audio', icon: Volume2 },
    { id: 'display', label: 'Display', icon: Palette },
    { id: 'privacy', label: 'Privacy', icon: Lock },
  ]

  const renderMainContent = () => {
    if (activeSection !== 'settings') {
      return (
        <div className="text-center py-12">
          <div className="inline-block p-4 bg-teal-50 dark:bg-teal-900/20 rounded-full mb-4">
            {sidebarSections.find((s) => s.id === activeSection)?.icon && 
              (() => {
                const Icon = sidebarSections.find((s) => s.id === activeSection)?.icon
                return <Icon className="w-12 h-12 text-teal-600 dark:text-teal-400" />
              })()
            }
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
            {sidebarSections.find((s) => s.id === activeSection)?.label}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            This section features {activeSection} content and controls.
          </p>
        </div>
      )
    }

    return (
      <div className="space-y-8">
        {/* Audio Settings */}
        {activeCategory === 'audio' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Volume2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Audio Settings</h3>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-6">
              {/* Speech Rate */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-semibold text-slate-900 dark:text-white">Speech Rate</label>
                  <span className="text-teal-500 font-bold">{settings.speechRate.toFixed(1)}x</span>
                </div>
                <Slider.Root
                  value={[settings.speechRate]}
                  onValueChange={([value]) => handleSettingChange('speechRate', value)}
                  min={0.5}
                  max={2}
                  step={0.1}
                  className="flex items-center gap-2"
                >
                  <Slider.Track className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                    <Slider.Range className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                  </Slider.Track>
                  <Slider.Thumb className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-purple-300" />
                </Slider.Root>
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mt-2">
                  <span>Slow</span>
                  <span>Fast</span>
                </div>
              </div>

              {/* Volume */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-semibold text-slate-900 dark:text-white">Volume</label>
                  <span className="text-teal-500 font-bold">{Math.round(settings.speechVolume * 100)}%</span>
                </div>
                <Slider.Root
                  value={[settings.speechVolume]}
                  onValueChange={([value]) => handleSettingChange('speechVolume', value)}
                  min={0}
                  max={1}
                  step={0.1}
                  className="flex items-center gap-2"
                >
                  <Slider.Track className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                    <Slider.Range className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                  </Slider.Track>
                  <Slider.Thumb className="w-5 h-5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-300" />
                </Slider.Root>
              </div>

              {/* Pitch */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-semibold text-slate-900 dark:text-white">Pitch</label>
                  <span className="text-teal-500 font-bold">{settings.speechPitch.toFixed(1)}x</span>
                </div>
                <Slider.Root
                  value={[settings.speechPitch]}
                  onValueChange={([value]) => handleSettingChange('speechPitch', value)}
                  min={0.5}
                  max={2}
                  step={0.1}
                  className="flex items-center gap-2"
                >
                  <Slider.Track className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                    <Slider.Range className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                  </Slider.Track>
                  <Slider.Thumb className="w-5 h-5 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                </Slider.Root>
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mt-2">
                  <span>Lower</span>
                  <span>Higher</span>
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Enable Speech</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Text-to-speech feedback</p>
                  </div>
                  <Switch.Root
                    checked={settings.enableSpeech}
                    onCheckedChange={(checked) => handleSettingChange('enableSpeech', checked)}
                    className="w-10 h-6 bg-slate-300 rounded-full transition-colors data-[state=checked]:bg-teal-500"
                  >
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform data-[state=checked]:translate-x-4" />
                  </Switch.Root>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Letter Pronunciation</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Speak each letter typed</p>
                  </div>
                  <Switch.Root
                    checked={settings.enableLetterPronunciation}
                    onCheckedChange={(checked) => handleSettingChange('enableLetterPronunciation', checked)}
                    className="w-10 h-6 bg-slate-300 rounded-full transition-colors data-[state=checked]:bg-teal-500"
                  >
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform data-[state=checked]:translate-x-4" />
                  </Switch.Root>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Display Settings */}
        {activeCategory === 'display' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                <Palette className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Display Settings</h3>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-6">
              {/* Theme */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-4">Theme</h4>
                <div className="grid grid-cols-3 gap-3">
                  {['light', 'dark', 'high-contrast'].map((theme) => (
                    <button
                      key={theme}
                      onClick={() => handleSettingChange('theme', theme)}
                      className={`p-4 rounded-lg font-medium transition-all border-2 ${
                        settings.theme === theme
                          ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-teal-300'
                      }`}
                    >
                      {theme === 'light' && '☀️ Light'}
                      {theme === 'dark' && '🌙 Dark'}
                      {theme === 'high-contrast' && '🔆 High'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-slate-900 dark:text-white">Font Size</h4>
                  <span className="text-teal-500 font-bold">{settings.fontSize}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {['xs', 'sm', 'base', 'lg', 'xl', '2xl'].map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSettingChange('fontSize', size)}
                      className={`px-3 py-2 rounded-lg font-medium text-sm transition-all border ${
                        settings.fontSize === size
                          ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300'
                          : 'border-slate-200 dark:border-slate-700 hover:border-teal-300'
                      }`}
                    >
                      {size === 'xs' && 'XS'}
                      {size === 'sm' && 'S'}
                      {size === 'base' && 'M'}
                      {size === 'lg' && 'L'}
                      {size === 'xl' && 'XL'}
                      {size === '2xl' && 'XXL'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contrast */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white mb-3">Contrast Level</h4>
                <select
                  value={settings.contrast}
                  onChange={(e) => handleSettingChange('contrast', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg
                    focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-white"
                >
                  <option value="normal">Normal</option>
                  <option value="high">High (WCAG AA)</option>
                  <option value="ultra">Ultra (WCAG AAA)</option>
                </select>
              </div>

              {/* Additional Options */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Reduce Motion</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Minimize animations</p>
                  </div>
                  <Switch.Root
                    checked={settings.reducedMotion}
                    onCheckedChange={(checked) => handleSettingChange('reducedMotion', checked)}
                    className="w-10 h-6 bg-slate-300 rounded-full transition-colors data-[state=checked]:bg-teal-500"
                  >
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform data-[state=checked]:translate-x-4" />
                  </Switch.Root>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Focus Visible</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Show focus indicators</p>
                  </div>
                  <Switch.Root
                    checked={settings.focusVisible}
                    onCheckedChange={(checked) => handleSettingChange('focusVisible', checked)}
                    className="w-10 h-6 bg-slate-300 rounded-full transition-colors data-[state=checked]:bg-teal-500"
                  >
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform data-[state=checked]:translate-x-4" />
                  </Switch.Root>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Settings */}
        {activeCategory === 'privacy' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Lock className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Privacy & Security</h3>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
              {[
                { title: '🔒 Data Privacy', desc: 'All data stays on your device' },
                { title: '🛡️ No Tracking', desc: 'Zero analytics or telemetry' },
                { title: '🌐 Works Offline', desc: 'No external API calls' },
                { title: '💾 LocalStorage', desc: 'Settings saved locally' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                  </div>
                  <div className="text-2xl">✓</div>
                </div>
              ))}
            </div>

            {/* Vibration */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Haptic Feedback</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Vibration on supported devices</p>
                </div>
                <Switch.Root
                  checked={settings.enableVibration}
                  onCheckedChange={(checked) => handleSettingChange('enableVibration', checked)}
                  className="w-10 h-6 bg-slate-300 rounded-full transition-colors data-[state=checked]:bg-teal-500"
                >
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform data-[state=checked]:translate-x-4" />
                </Switch.Root>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />

        <Dialog.Content
          className="fixed inset-0 z-50 flex bg-white dark:bg-slate-950 w-screen h-screen overflow-hidden"
          aria-describedby="dashboard-description"
          style={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <Dialog.Title className="sr-only">Settings Dashboard</Dialog.Title>
          <Dialog.Description id="dashboard-description" className="sr-only">
            Modern settings dashboard with accessibility controls
          </Dialog.Description>

          {/* Sidebar */}
          <div
            className={`${
              sidebarOpen ? 'w-56' : 'w-0'
            } bg-gradient-to-b from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 transition-all duration-300 overflow-hidden flex flex-col shadow-2xl border-r border-teal-500/20`}
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Sidebar Header */}
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-lg truncate">Dashboard</h3>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 hover:bg-slate-700 rounded-lg transition-colors"
                  aria-label="Close sidebar"
                  ref={firstFocusRef}
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-4 space-y-2">
              {sidebarSections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id)
                      if (section.id === 'settings') {
                        setActiveCategory('display')
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                        : 'text-slate-300 hover:bg-slate-700'
                    } focus:outline-none focus:ring-2 focus:ring-teal-400`}
                    aria-current={activeSection === section.id ? 'page' : undefined}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{section.label}</span>
                    {activeSection === section.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </button>
                )
              })}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-slate-700">
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-full px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Collapse
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Open sidebar"
                >
                  <Menu className="w-6 h-6 text-slate-900 dark:text-white" />
                </button>
              )}

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex-1">
                {sidebarSections.find((s) => s.id === activeSection)?.label}
              </h2>

              <Dialog.Close
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors
                  focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Close dashboard"
              >
                <X className="w-6 h-6 text-slate-900 dark:text-white" />
              </Dialog.Close>
            </div>

            {/* Secondary Nav for Settings */}
            {activeSection === 'settings' && (
              <div className="px-8 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <div className="flex gap-3 flex-wrap">
                  {settingsCategories.map((category) => {
                    const Icon = category.icon
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                          activeCategory === category.id
                            ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
                            : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-teal-500'
                        } focus:outline-none focus:ring-2 focus:ring-teal-400`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{category.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-8 py-8">
              {renderMainContent()}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
