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

async function runBattle(inputId, responseId) {
  const input = document.getElementById(inputId);
  const responseEl = document.getElementById(responseId);
  const button = input.parentElement.querySelector('button');

  const prompt = input.value.trim();
  if (!prompt) return;

  button.disabled = true;
  button.textContent = 'Tänker...';
  responseEl.className = 'ai-response result-slide loading';
  responseEl.innerHTML = 'AI tänker...';

  // Advance to the result slide
  Reveal.next();

  try {
    const model = document.getElementById('model-select')
      ? document.getElementById('model-select').value
      : 'google/gemini-3-flash-preview';
    const result = await callOpenRouter(prompt, model);
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
