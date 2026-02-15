/* ===========================
   AI & Kontext – Script
   OpenRouter API integration
   =========================== */

// ---- Configuration ----
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
let API_KEY = '';

// ---- Initialize Reveal.js ----
Reveal.initialize({
  controls: true,
  progress: true,
  history: true,
  center: true,
  hash: true,
  transition: 'slide',
  width: 1280,
  height: 720,
});

// ---- API Key Management ----

function loadApiKey() {
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
  }
  closeModal();
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
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 1024,
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

// ---- Demo Slide: Main prompt runner ----

async function runPrompt() {
  const input = document.getElementById('prompt-input');
  const responseEl = document.getElementById('ai-response');
  const button = document.getElementById('run-btn');
  const modelSelect = document.getElementById('model-select');

  const prompt = input.value.trim();
  if (!prompt) return;

  button.disabled = true;
  button.textContent = 'Tänker...';
  responseEl.className = 'ai-response result-slide loading';
  responseEl.innerHTML = 'AI tänker...';

  // Advance to the result slide
  Reveal.next();

  try {
    const result = await callOpenRouter(prompt, modelSelect.value);
    responseEl.className = 'ai-response result-slide';
    responseEl.innerHTML = renderMarkdown(result);
  } catch (err) {
    responseEl.className = 'ai-response result-slide error';
    responseEl.textContent = err.message;
  } finally {
    button.disabled = false;
    button.textContent = 'Kör';
    Reveal.layout();
  }
}

// ---- Battle Rounds ----

const battleResults = {
  battle1: { utan: null, med: null, egen: null },
  battle2: { utan: null, med: null, egen: null },
  battle3: { utan: null, med: null, egen: null },
};

// Track which tab is currently active per round
const activeTabs = {
  battle1: 'utan',
  battle2: 'utan',
  battle3: 'utan',
};

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
    const model = document.getElementById('model-select')
      ? document.getElementById('model-select').value
      : 'google/gemini-3-flash-preview';
    const result = await callOpenRouter(prompt, model);
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
    const model = document.getElementById('model-select')
      ? document.getElementById('model-select').value
      : 'google/gemini-3-flash-preview';
    const result = await callOpenRouter(prompt, model);
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

// ---- Init ----

loadApiKey();

// Show API key modal on first demo slide if no key is set
Reveal.on('slidechanged', function (event) {
  if (event.currentSlide.dataset.state === 'demo-slide' && !API_KEY) {
    showApiKeyModal();
  }
});
