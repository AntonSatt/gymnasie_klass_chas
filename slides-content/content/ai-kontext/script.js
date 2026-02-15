/* ===========================
   AI & Kontext – Script
   OpenRouter API integration
   =========================== */

// ---- Configuration ----
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
let API_KEY = '';

// ---- Initialize Reveal.js ----
var isMobile = window.innerWidth <= 768;

Reveal.initialize({
  controls: true,
  progress: true,
  history: true,
  center: !isMobile,
  hash: true,
  transition: 'slide',
  // On mobile: use actual screen size so text renders at real size
  // On desktop: use standard presentation dimensions
  width: isMobile ? window.innerWidth : 1280,
  height: isMobile ? window.innerHeight : 720,
  margin: isMobile ? 0.02 : 0.04,
  minScale: isMobile ? 1 : 0.2,
  maxScale: isMobile ? 1 : 2.0,
});

// ---- API Key Management ----

let cameFromShareLink = false;

function loadApiKey() {
  // 1. Check URL params first (from QR code share link)
  const params = new URLSearchParams(window.location.search);
  const urlKey = params.get('apikey');
  if (urlKey) {
    API_KEY = urlKey;
    localStorage.setItem('openrouter-api-key', urlKey);
    cameFromShareLink = true;
    // Clean the key from the URL so it's not visible in the address bar
    params.delete('apikey');
    const cleanURL = window.location.pathname + (params.toString() ? '?' + params.toString() : '') + window.location.hash;
    history.replaceState(null, '', cleanURL);
    return;
  }

  // 2. Fall back to localStorage
  const stored = localStorage.getItem('openrouter-api-key');
  if (stored) {
    API_KEY = stored;
  }
}

function showApiKeyModal() {
  const modal = document.getElementById('api-key-modal');
  modal.classList.add('visible');
  const input = document.getElementById('api-key-input');
  if (API_KEY) {
    input.value = API_KEY;
  }
  input.focus();
}

function closeModal() {
  document.getElementById('api-key-modal').classList.remove('visible');
}

function saveApiKey() {
  const input = document.getElementById('api-key-input');
  const key = input.value.trim();
  if (key) {
    API_KEY = key;
    localStorage.setItem('openrouter-api-key', key);
    updateShareQR();
  }
  closeModal();
}

// ---- QR Code Sharing ----

function getShareURL() {
  // Find the demo slide index so the QR link lands there
  var demoSlide = document.getElementById('slide-demo');
  var slideHash = '';
  if (demoSlide) {
    var allSlides = Reveal.getSlides();
    var idx = allSlides.indexOf(demoSlide);
    if (idx >= 0) slideHash = '#/' + idx;
  }
  var base = window.location.origin + window.location.pathname;
  return base + '?apikey=' + encodeURIComponent(API_KEY) + slideHash;
}

function updateShareQR() {
  const qrImg = document.getElementById('share-qr-img');
  const qrHint = document.getElementById('share-qr-hint');
  if (!qrImg) return;

  if (!API_KEY) {
    qrImg.src = '';
    qrImg.style.display = 'none';
    if (qrHint) qrHint.textContent = 'Sätt en API-nyckel först (Alt+K)';
    return;
  }

  const shareURL = getShareURL();
  qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&color=e6edf3&bgcolor=161b22&data=' + encodeURIComponent(shareURL);
  qrImg.style.display = 'block';
  if (qrHint) qrHint.textContent = 'Scanna för att testa på mobilen!';
}

// ---- OpenRouter API Call ----

