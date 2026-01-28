---
marp: true
theme: default
class: list
paginate: true
backgroundColor: #1a1a1a
color: #e0e0e0
style: |
  section h1 { color: #4dabf7; }
  section h2 { color: #a5d8ff; }
  code { background-color: #333; color: #ff922b; }
---

<!-- _class: lead -->
# AI 2026: Kör din egen hjärna 🧠
## Varför du inte behöver OpenAI för att bygga framtiden

**Anton Sätterkvist**
*DevOps & Cloud Engineer*

---

# Agenda

1. **AI-läget 2026:** Vad har hänt de senaste åren?
2. **Molnet vs. Lokalt:** Varför köra AI på sin egen laptop?
3. **Demo:** Vi kör igång en LLM här och nu (utan internet!)
4. **DevOps:** Hur bygger och driftar vi detta?
5. **Q&A**

---

# Vad är nytt 2026? 🚀

- **Small Language Models (SLMs):** Modeller som är små nog att köras i din telefon men smarta nog att koda.
- **Agents:** AI som inte bara snackar, utan *gör* saker (bokar biljetter, deployar servrar).
- **Open Source:** Meta (Llama) och Mistral har gett oss kraften tillbaka.

---

# Varför köra lokalt? (The Rebel approach)

Varför ska vi skicka all vår data till Kalifornien? 🇺🇸

- 🔒 **Integritet:** Din data lämnar aldrig rummet.
- 💸 **Kostnad:** Gratis (om du har hårdvaran).
- 🛠️ **Kontroll:** Du bestämmer censurnivå och regler.

> *"If you don't control the weights, you don't control the AI."*

---

# Demo Time! 💻

Låt oss se vad min laptop klarar av.

*(Här byter jag till terminalen)*

```bash
# Vad jag kommer köra:
$ ollama run llama4:8b

# Eller analysera en bild lokalt:
$ ollama run llava "Vad finns i den här bilden?"
```

---

# DevOps-vinkeln: Hur driftar vi detta? ⚙️

Som DevOps-ingenjör "bygger" jag inte AI-modellen, jag ser till att den *lever*.

Liknelse:
- **Data Scientist:** Designar motorn. 🏎️
- **DevOps:** Bygger bilen, tankar den, fixar väghållningen och ser till att den inte kraschar. 🔧

Vi använder **Docker** för att paketera allt:

```yaml
services:
  ai-brain:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ./models:/root/.ollama
```

---

# Framtiden för er (SSIS-elever) 🎓

Vad ska ni fokusera på?

1. **Prompt Engineering är dött.** Lär er hur systemen fungerar under huven.
2. **Hybrid AI:** Framtiden är en blandning av stora moln-modeller och snabba lokala modeller.
3. **Bygg saker!** Ladda ner Docker, kör Linux, lek med koden.

---

<!-- _class: lead -->
# Frågor? 🤔

*Tack för att ni lyssnade!*

---

# Länkar & Resurser

- **Ollama:** Lättaste sättet att köra lokalt (ollama.com)
- **Hugging Face:** "GitHub för AI" (huggingface.co)
- **Min hemsida:** antonsatt.com

