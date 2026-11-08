# Lenny v9 — Voice isolation + instant punchlines

This is a direct replacement for Lenny v7/v8. The game still has **Big Missions (35)**, **Lenny Adventure Ideas (48)** and **Giggle Club (52)**, with the same six secret hearts, meat rewards, saved progress, touch animations and Australian female recordings.

## Fixes

- When a joke opens, **both the question and punchline are visible immediately**, and Lenny plays the **full prerecorded joke** (`jokef-XX.mp3`). No reveal button or surprise second voice.
- Children can tap **My turn! Tell the whole joke**, then speak and mark it complete to earn a Giggle Star. **Practise it step by step** remains optional (question → punchline → whole joke), with no pronunciation grading.
- The voice manager prioritises the fal recordings and cancels any earlier device narration before starting a clip. Giggle Club never starts browser text-to-speech if a recording is missing or punctuation differs. Longer, unrecorded mission instructions can still use browser narration on their own.
- Cache-busting version 9 URLs make GitHub Pages load the updated scripts rather than an older cached v7/v8 script.

## Publish

Unzip this package and upload **its contents** to the root of the existing GitHub Pages repository, including `.github/workflows/deploy.yml` and `.nojekyll`. Commit to `main`. The GitHub Action will download previously generated recordings from the 213-item `assets/voice-v7-sources.json` manifest when they aren't already present; no live fal API is needed for a child playing the site. **These audio binaries are not embedded in this ZIP.** If fal's source links have expired, the download job may fail; retained `assets/voice/*.mp3` from earlier successful deployments should be preserved in your repository.

Run a hard reload on iPhone after GitHub Pages publishes if an old version was cached. Previously saved progress uses the same localStorage keys.

# v8: Australian Voice Playback Fix

This is a drop-in replacement for v7. It fixes the computer-generated browser voice speaking at the same time as Lenny's recorded Australian female voice.

**What changed:** All 213 prerecorded clips take priority; the browser voice is cancelled before and after a recording starts, the joke-rehearsal punchline now uses the prerecorded full joke instead of a robot, replay plays the same recording, and a missing MP3 never triggers an overlapping robot voice. Activity steps that do not have recordings can still use device speech *on their own*.

**Important:** The ZIP includes the same manifest and GitHub Actions first-deploy download step for 213 MP3s, not the MP3 binaries themselves. Check the GitHub Actions build logs to ensure all 213 clips are successfully downloaded. A missing clip now shows an on-screen message rather than replacing the recording with a computer voice. The existing eight classic recorded lines retain their hosted-file fallback but never switch to browser TTS if missing.

Keep the same published URL and upload all the ZIP contents to the root of your GitHub repository; saved progress is unchanged.

---

# Lenny’s Little Adventure — v8 (Voice Overlap Fix — Three Ways to Play)

A colourful, touch-friendly and static children's adventure website. The three main buttons are now exactly:

1. **🏅 Big Missions** — 35 Alpha-inspired life-skill missions spanning leadership, public speaking, enterprise, relationships and grit. Continue the five-badge adventure or choose freely from the Mission Arcade.
2. **⚡ Lenny Adventure Ideas** — 48 original short, low-preparation boredom-busters, usually 2–6 minutes long, with indoor/movement/pretend/outdoor filters and a random-idea button. There are no worksheets, no pass/fail tests and no pressure. The child can tell Lenny they tried it, then choose another.
3. **🤭 Giggle Club** — 52 jokes, cycling without repeating until the pool is exhausted. Listen to a joke question; reveal the punchline; optionally practise the question, the punchline and the complete joke. Each completed rehearsal earns a Giggle Star, without assessing speech accuracy.

This retains Lenny's original six secret hearts, hugs, feeding mechanism, animated mascot, scenes, nickname-based saved progress and v5 phone/tablet layout fixes. It **does not** need Supabase, Vercel or a fal API key during gameplay.

## Publish on GitHub Pages

