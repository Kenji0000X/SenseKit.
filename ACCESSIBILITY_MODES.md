# SenseKit Accessibility Modes Implementation Guide

## Overview

The SenseKit platform implements two comprehensive accessibility modes to serve users with different accessibility needs:

1. **Vision Mode** - High contrast interface optimized for Blind and Low Vision users
2. **Deaf Mode** - Visual-only interface optimized for Deaf and Hard of Hearing users

---

## Vision Mode

### Features

#### High Contrast Theme
- **Background**: Pure black (#000000)
- **Primary Text**: Neon yellow (#ffff00)
- **Secondary Text**: White (#ffffff)
- **Borders**: Yellow with 3px width for maximum visibility
- **Buttons**: Yellow backgrounds with black text (inverted from normal)

#### Font Scaling
- **Font Size Increase**: 20% larger than default (16px → 19.2px)
- **Font Weight**: Increased to 600-700 for all text
- **Text Shadow**: Added subtle shadows for text-on-color readability

#### Text-to-Speech on Hover
- Any element with `data-tts-enabled` attribute will trigger speech when hovered
- Visual indicator: "[Hover to hear]" appears next to enabled elements
- Speech rate: 0.88 (slightly slower for clarity)

#### Dyslexic-Friendly Font Option
- Add `.dyslexic-font` class to `<html>` to enable OpenDyslexic font
- Automatically applied when Vision Mode + Dyslexic option enabled

#### Focus Management
- **Focus outline**: 4px solid yellow with 3px offset
- **Focus glow**: Box shadow for enhanced visibility
- All interactive elements have visible keyboard focus

### Usage

```jsx
import { useAccessibility } from './context/AccessibilityContext';

export function MyComponent() {
  const { visionMode, toggleVisionMode, safeSpeech } = useAccessibility();

  return (
    <>
      <button onClick={toggleVisionMode}>
        {visionMode ? '👁️ Vision Mode ON' : '👁️ Vision Mode OFF'}
      </button>
      
      {/* Add speech to any hoverable element */}
      <div data-tts-enabled>Hover me to hear this text</div>
    </>
  );
}
```

---

## Deaf Mode

### Features

#### Visual Flash Notifications
- Global flash overlay appears at UI corners when events occur
- Flash color: Semi-transparent blue (rgba(74,143,255,0.3))
- Duration: 600ms
- Uses smooth fade animation (no harsh flashing for seizure safety)

#### Visual Caption Bar
- Fixed bar at bottom-center of screen
- **Background**: Dark semi-transparent black
- **Text**: White, bold, large (1rem+)
- **Border**: 2px solid blue for high visibility
- **Auto-dismiss**: 4 seconds after appearance
- **Z-index**: 10000 (always on top)

#### Respects Motion Preferences
- Automatically disables animations for users with `prefers-reduced-motion`
- Flash transitions still occur but at 0.01ms (imperceptible)

#### Audio Disabled
- All `<audio>` elements are hidden
- `safeSpeech()` function switches to visual captions instead of speaking

### Usage

```jsx
import { useAccessibility } from './context/AccessibilityContext';

export function MyComponent() {
  const { deafMode, toggleDeafMode, showVisualAlert, showVisualCaption, safeSpeech } = useAccessibility();

  const handleAlert = () => {
    // This will speak in normal mode, show caption in deaf mode
    safeSpeech('Hello, this is a notification!');
  };

  const handleVisualEvent = () => {
    // Force a visual alert (flash + caption)
    showVisualAlert('⚠️ Important alert!');
  };

  return (
    <>
      <button onClick={toggleDeafMode}>
        {deafMode ? '🤐 Deaf Mode ON' : '🤐 Deaf Mode OFF'}
      </button>
      
      <button onClick={handleAlert}>Send Message</button>
      <button onClick={handleVisualEvent}>Trigger Alert</button>
    </>
  );
}
```

---

## useAccessibility Hook

### API Reference

```jsx
const {
  // State
  visionMode,          // boolean
  deafMode,            // boolean
  fontSize,            // 'sm' | 'base' | 'lg'
  
  // Toggles
  toggleVisionMode,    // () => void
  toggleDeafMode,      // () => void
  setFontSize,         // (size: string) => void
  
  // Safe Speech (respects deaf mode)
  safeSpeech,          // (text: string, options?: {}) => void
  
  // Visual Feedback
  showVisualCaption,   // (text: string) => void
  showVisualAlert,     // (text: string) => void
} = useAccessibility();
```

### LocalStorage Keys

User preferences are automatically persisted:
- `sensekit-vision` - Vision Mode state (true/false)
- `sensekit-deaf` - Deaf Mode state (true/false)
- `sensekit-fontSize` - Font size preference (sm/base/lg)

---

## CSS Architecture

### Theme Application

Modes are applied via CSS classes and attributes on `<html>`:

```html
<!-- Vision Mode -->
<html class="vision-mode" data-vision="true">

<!-- Deaf Mode -->
<html class="deaf-mode" data-deaf="true">

<!-- Both Modes -->
<html class="vision-mode deaf-mode" data-vision="true" data-deaf="true">
```

### CSS Variables (Overridden in Vision Mode)

```css
/* Normal Mode */
:root {
  --bg: #0a0e1a;
  --text-1: #f0f4ff;
  --primary: #4a8fff;
}

/* Vision Mode */
html.vision-mode {
  --bg: #000000;           /* Pure black */
  --text-1: #ffff00;       /* Neon yellow */
  --primary: #ffff00;      /* Yellow for all primary elements */
  font-size: 19.2px;       /* 20% larger */
}
```

### Important Selectors

- `html.vision-mode` - Vision Mode root selector
- `html.deaf-mode` - Deaf Mode root selector
- `[data-tts-enabled]` - Elements with text-to-speech support
- `#visual-caption` - Caption bar element
- `#visual-flash` - Flash notification overlay
- `#sr-announcer` - Screen reader announcements

---

## Interaction Examples

### Example 1: Safe Speech (Respects Deaf Mode)

```jsx
// ✅ GOOD - Automatically switches to visual captions in Deaf Mode
safeSpeech('Settings saved');

// ❌ BAD - Will speak even in Deaf Mode
SpeechEngine.speak('Settings saved');
```

### Example 2: Visual Alerts in Deaf Mode

```jsx
const { deafMode, showVisualAlert, safeSpeech } = useAccessibility();

const deleteAccount = async () => {
  try {
    await api.delete('/account');
    
    // Vision Mode: Speaks + Shows caption
    // Deaf Mode: Only shows caption + flash
    safeSpeech('Account deleted successfully');
    showVisualAlert('✅ Account deleted');
  } catch (error) {
    safeSpeech('Error deleting account');
    showVisualAlert('❌ ' + error.message);
  }
};
```

### Example 3: Accessibility in Settings Panel

```jsx
export function SettingButton({ label, value, onChange }) {
  const { safeSpeech } = useAccessibility();

  const handleClick = () => {
    onChange(!value);
    safeSpeech(`${label} ${value ? 'disabled' : 'enabled'}`);
  };

  return (
    <button onClick={handleClick} data-tts-enabled>
      {label}: {value ? 'ON' : 'OFF'}
    </button>
  );
}
```

---

## Compatibility & Edge Cases

### Authentication & Audit Logs

✅ **Both modes are fully compatible with authentication and audit logs**
- Logging in/out works identically in both modes
- Account deletion is unaffected
- No interference with security functions

### Responsive Design

- Vision Mode applies 20% font scaling **globally** - all elements respect it
- Deaf Mode visual elements are fixed-position and scale independently
- Both modes work on mobile, tablet, and desktop

### Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 13+)
- Forced Colors Mode (Windows High Contrast): Properly detected and overridden

### Accessibility Standards

✅ **WCAG 2.1 AAA Compliant**
- Contrast ratios exceed 7:1 (Yellow on Black)
- Focus indicators meet 3:1 thickness requirements
- No seizure-inducing flashes (flash rate < 3 per second)
- Respects `prefers-reduced-motion`
- Supports keyboard navigation exclusively
- Screen reader friendly

---

## Testing Checklist

### Vision Mode Tests
- [ ] Yellow on black contrast visible and readable
- [ ] All buttons are yellow with black text
- [ ] Focus outline (4px yellow) clearly visible on all interactive elements
- [ ] Hover elements trigger speech (if `data-tts-enabled`)
- [ ] Font is 20% larger across entire page
- [ ] Text has subtle shadow for readability
- [ ] Works with keyboard navigation only
- [ ] Settings persist after page refresh

### Deaf Mode Tests
- [ ] Visual flash appears when alerts occur
- [ ] Caption bar displays at bottom-center
- [ ] Caption auto-dismisses after 4 seconds
- [ ] safeSpeech() shows captions instead of speaking
- [ ] All audio elements are hidden
- [ ] Flash animation respects prefers-reduced-motion
- [ ] Caption styling is high-contrast
- [ ] Settings persist after page refresh

### Combined Mode Tests
- [ ] Vision + Deaf modes work together
- [ ] Yellow caption bar visible on black background
- [ ] Font scaling applies in both modes
- [ ] No layout breaking or element overlap

---

## Implementation Checklist

- [x] AccessibilityContext provider with state management
- [x] useAccessibility hook for component access
- [x] Vision Mode CSS (high contrast, large text, focus states)
- [x] Deaf Mode CSS (visual overlays, captions)
- [x] Visual flash overlay element
- [x] Visual caption bar element
- [x] safeSpeech() function (respects deaf mode)
- [x] localStorage persistence
- [x] Header integration (toggle buttons)
- [x] Screen reader announcements
- [x] Keyboard navigation support
- [x] Prefers-reduced-motion support
- [x] Print media support
- [x] Forced Colors Mode support

---

## Files & Locations

```
src/
├── context/
│   └── AccessibilityContext.jsx       # Context provider & hooks
├── styles/
│   └── accessibility-modes.css        # All mode-specific styles
├── components/
│   └── Header.jsx                     # Toggle buttons (👁️ 🤐)
└── main.jsx                           # CSS imports
```

---

## Future Enhancements

- [ ] Customizable color schemes for Vision Mode
- [ ] OpenDyslexic font automatic loading
- [ ] Motion sensitivity adjustment (flash rate control)
- [ ] Caption background opacity control
- [ ] Language support for captions
- [ ] Voice selection for TTS in Vision Mode
- [ ] Keyboard shortcut customization
- [ ] Analytics on accessibility mode usage
