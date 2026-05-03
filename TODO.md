# Global Speech Callback System Implementation

## Current Status
- [x] Analyzed files (App.jsx, Header.jsx, A11ySettings.jsx)
- [x] Plan approved by user

## Implementation Steps

### Phase 1: Core Infrastructure (STEPS 1-3)
- [ ] Create `src/utils/speechEngine.js` - Central Web Speech API engine
- [ ] Create `src/hooks/useSpeechCallback.js` - Reusable speakOnClick hook
- [ ] Create `src/hooks/useVolumeKey.js` - Volume up/down navigation

### Phase 2: App.jsx Integration (STEPS 4,8)
- [ ] Update App.jsx: Import new tools, replace speakCardContent, add useVolumeKey, welcome speech

### Phase 3: Component Speech Callbacks
- [ ] Update Header.jsx: Speech for Vision/Deaf/Settings buttons
- [ ] Update A11ySettings.jsx: Speech for all settings changes/toggles/tabs/buttons
- [ ] Update LetterPronunciation.jsx: Speech for textarea focus/buttons

### Phase 4: CSS & Polish (STEP 9)
- [ ] Add .is-speaking CSS enhancements to App.css or sensekit.css

### Phase 5: Testing & Verification
- [ ] Test all clicks speak correctly
- [ ] Test volume keys cycle through cards/page elements
- [ ] Verify no breakage to existing functions
- [ ] Run `npm run dev` and test mobile volume keys

**Next Step:** Create speechEngine.js