1. Download and unzip `Lenny_Little_Adventure_v7_GitHub.zip`.
2. Upload **all files inside the ZIP** to the **root** of your existing GitHub repository, including the hidden `.github` folder and `.nojekyll` file. Replace the existing files and commit to `main`.
3. In the repository, open **Settings → Pages → Build and deployment**. Select **GitHub Actions**. The included workflow does the rest.
4. Open the **Actions** tab and verify that **Publish Lenny to GitHub Pages** completes successfully. The first deployment will generate optimized static MP3 assets from the **213 voice recordings** already generated via fal.
5. Open the site on iPhone or iPad; tap **Let’s play!** and select a mode. Tap **Hear Lenny** if your device blocks speech before a user gesture.

### Important first-time audio step

The ZIP contains the **complete recording manifest**, not the large WAV/MP3 binaries. The included GitHub Actions workflow downloads the **213 already-generated fal WAV clips** and converts each to a compact MP3 during the first deployment. It then attempts to **commit the MP3s back into the GitHub repository** so future rebuilds will not rely on fal’s temporary URLs.

- This first build **requires GitHub Actions to have internet access and the source URLs to remain available**. Publish promptly. If it fails, open the Actions log for the missing file names; no site voice assets are silently substituted by the build.
- For permanent GitHub storage, under **Settings → Actions → General → Workflow permissions**, permit **Read and write permissions** if your repository allows it; this enables the workflow's automatic MP3 commit. If this step is blocked, the deployed site still has the audio from that build, but you should commit the MP3s manually before rebuilding after the source URLs expire.
- Future updates can use the committed local audio. There is **no fal API connection or secret on the live site**.
- The existing eight legacy Lenny clips are fetched separately as an optional best effort; the new v7 recordings are the primary voice pack.

## What's voiced

- **35** mission introductions.
- **52** joke questions and **52** full joke performances (the separate punchline-only rehearsal uses device speech).
- **48** Adventure Idea explanations, with the silly optional twist.
- **12** mission celebrations, **4** Giggle Star celebrations, **6** quick wins, and **4** welcome/navigation lines.

That's **213 new AI-generated voice recordings**, produced using the connected fal account with the same cheerful Australian female direction. Longer mission instructions, freeform chat and optional rehearsal text fall back to device speech (preferably Australian English where available). Microphone access is optional; nothing gets recorded or scored by the website.

## Privacy and offline behaviour

- Children may enter a nickname, which is saved only in the browser together with earned badges, treats, hearts, Giggle Stars and tried Adventure Ideas. Saved progress doesn't automatically sync between devices.
- The microphone uses browser speech recognition where supported. It is optional, may use the browser provider's speech service, and is not used to assign a pronunciation score or store recordings/transcripts.
- After deployment, the prerecorded MP3s are served from the static GitHub Pages website. If a file is missing or audio is blocked by a browser, Lenny falls back to its built-in text or browser speech.
- Keep the same published site address to preserve local progress on that device.
- All content is for supervised family play. Younger children should ask a grown-up before using materials or playing outside.

## Files

- `index.html` — the original game, five-badge journey, jokes and legacy saved-profile handling.
- `assets/fun-pass.js`, `assets/fun-pass.css` — the v6 expanded missions, joke practice, worlds and full-screen celebrations.
- `assets/lenny-v7.js`, `assets/lenny-v7.css` — the three-choice homepage, boredom-busters, 213-clip audio integration, and new UI.
- `assets/voice-v7-sources.json` — fixed download source list of the 213 already-generated fal clips (no credentials).
- `scripts/build_voice_library.py` — runs only at build time to download and convert voice clips to local `.mp3` files.
- `.github/workflows/deploy.yml` — first-download, audio persistence, and static GitHub Pages deployment.
- `assets/worlds` — 35 mission world scenes, plus supporting scenes.

For full compatibility, test microphone and audio with an actual iPhone running Safari as well as Chrome/desktop after publishing.
