# Accessibility Features - PWD Accessibility Hub

## Overview

This application is built from the ground up with accessibility as a core principle, following WCAG 2.1 Level AA standards. All features are designed to be usable by Persons with Disabilities (PWD).

---

## 🎤 Text-to-Speech (Web Speech API)

### Features
- **Click-to-Speak**: Every interactive element can be heard via text-to-speech
- **Customizable Speech Rate**: Users can slow down or speed up narration (0.5x to 2x)
- **Multiple Voices**: System voice selection
- **Fallback Support**: Works on all modern browsers (Chrome, Firefox, Safari, Edge)

### Implementation
```javascript
// src/utils/speechHelper.js
speakText('Your message', { rate: 0.9, pitch: 1 })
```

### Browser Support
- ✅ Chrome/Edge: Full support
- ✅ Firefox: Full support
- ✅ Safari: Full support (iOS 14.5+)
- ✅ Opera: Full support

---

## 🎨 High Contrast Modes

### Three Display Themes
1. **Light Mode**: Default, comfortable for most users
2. **Dark Mode**: Reduces eye strain in low-light environments
3. **High Contrast**: Maximum contrast (black text on yellow background)

### Features
- **4.5:1 Color Contrast**: Meets WCAG AA standard minimum
- **Persistent Settings**: Stored in LocalStorage (no login needed)
- **Instant Application**: Settings apply immediately without reload
- **System Preference Detection**: Optional automatic dark mode based on OS

### CSS Implementation
```css
/* High Contrast Theme */
.high-contrast {
  background-color: #000000;
  color: #ffff00;
  border: 3px solid #ffff00;
}

.high-contrast button {
  background: #000000;
  color: #ffff00;
  border: 4px solid #ffff00;
}
```

---

## ⌨️ Full Keyboard Navigation

### WCAG 2.1 Compliance
- **All Interactive Elements Focusable**: Tab through every button, link, and form element
- **Focus Indicators**: Clear visual feedback on focused elements (ring-4 ring-offset-2)
- **Semantic HTML**: Proper use of `<button>`, `<nav>`, `<main>`, `<footer>`
- **ARIA Labels**: Every interactive element has descriptive labels

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `Tab` | Move to next interactive element |
| `Shift + Tab` | Move to previous interactive element |
| `Enter` / `Space` | Activate button/link |
| `Escape` | Close modals (future implementation) |

### Implementation
```jsx
<button
  aria-label="Settings"
  aria-description="Open accessibility settings"
  focus:ring-4
  focus:ring-yellow-400
>
  Settings
</button>
```

---

## 🔤 Scalable Typography

### Font Size Options
- **sm (0.875rem)**: For dense information
- **base (1rem)**: Default, comfortable for most
- **lg (1.125rem)**: Large text
- **xl (1.25rem)**: Extra large
- **2xl (1.5rem)**: Maximum legibility

### Text Spacing
- **Normal**: Standard letter spacing (0.18px)
- **Wide**: Increased spacing for better readability (0.36px)
- **Line Height**: 1.45 (normal) to 1.8 (wide)

### Supports 200% Zoom
The layout remains functional and responsive at 200% browser zoom.

---

## 💾 LocalStorage Settings

### Stored User Preferences
```javascript
{
  theme: 'light',           // 'light' | 'dark' | 'high-contrast'
  fontSize: 'base',         // 'sm' | 'base' | 'lg' | 'xl' | '2xl'
  textSpacing: 'normal',    // 'normal' | 'wide'
  enableSpeech: true,       // Boolean
  speechRate: 0.9,          // 0.5 - 2.0
  enableKeyboardNav: true,  // Boolean
  reducedMotion: false,     // Boolean (prefers-reduced-motion)
}
```

### No Backend Required
- Settings stored locally in browser
- Works 100% offline
- No user tracking or data collection
- Full privacy - your data stays on your device

---

## ♿ ARIA Implementation

### ARIA Roles & Attributes
```jsx
// Button with full accessibility
<button
  role="button"
  aria-label="Descriptive label"
  aria-description="Longer explanation"
  aria-disabled={false}
  aria-pressed={isActive}
/>

// Form with labels
<label htmlFor="theme-select">
  Display Theme
</label>
<select id="theme-select" aria-label="Select display theme">
  <option>Light</option>
  <option>Dark</option>
</select>
```

---

## 🎯 Component Library

### AccessibleButton
```jsx
<AccessibleButton
  label="Try Voice"
  onClick={handleClick}
  description="Play a sample of text-to-speech"
  variant="primary"        // 'primary' | 'secondary' | 'high-contrast'
  icon="🎤"               // Optional emoji/icon
  disabled={false}
/>
```

**Features:**
- Verbal feedback on click
- Full keyboard support
- Clear focus indicators
- ARIA-compliant

### A11ySettings
Modal component for accessibility preferences with:
- Theme selector
- Font size picker
- Text spacing toggle
- Speech rate slider
- Keyboard navigation support

---

## 🧪 Testing Accessibility

### Browser DevTools
1. **Chrome/Edge**: DevTools → Lighthouse → Accessibility
2. **Firefox**: DevTools → Accessibility tab
3. **Safari**: Develop → Accessibility Audit

### External Tools
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Manual Testing
- Navigate using **only** Tab key
- Toggle high contrast mode
- Test with screen reader (NVDA, JAWS, VoiceOver)
- Zoom to 200% and verify layout
- Test with browser zoom

---

## 🌍 Internationalization (i18n)

Future versions will support:
- Multiple languages
- RTL (Right-to-Left) support for Arabic, Hebrew
- Localized screen reader labels
- Cultural accessibility features

---

## 📱 Mobile & Touch Accessibility

### Touch Targets
- Minimum 44x44px clickable area (thumb-friendly)
- Adequate spacing between interactive elements

### Responsive Design
- Works on mobile, tablet, and desktop
- Flexible layout at any size
- Touch-friendly navigation

---

## 🔔 Accessibility Checklist

- ✅ WCAG 2.1 Level AA compliance
- ✅ Keyboard navigability
- ✅ Screen reader compatible
- ✅ High contrast modes
- ✅ Text-to-speech support
- ✅ Scalable typography
- ✅ Focus indicators
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ No flashing/seizure triggers
- ✅ 200% zoom support
- ✅ Color not sole means of conveyance

---

## 📖 Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

---

## Contributing

Found an accessibility issue? Please report it! We're committed to continuous improvement.

---

**This application is built for everyone. 🌍♿**
