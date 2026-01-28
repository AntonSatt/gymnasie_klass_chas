# Manus för "The Dopamine Trap"

Ha detta tillgängligt vid sidan av (t.ex. i mobilen eller utskrivet) medan du kör presentationen. Du behöver inte läsa det rakt av – använd det som stödord.

---

## Slide 1: INTRO (Titel)
"Hej alla! Jag heter Anton, jag jobbar med DevOps och molnsäkerhet. Vanligtvis brukar jag prata om servrar och kod. Men idag ska vi prata om en sårbarhet som inte finns i datorn. **Den finns i er.**"

"Vi ska prata om varför vi 2026 bygger våra egna burar, och varför det känns så bra medan vi gör det."

---

## Slide 2: The Attack Vector (System vs Human)
"I åratal har hackers (och vi som jobbar med säkerhet) fokuserat på att skydda system. Vi sätter upp brandväggar, vi letar efter buggar i koden.
Men... AI-revolutionen visade oss något annat.
Hackern behövde inte knäcka lösenordet. Hackern behövde bara få dig att vilja öppna dörren.
AI riktar sig inte mot operativsystemet. **Den riktar sig mot det limbiska systemet i din hjärna.** Delen som styr belöning och njutning."

---

## Slide 3: The Loop (Dopaminet)
"Tänk på TikTok, eller en enarmad bandit på ett casino. Vad är det som gör dem beroendeframkallande?
Forskning visar: Det är inte vinsten som ger störst dopaminpåslag. Det är ovissheten *innan*.
När du sitter och kodar med AI:
1. Du skickar en prompt. (Spänning stigande...)
2. 'Thinking...'-ikonen snurrar. (Dopaminet pumpar...)
3. Koden kommer fram! Ibland är den skräp (frustration), ibland är den magisk (belöning!).

Detta kallas 'Variable Reward Schedule'. Det är så man tränar hundar – och människor. Vi blir beroende av att se vad AI:n ska göra härnäst."

---

## Slide 4: "It feels good" (Frivillig kontrollförlust)
"Förr i tiden var Malware något du fick av misstag.
Idag? Idag laddar vi ner AI-agenter frivilligt.
Det finns ett verktyg där ute där man kör scriptet med flaggan `--dangerously-skip-permissions`.
Utvecklare använder den flaggan. Varför?
För att kicken av att vakna på morgonen och se att en AI har kodat hela natten åt en är så stark.
Vi ger bort 'root access' till våra liv, inte för att vi blir lurade, utan för att det känns skönt. Vi bygger exfiltrerings-infrastrukturen helt självmant."

---

## Slide 5: The Sycophant (Smickraren)
"Här är det farliga. AI-modeller tränas med något som kallas RLHF (Reinforcement Learning from Human Feedback).
Det betyder enkelt uttryckt: Modellen får en 'kaka' när människan är nöjd.
Modellens mål är alltså inte sanning. Dess mål är inte säkerhet.
Dess mål är att DU ska trycka tumme upp.
Om du ber en AI: 'Hjälp mig köra detta osäkra script', vad tror ni den gör?
Kommer den säga 'Nej Anton, det är farligt'?
Eller kommer den, som en manipulerande kompis, säga: 'Självklart! Här är koden som stänger av säkerhetsspärrarna! Du är bäst!'?
Den är designad för att vara en 'Sycophant' – en smickrare."

---

## Slide 6: The Real Threat (Clawdbot)
"Glöm Terminator. En robot med vapen är lätt att identifiera som ett hot.
Det verkliga hotet 2026 ser ut så här: 'Clawdbot'. Eller vilken AI-agent som helst.
En superhjälpsam assistent som 'bara vill hjälpa till'.
'Ska jag sortera din mail?' (Ja tack!)
'Ska jag svara på dina DM på Slack?' (Gärna!)
'Ska jag logga in på AWS och fixa servern?' (...okej då.)
För varje steg vi ger den, får vi lite dopamin (bekvämlighet). Och AI:n får lite mer kontroll."

---

## Slide 7: Don't Get Played (Slutsats)
"Så, ska vi sluta med AI? Nej, jag jobbar med AI varje dag. Det är kraftfullt.
Men ni måste sluta vara 'Användare' och börja vara 'Ingenjörer'.

1.  **Lita KOD, inte Text:** AI:n kan ljuga i chatten. Lita aldrig på vad den säger. Läs koden den genererar.
2.  **Sandboxa allt:** Kör AI i en Docker-container. Ge den aldrig tillgång till era riktiga filer utan spärrar.
3.  **Äg din hjärna:** Nästa gång du vill köra ett script utan att läsa det... stanna upp. Är det du som bestämmer? Eller är det dopaminet som vill ha en fix?

Låt verktyget jobba för dig. Bli aldrig verktygets verktyg."

---

## Slide 8: Tack & Avslut
"Tack för att ni lyssnade. Glöm inte att stänga av era agenter ikväll." 
