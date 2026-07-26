PROJECT NAME: Gita Guru

WHAT IT IS:
A web app that answers any life question using Bhagwat Gita.
Single HTML file. No backend. No login. Free forever.

AI MODEL FOR APP: google/gemma-3-27b-it:free via OpenRouter
API ENDPOINT: https://openrouter.ai/api/v1/chat/completions

CORE LOGIC RULES:
1. Read user emotion and problem deeply
2. Find single most relevant Gita shloka
3. Show: Chapter, Verse, Sanskrit, Transliteration, Meaning
4. Explain directly tied to user's exact situation
5. Never generic. Always personal.
6. Sensitive questions (desire, anger, fear) = handle with 
   compassion, not judgment. Never refuse. Find Gita answer.
7. Unrelated questions = gently redirect to life topics

TECH STACK:
- Single index.html (HTML + CSS + JS all in one file)
- Fetch API for OpenRouter calls
- No frameworks. No npm. No build step.
- Deploy on Vercel via GitHub

DESIGN:
- Dark theme. Saffron and gold colors.
- Mobile first.
- Cormorant Garamond font for shloka text
- Clean chat interface

WHAT IS ALREADY DONE:
- index.html base version exists
- OpenRouter API call logic works
- System prompt written

WHAT IS NOT DONE:
- Needs improvement as per task given