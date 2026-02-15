# Gymnasie-presentationer – Anton Sätterkvist

Interaktiva Reveal.js-presentationer riktade till gymnasieelever.

## Live Demo

Deployad via GitHub Pages:
`https://AntonSatt.github.io/gymnasie_klass_chas/`

## Presentationer

### 1. Dopaminfällan: AI & Din Hjärna
Hur AI utnyttjar hjärnans belöningssystem, dopaminmanipulation och praktiska strategier.

### 2. AI & Kontext: Nyckeln till Smarta Svar (NY)
15-20 min presentation om hur gymnasieelever kan använda AI smartare genom bättre kontext och prompt engineering. Inkluderar:
- Live-demos med OpenRouter API (Claude / GPT)
- Side-by-side jämförelser: dålig vs bra prompt
- Interaktiv AI Battle (Människor vs AI)
- Studiehacks: sammanfatta texter, förklara svåra grejer, skapa övningsfrågor

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

## Project Structure

```
slides-content/
├── content/
│   ├── dopamine-trap.md       # Dopaminfällan (markdown slides)
│   ├── ai-kontext/            # AI & Kontext (standalone)
│   │   ├── index.html         # Reveal.js presentation (CDN)
│   │   ├── styles.css         # Swedish theme (blue/yellow)
│   │   └── script.js          # OpenRouter API integration
│   └── slides.html            # Markdown slide viewer template
├── css/
│   └── slides.scss            # Dopaminfällan styling
├── js/
│   └── slides.js              # Reveal.js init (webpack)
├── data/
│   └── slides.json            # Slide metadata
├── scripts/
│   └── extractSlideData.js    # Build script
└── index.html                 # Landing page
```

## AI & Kontext – OpenRouter API Setup

AI & Kontext-presentationen har inbyggd live-demo med OpenRouter API. Så här sätter du upp det:

1. Skaffa en API-nyckel på [openrouter.ai/keys](https://openrouter.ai/keys)
2. Starta presentationen (`content/ai-kontext/index.html`)
3. Nyckeln begärs automatiskt vid första demo-sliden, eller tryck `Alt+K`
4. Nyckeln sparas i localStorage (behöver bara anges en gång per webbläsare)

Modeller som stöds: Claude Sonnet 4, Claude 3.5 Sonnet, GPT-4o Mini.

**Kör AI-presentationen lokalt (utan webpack):**

```bash
# Enklast med Python:
cd slides-content/content/ai-kontext
python3 -m http.server 8080
# Öppna http://localhost:8080
```

Eller öppna `index.html` direkt i webbläsaren (API-anrop kräver dock en server pga CORS).

## GitHub Pages Deployment

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
