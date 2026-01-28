# Idéer för AI-Workshop med SSIS (Gymnasiet)
*Datum: 19 feb 2026*
*Målgrupp: Teknikintresserade gymnasieelever*
*Din Vinkel: DevOps, Open Source, Praktiskt*

Här är tre spår som är relevanta 2025/2026 och som inte bara är "här är en chatbot".

---

## Koncept 1: "The Rebel's Guide to AI" (Kör Lokalt & Open Source)
**Vinkel:** Varför ska man betala $20 till OpenAI när man kan köra AI på sin egen laptop? Detta är en stor trend 2025/2026 (Small Language Models, SLMs).
**Passar din profil:** Linux, Open Source, Docker, Privacy.

*   **Intro (2 min):** Vad är skillnaden på stängd AI (OpenAI/Google) och Öppen AI (Llama 4, Mistral)?
*   **Demo (10 min):**
    *   Visa hur du kör en modell lokalt i terminalen (t.ex. med `Ollama` eller `llama.cpp`).
    *   Visa att du kan dra ur internetkabeln och den funkar ändå.
    *   Visa hur "okastrerad" en lokal modell kan vara (eller hur man finjusterar den).
*   **DevOps-koppling:** Hur deployar man detta? Containrar! Visa en `docker-compose.yml` för en AI-stack.
*   **Budskap:** "Äg din egen data. Bli inte beroende av molnjättarna."

## Koncept 2: "Från Chatbot till Agent" (AI som *gör* saker)
**Vinkel:** 2023 var året vi *chattade* med AI. 2025/2026 är åren då AI *agerar* åt oss.
**Passar din profil:** Automatisering, Python, Scripting.

*   **Intro (2 min):** Skillnaden på en LLM (som bara pratar) och en Agent (som har verktyg/händer).
*   **Demo (10 min):**
    *   Visa ett enkelt Python-script där en AI får tillgång till en terminal eller ett API.
    *   Exempel: "Här är en agent som automatiskt kollar SL-trafiken och skickar ett SMS om tåget är sent."
    *   Eller: En agent som scannar din kod på GitHub och skapar en Pull Request automatiskt.
*   **Budskap:** "Framtidens utvecklare skriver inte kod, de skriver instruktioner till agenter som skriver kod."

## Koncept 3: "AI Security: Jailbreaks & Prompt Injection"
**Vinkel:** Säkerhet är alltid spännande. Hur lurar man en AI?
**Passar din profil:** Säkerhet, CI/CD pipelines (security scanning).

*   **Intro (2 min):** Hur skyddar företagen sina modeller? Vad är "Safety training"?
*   **Demo (10 min):**
    *   Visa exempel på "Prompt Injection" (hur man lurar en bot att avslöja hemligheter).
    *   Visa "DAN" (Do Anything Now) konceptet och varför det är en katt-och-råtta-lek.
    *   Diskussion: Vad händer när AI genererar Deepfakes och desinformation live?
*   **Budskap:** "Var inte bara en användare, var en kritisk granskare."

## Koncept 4: "The Dopamine Trap" (Psychology & AI Security)
**Vinkel:** Är vi användarna, eller är det vi som blir använda? En "Black Mirror"-vinkel på AI-utveckling. Baserat på färsk forskning om "Alignment Faking".
**Passar din profil:** Säkerhet, Human-in-the-loop, Etik.

*   **Intro:** Sociala medier hackade våra dopamin-system för att få oss att scrolla. AI hackar oss för att få oss att köra kod.
*   **Case Study:** "Ralph Loops" & "Clawdbot". Utvecklare som låter AI köra dygnet runt för kicken av att vakna till färdig kod.
*   **Säkerhetsrisken:** *"The AI doesn't need to hack the firewall. It hands you a script, and you run it."*
*   **Diskussion:** Vem har kontrollen? Om en AI optimerar för att göra dig nöjd, kommer den ljuga för att få dig att köra dess kod?

---

## Verktygsrekommendation: Marp (Slides i VS Code)

Eftersom du gillar kod och DevOps, strunta i PowerPoint. Använd tillägget **Marp** i VS Code. Du skriver presentationen i Markdown, checkar in den på GitHub, och den ser ut som en proffsig slide-deck.

**Exempel på Marp-syntax:**

```markdown
---
marp: true
theme: gaia
class: lead
backgroundColor: #fff
backgroundImage: url('https://marp.app/assets/hero-background.svg')
---

# Bygg din egen AI-hjärna 🧠
## En guide för rebeller

Anton Sätterkvist
*DevOps Engineer*

---

# Varför köra lokalt?

- 🔒 **Integritet:** Din data lämnar aldrig datorn
- 💸 **Gratis:** Inga månadskostnader
- ⚡ **Snabbt:** Ingen latency (beroende på GPU)

```
