import { useContext, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Slider from '@radix-ui/react-slider'
import * as Switch from '@radix-ui/react-switch'
import { A11yContext } from '../context/A11yContext'

/**
 * Enhanced Accessibility Settings Panel
 * Tabbed sidebar layout for organized settings management
 */
export default function EnhancedA11ySettings({ isOpen, onClose }) {
  const { settings, updateSetting, resetSettings } = useContext(A11yContext)
  const [activeTab, setActiveTab] = useState('display')

  const handleSettingChange = (key, value) => {
    updateSetting(key, value)
  }

  const handleReset = () => {
    if (confirm('Reset all settings to defaults?')) {
      resetSettings()
    }
  }

  const tabs = [
    { id: 'display', label: '🎨 Display', icon: '🎨' },
    { id: 'font', label: '📝 Font', icon: '📝' },
    { id: 'speech', label: '🔊 Speech', icon: '🔊' },
    { id: 'motion', label: '📳 Motion', icon: '📳' },
  ]

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out" />
        
        <Dialog.Content
          className="fixed left-[50%] top-[50%] z-50 flex w-full max-w-4xl max-h-[85vh] translate-x-[-50%] translate-y-[-50%] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg rounded-lg overflow-hidden"
          aria-describedby="settings-description"
        >
          {/* Sidebar with tabs */}
          <div className="w-48 border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">⚙️</span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Settings</h2>
              </div>
              <Dialog.Close className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <span aria-hidden="true" className="text-lg">×</span>
                <span className="sr-only">Close</span>
              </Dialog.Close>
            </div>

            {/* Tab buttons */}
            <nav className="flex-1 overflow-y-auto p-2 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all font-medium flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-teal-500 text-white shadow-md'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                  aria-selected={activeTab === tab.id}
                  role="tab"
                >
                  <span>{tab.icon}</span>
                  <span className="text-sm">{tab.label.split(' ')[1]}</span>
                </button>
              ))}
            </nav>

            {/* Footer buttons */}
            <div className="border-t border-slate-200 dark:border-slate-700 p-3 space-y-2">
              <button
                onClick={handleReset}
                className="w-full px-3 py-2 text-sm bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-medium"
              >
                Reset
              </button>
              <Dialog.Close className="w-full px-3 py-2 text-sm bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium">
                Done
              </Dialog.Close>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 overflow-y-auto p-8">
            <p id="settings-description" className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              All settings are saved to your browser automatically.
            </p>

            {/* Display Tab */}
            {activeTab === 'display' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Display Theme</h3>
                  <div className="space-y-3">
                    {[
                      { value: 'light', label: '☀️ Light', desc: 'Bright and clear' },
                      { value: 'dark', label: '🌙 Dark', desc: 'Easy on eyes' },
                      { value: 'high-contrast', label: '🔆 High Contrast', desc: 'Maximum visibility' },
                    ].map((theme) => (
                      <label key={theme.value} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <input
                          type="radio"
                          name="theme"
                          value={theme.value}
                          checked={settings.theme === theme.value}
                          onChange={(e) => handleSettingChange('theme', e.target.value)}
                          className="w-4 h-4"
                        />
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">{theme.label}</div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">{theme.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Contrast Level</h3>
                  <select
                    value={settings.contrast}
                    onChange={(e) => handleSettingChange('contrast', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High (WCAG AA)</option>
                    <option value="ultra">Ultra (WCAG AAA)</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Text Spacing</h3>
                  <div className="flex gap-2">
                    {['Normal', 'Wide'].map((spacing) => (
                      <button
                        key={spacing}
                        onClick={() => handleSettingChange('textSpacing', spacing.toLowerCase())}
                        className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                          settings.textSpacing === spacing.toLowerCase()
                            ? 'bg-teal-500 text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300'
                        }`}
                      >
                        {spacing}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Additional Options</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <input
                        type="checkbox"
                        checked={settings.focusVisible}
                        onChange={(e) => handleSettingChange('focusVisible', e.target.checked)}
                        className="w-4 h-4"
                      />
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">Visible Focus Indicators</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Show outlines on focused elements</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <input
                        type="checkbox"
                        checked={settings.reduceFlash}
                        onChange={(e) => handleSettingChange('reduceFlash', e.target.checked)}
                        className="w-4 h-4"
                      />
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">Reduce Flashing</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Minimize animations and flashing content</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Font Tab */}
            {activeTab === 'font' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Font Size</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {['xs', 'sm', 'base', 'lg', 'xl', '2xl'].map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSettingChange('fontSize', size)}
                        className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                          settings.fontSize === size
                            ? 'bg-teal-500 text-white shadow-md'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600'
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

                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <p className="text-slate-900 dark:text-white" style={{ fontSize: `${['0.75rem', '0.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem']['xs sm base lg xl 2xl'.split(' ').indexOf(settings.fontSize)]}` }}>
                    Preview: The quick brown fox jumps over the lazy dog
                  </p>
                </div>
              </div>
            )}

            {/* Speech Tab */}
            {activeTab === 'speech' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Enable Text-to-Speech</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">Read content aloud</div>
                    </div>
                    <Switch.Root
                      checked={settings.enableSpeech}
                      onCheckedChange={(checked) => handleSettingChange('enableSpeech', checked)}
                      className="w-10 h-6 bg-slate-300 rounded-full transition-colors data-[state=checked]:bg-teal-500"
                    >
                      <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform data-[state=checked]:translate-x-4" />
                    </Switch.Root>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Enable Letter Pronunciation</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">Speak each letter typed</div>
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

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
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
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Slider.Track className="relative flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                      <Slider.Range className="absolute h-full bg-teal-500 rounded-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-teal-500 rounded-full shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300" />
                  </Slider.Root>
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mt-2">
                    <span>0.5x (slow)</span>
                    <span>2.0x (fast)</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-center mb-3">
                    <label className="font-semibold text-slate-900 dark:text-white">Volume</label>
                    <span className="text-teal-500 font-bold">{(settings.speechVolume * 100).toFixed(0)}%</span>
                  </div>
                  <Slider.Root
                    value={[settings.speechVolume]}
                    onValueChange={([value]) => handleSettingChange('speechVolume', value)}
                    min={0}
                    max={1}
                    step={0.1}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Slider.Track className="relative flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                      <Slider.Range className="absolute h-full bg-teal-500 rounded-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-teal-500 rounded-full shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300" />
                  </Slider.Root>
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mt-2">
                    <span>Mute</span>
                    <span>Max</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
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
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Slider.Track className="relative flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                      <Slider.Range className="absolute h-full bg-teal-500 rounded-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-teal-500 rounded-full shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300" />
                  </Slider.Root>
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mt-2">
                    <span>0.5x (lower)</span>
                    <span>2.0x (higher)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Motion Tab */}
            {activeTab === 'motion' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Reduce Motion</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Minimize animations</div>
                  </div>
                  <Switch.Root
                    checked={settings.reducedMotion}
                    onCheckedChange={(checked) => handleSettingChange('reducedMotion', checked)}
                    className="w-10 h-6 bg-slate-300 rounded-full transition-colors data-[state=checked]:bg-teal-500"
                  >
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform data-[state=checked]:translate-x-4" />
                  </Switch.Root>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Enable Haptic Feedback</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Vibration on supported devices</div>
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
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
