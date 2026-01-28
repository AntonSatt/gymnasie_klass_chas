# The Dopamine Trap - Interactive Presentation

An interactive reveal.js presentation about AI, dopamine manipulation, and the hidden vulnerabilities in human psychology.

## 🚀 Live Demo

Once deployed to GitHub Pages, your presentation will be available at:
`https://AntonSatt.github.io/gymnasie_klass_chas/`

## 📖 About

This presentation explores:
- How AI exploits human psychology through dopamine manipulation
- The "variable reward schedule" mechanism that makes AI tools addictive
- Security vulnerabilities in human behavior (not just in systems)
- Practical strategies to maintain control over AI tools

**Speaker:** Anton Sätterkvist (DevOps & Security)

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ and npm

### Setup

```bash
cd slides-content
npm install
```

### Run Development Server

```bash
npm run dev
```

This will start a local server at `http://localhost:9000` with hot-reload enabled.

### Build for Production

```bash
npm run build
```

The built files will be in `slides-content/dist/gymnasie_klass_chas/`.

## 📁 Project Structure

```
slides-content/
├── content/
│   ├── dopamine-trap.md    # Main presentation markdown
│   └── slides.html          # Slide viewer template
├── css/
│   └── slides.scss          # Custom hacker-themed styling
├── js/
│   └── slides.js            # Reveal.js initialization
├── data/
│   └── slides.json          # Slide metadata
├── scripts/
│   └── extractSlideData.js  # Build script
└── index.html               # Landing page with slide list
```

## 🎨 Theme

The presentation uses a custom "hacker aesthetic" theme with:
- Terminal-style monospace font (Courier New)
- Matrix-green text (`#00ff41`)
- Dark background (`#050505`)
- Glowing effects and borders
- Code blocks with syntax highlighting

## 🌐 GitHub Pages Deployment

### Automatic Deployment

1. Push to `main` or `develop` branch
2. GitHub Actions automatically builds and deploys
3. Presentation is live in ~2 minutes

### Manual Setup (First Time)

1. Go to repository Settings → Pages
2. Source: GitHub Actions
3. The workflow will handle the rest

## 📝 Adding More Presentations

1. Create a new `.md` file in `slides-content/content/`
2. Use `---` as slide separators
3. Use `Note:` for speaker notes
4. Run `npm run extract-slide-data` to update the index
5. Push to deploy

Example slide format:

```markdown
# Slide Title

Content here

Note: Speaker notes here

---

# Next Slide

More content
```

## 🎤 Presentation Controls

- **Arrow keys / Space**: Navigate slides
- **S**: Speaker notes view
- **F**: Fullscreen
- **ESC**: Overview mode
- **?**: Show all keyboard shortcuts

## 🔧 Customization

### Change Colors

Edit `slides-content/css/slides.scss`:

```scss
:root {
  --r-background-color: #050505;  // Background
  --r-main-color: #00ff41;        // Text
  --r-heading-color: #fff;        // Headings
}
```

### Change Repository Name

Update `BASE_HREF` in `webpack.config.js` to match your repo name.

## 📄 License

MIT

## 🙏 Credits

Built with:
- [Reveal.js](https://revealjs.com/) - HTML presentation framework
- Inspired by [catsot workshop](https://github.com/AhsanAyaz/catsot) structure