async function callOpenRouter(prompt, model) {
  if (!API_KEY) {
    showApiKeyModal();
    throw new Error('API-nyckel saknas. Ange din OpenRouter-nyckel.');
  }

  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + API_KEY,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.href,
      'X-Title': 'AI & Kontext Presentation',
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          role: 'system',
          content: 'Svara kort och koncist. Max 100-150 ord. Inga långa utläggningar. Använd inte markdown-rubriker (##). Skriv på svenska.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 400,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMsg = errorData.error?.message || response.statusText;
    throw new Error('API-fel: ' + errorMsg);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// ---- Markdown rendering helper ----

function renderMarkdown(text) {
  if (typeof marked !== 'undefined') {
    return marked.parse(text);
  }
  // Fallback: escape HTML and preserve line breaks
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');
}

// ---- Battle Rounds ----

const battleResults = {
  demo: { utan: null, med: null, egen: null },
  battle1: { utan: null, med: null, egen: null },
  battle2: { utan: null, med: null, egen: null },
  battle3: { utan: null, med: null, egen: null },
};

// Track which tab is currently active per round
const activeTabs = {
  demo: 'utan',
  battle1: 'utan',
  battle2: 'utan',
  battle3: 'utan',
};

var DEFAULT_MODEL = 'google/gemini-3-flash-preview';

async function runBattlePreset(roundId, type, button) {
  // Read prompt text from the parent .round-prompt card
  const promptEl = button.closest('.round-prompt').querySelector('.prompt-text');
  const prompt = promptEl.textContent.replace(/^[""]|[""]$/g, '').trim();

  const responseEl = document.getElementById(roundId + '-response');

  button.disabled = true;
  button.textContent = 'Tänker...';

  // Switch to this tab and show loading
  activeTabs[roundId] = type;
  updateTabUI(roundId, type);
  responseEl.className = 'ai-response result-slide loading';
  responseEl.innerHTML = 'AI tänker...';

  // Advance to the result slide
  Reveal.next();

  try {
    const result = await callOpenRouter(prompt, DEFAULT_MODEL);
    battleResults[roundId][type] = renderMarkdown(result);
    responseEl.className = 'ai-response result-slide';
    responseEl.innerHTML = battleResults[roundId][type];
  } catch (err) {
    responseEl.className = 'ai-response result-slide error';
    responseEl.textContent = err.message;
  } finally {
    button.disabled = false;
    button.textContent = 'Kör';
    Reveal.layout();
  }
}

async function runBattleCustom(roundId) {
  const textarea = document.getElementById(roundId + '-custom');
  const responseEl = document.getElementById(roundId + '-response');
  const button = textarea.parentElement.querySelector('button');

  const prompt = textarea.value.trim();
  if (!prompt) return;

  button.disabled = true;
  button.textContent = 'Tänker...';

  activeTabs[roundId] = 'egen';
  updateTabUI(roundId, 'egen');
  responseEl.className = 'ai-response result-slide loading';
  responseEl.innerHTML = 'AI tänker...';

  Reveal.next();

  try {
    const result = await callOpenRouter(prompt, DEFAULT_MODEL);
    battleResults[roundId].egen = renderMarkdown(result);
    responseEl.className = 'ai-response result-slide';
    responseEl.innerHTML = battleResults[roundId].egen;
  } catch (err) {
    responseEl.className = 'ai-response result-slide error';
    responseEl.textContent = err.message;
  } finally {
    button.disabled = false;
    button.textContent = 'Kör';
    Reveal.layout();
  }
}

function showBattleTab(roundId, type) {
  activeTabs[roundId] = type;
  updateTabUI(roundId, type);

  const responseEl = document.getElementById(roundId + '-response');
  const stored = battleResults[roundId][type];

  if (stored) {
    responseEl.className = 'ai-response result-slide';
    responseEl.innerHTML = stored;
  } else {
    responseEl.className = 'ai-response result-slide';
    responseEl.innerHTML = '<p class="placeholder-text">Inte körd än – gå tillbaka och kör denna prompt.</p>';
  }
  Reveal.layout();
}

function updateTabUI(roundId, activeType) {
  ['utan', 'med', 'egen'].forEach(function (type) {
    var tab = document.getElementById(roundId + '-tab-' + type);
    if (tab) tab.classList.toggle('active', activeType === type);
  });
}

// ---- Keyboard shortcut: press 'k' to open API key modal ----

document.addEventListener('keydown', function (e) {
  if (e.key === 'k' && e.altKey) {
    e.preventDefault();
    showApiKeyModal();
  }
});

// Close modal on Escape
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// Save on Enter in API key input
document.getElementById('api-key-input').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    saveApiKey();
  }
});

// ---- Mobile keyboard fix ----
// When the virtual keyboard opens on mobile, scroll the textarea into view
// so the user can see what they're typing.

if (isMobile) {
  document.querySelectorAll('.custom-prompt-row textarea').forEach(function (textarea) {
    textarea.addEventListener('focus', function () {
      var el = this;
      // Wait for keyboard to open, then scroll into view
      setTimeout(function () {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 350);
    });
  });

  // Recalculate Reveal layout when keyboard opens/closes (viewport resize)
  window.visualViewport && window.visualViewport.addEventListener('resize', function () {
    Reveal.layout();
  });
}

// ---- Init ----

loadApiKey();
updateShareQR();

// If user came from QR share link, navigate to demo slide
if (cameFromShareLink) {
  var demoSlide = document.getElementById('slide-demo');
  if (demoSlide) {
    var allSlides = Reveal.getSlides();
    var idx = allSlides.indexOf(demoSlide);
    if (idx >= 0) Reveal.slide(idx);
  }
}

// Show API key modal on first demo slide if no key is set
Reveal.on('slidechanged', function (event) {
  if (event.currentSlide.dataset.state === 'demo-slide' && !API_KEY) {
    showApiKeyModal();
  }
});
