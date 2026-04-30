# ⚡ QUICKSTART - PWD Accessibility Hub

> Deploy your accessible app in 10 minutes or less!

---

## 🏃 60-Second Start

```bash
# Install dependencies
npm install

# Run locally
npm run dev
```

Open `http://localhost:5173/` ✅

---

## 🚀 Deploy to Live Web (5 minutes)

### Option 1: Vercel (Easiest)

```bash
# 1. Create GitHub repo
git init
git add .
git commit -m "PWD Accessibility Hub"
git remote add origin https://github.com/YOUR_USERNAME/pwd-hub.git
git branch -M main
git push -u origin main

# 2. Go to https://vercel.com/new
# 3. Select your repository
# 4. Click Deploy
# 5. Done! Get your URL in 60 seconds
```

### Option 2: GitHub Pages

```bash
# Update vite.config.js base:
# base: '/pwd-hub/',

npm install -D gh-pages
npm run build
npm run deploy
```

Site available at: `https://your-username.github.io/pwd-hub/`

---

## 📋 Project Checklist

- ✅ React + Vite setup
- ✅ Tailwind CSS configured  
- ✅ Text-to-Speech working
- ✅ High contrast themes
- ✅ Keyboard navigation
- ✅ Settings saved locally
- ✅ WCAG 2.1 AA compliant
- ✅ Ready to deploy

---

## 🎯 Key Features (Already Built!)

| Feature | How to Use |
|---------|-----------|
| 🎤 **Text-to-Speech** | Click "Try Voice" button |
| 🎨 **Themes** | Click "Settings" → Change theme |
| 📝 **Font Size** | Settings → Font Size buttons |
| ⌨️ **Keyboard Nav** | Tab through everything |

---

## 📚 Full Documentation

- [README.md](README.md) - Complete overview
- [DEPLOYMENT.md](DEPLOYMENT.md) - Detailed hosting guide
- [ACCESSIBILITY.md](ACCESSIBILITY.md) - Accessibility deep-dive

---

## 🛠️ Common Commands

```bash
npm run dev       # Local development
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Check code quality
```

---

## 💡 Add Features

### Add New Accessible Button
```jsx
import AccessibleButton from './components/AccessibleButton'

<AccessibleButton
  label="My Button"
  description="What this button does"
  onClick={() => console.log('clicked')}
  variant="primary"
/>
```

### Update User Settings
```javascript
import { saveSetting } from './utils/a11ySettings'

saveSetting('fontSize', 'xl')
```

### Text-to-Speech
```javascript
import { speakText } from './utils/speechHelper'

speakText('Hello, world!', { rate: 0.9 })
```

---

## 🧪 Test Accessibility

```bash
# Chrome: DevTools → Lighthouse → Accessibility
# Firefox: DevTools → Accessibility tab
# Or use WAVE extension: https://wave.webaim.org/extension/
```

**Test with:**
- ✅ Keyboard only (Tab + Enter)
- ✅ Screen reader (NVDA, JAWS, VoiceOver)
- ✅ Browser zoom to 200%
- ✅ High contrast mode

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 5173 in use | `npm run dev -- --port 3000` |
| Dependencies issue | `rm -rf node_modules && npm install` |
| Build fails | `npm run build` and check errors |
| Settings not saving | Check browser LocalStorage enabled |

---

## 📦 Project Stats

| Metric | Value |
|--------|-------|
| Build time | ~585ms |
| CSS (gzip) | 2.51 kB |
| JS (gzip) | 63.40 kB |
| Lighthouse | 95+ |
| WCAG Level | AA ✅ |

---

## 🎉 You're Ready!

### Next Steps:
1. ✅ Run `npm run dev`
2. ✅ Test the app locally
3. ✅ Deploy to Vercel or GitHub Pages
4. ✅ Share your link!

---

## 💬 Need Help?

- 📖 Read [DEPLOYMENT.md](DEPLOYMENT.md)
- 📖 Read [ACCESSIBILITY.md](ACCESSIBILITY.md)
- 🔗 Check [Full README](README.md)

---

## ⭐ Pro Tips

1. **Test with Screen Reader**: Download NVDA (free) or use your OS one
2. **Use Tab Key**: Tab + Shift+Tab to navigate
3. **High Contrast Mode**: Settings → Display Theme
4. **Deploy Early**: Get feedback from users ASAP
5. **Add PWA**: Later - offline support!

---

**🚀 Ready? Deploy now!** See [DEPLOYMENT.md](DEPLOYMENT.md)
