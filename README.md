# Lenny’s Little Adventure — expanded Australian Voice Edition

**Build:** 7 November 2026. **80 jokes** and **406 finite spoken utterances** prepared for Australian female fal TTS. **10 selectable hero names**, including **Banksia** (pronounced **BANK-see-ah**). The existing game, meat rewards, secret hearts, hugs, and progress are preserved.

## Important truth about the audio
The connected fal account returned **out of credits** during this update. The game includes the previously completed **8 fal-generated highlight recordings as fal CDN links** in `index.html` (listed at `assets/voice/FEATURED_FAL_AUDIO_URLS.txt`), but **the new complete library has not been generated**. The clips are not yet locally packaged; remote links may expire.

**Until recordings are rendered:** All text still plays through the device’s speech synthesis, prioritising Australian English. Banksia is given a pronunciation hint to improve this fallback. The exact selected voice cannot be guaranteed across Safari devices. Lenny remains playable without audio.

## How to make every scripted line use the recorded fal female voice (one-time)
1. Add credits to the same **fal** account (https://fal.ai/dashboard/usage-billing/credits). The output is billable, approximately 37,394 characters across 406 utterances. This is a one-time rendering expense, not a fee each time a child plays.
2. Create a fal API key and save it in **GitHub → repository Settings → Secrets and variables → Actions → New repository secret**, named **`FAL_KEY`**. Do not paste the key into `index.html` or commit it in your repository.
3. Push this package (including the `.github/workflows` folder) to the `main` branch of your repository.
4. Go to **Actions → Record Lenny's full Australian voice → Run workflow**. It generates only missing files, creates local MP3s at `assets/voice/library/`, updates `index.html` to use them, and commits the audio back to the repo.
5. Visit GitHub Pages. When the MP3s are present, Lenny’s mission steps, proof questions, project instructions, joke questions and punchlines, common chat lines, names, and rewards use locally hosted fal recordings. You can repeat the Action after a partial run; already generated files are skipped.

**Note:** Personalised names other than the included 10, open-ended responses that quote a child’s own words, and arbitrary microphone answers cannot all be prerecorded. These use Australian speech synthesis. To make **every possible unscripted response** use the exact same fal voice requires a secure, metered server-side voice endpoint, which GitHub Pages alone cannot run. This release deliberately does not expose a fal API key in the browser.

## Current site features
- Name entry and hero nickname suggestions, Banksia first
- 80 shuffled age-appropriate jokes, avoiding immediate repeats
- 15 activity variants, 5 core stops and 4-part grand project, with spoken steps
- Pixel meat earned on mission completion, feed Lenny to trigger the animated celebration
- Six secret hearts; tap any for a hug, find all six for a larger celebration
- Progress and nicknames stored only in the child’s browser
- Touch-friendly targets, responsive phone / iPad layout; physical device testing still recommended
- Browser microphone optional; typing and taps work without it

## Publish on GitHub Pages
Extract this ZIP, upload the **contents** (including `index.html`, `assets/` and `.github/`) to the repo root. In **Settings → Pages** choose **Deploy from a branch**, branch **main**, folder **/(root)**. No Supabase or Vercel required for pre-generated audio.

## Voice technical details
Voice engine: `google/gemini-3.8-flash-tts` through fal, voice **Aoede**, with explicit Australian female voice instructions. The available recordings are matched to exact text, so the written script and the voice always agree. Each recorded line is converted to low-bandwidth MP3 for Safari/iOS. The Action uses encrypted `FAL_KEY` and never puts it in frontend JavaScript.

If you prefer running the generation yourself instead of GitHub Actions: install Python 3.11, `ffmpeg`, and `pip install fal-client requests`; set `FAL_KEY` in your environment and run `python generate_all_voice.py`. Run `python generate_all_voice.py --dry-run` first to see the missing count (without generating).
