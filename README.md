# Lenny’s Little Adventure — recorded Australian voice only

**8 November 2026 · Audio-delay fix**

This is the simplified Lenny game: 15 missions (one instructions screen + one optional show-and-tell screen), 80 jokes, meat treats, six secret hearts/hugs, player profiles, eight visible hero names, and a hidden **Banksia** Easter egg.

## What was fixed

The old build first tried an absent `assets/voice/hello.wav`, then a fal CDN URL, then a device-generated voice. This could produce a long pause, an unwanted generic voice, or a recording that started after the child had moved on.

**The new build uses one audio system:** recorded Australian female MP3s stored in your own GitHub repository (`assets/voice/library/`). There is **no browser/computer text-to-speech and no live fal CDN fallback**. If a local recording is unavailable, blocked, or takes more than **850 ms** to start, Lenny stays silent. It never plays unexpectedly later. Changing screens, muting or leaving the tab immediately cancels playback. All text, games, rewards, and the optional microphone still work without audio.

## Critical one-time step — archive the completed recordings

The 162 recorded audio clips were already created using your fal credits. Their original download locations are in `assets/voice/remote_paths.txt`. **The ZIP does not contain the MP3 files yet** because the audio files could not be copied directly into this work environment. The included GitHub Action copies them into your repository; it does **not** generate any additional speech or use fal credits.

1. Unzip and upload **all contents**, preserving `.github/workflows/render-lenny-voice.yml`, `archive_existing_voice.py`, `assets/voice/remote_paths.txt`, `assets/voice/available.json`, and `index.html`. Existing `assets/voice/library/*.mp3` files should be kept if your previous workflow saved them.
2. On GitHub, open **Actions → Save Lenny Australian voice in GitHub → Run workflow** (or allow the push-triggered run). Under **Settings → Actions → General → Workflow permissions**, use **Read and write permissions** if the Action cannot push its files. The workflow runs ffmpeg, downloads the 162 prerecorded WAVs, converts them to small MP3s and commits them alongside the site.
3. **Verify** the GitHub folder `assets/voice/library/` contains `.mp3` files, and `assets/voice/available.json` lists their IDs. The workflow summary should report **Recorded: 162 of 162**. If some links expired, the workflow shows which clips failed. Those particular clips will be silent unless regenerated.
4. If GitHub Pages isn't published yet: **Settings → Pages → Deploy from a branch → main → /(root)**. Once Pages has deployed the commit with audio, reload the page (on mobile, close and reopen the tab if an older version was cached).

**Before the archive workflow succeeds, Lenny will intentionally be silent.** That's the behaviour you requested: no odd synthetic voice in its place.

## Audio behaviour and limits

- Recorded lines: 15 full task readings, 15 optional reflections, 80 complete jokes, core welcome/rewards, personalised greetings and hugs for the eight listed hero names and hidden Banksia (162 recorded scripts total).
- Custom names beyond those recorded, open-ended spoken responses, and anything else without a matching recording are displayed as text **silently**.
- iPhones and iPads require user interaction to start audio. Tapping the mission, joke or “Hear Lenny” button should provide that interaction. Safari/browser microphone permissions only affect the optional **Tell Lenny** feature.
- If a sound doesn't start promptly, it is dropped — it never switches to synthetic speech or interrupts another activity later.

No Supabase, Vercel, persistent server or fal API key is required for this static GitHub Pages site. The audio copy Action requires a GitHub Actions runner and write permission to commit to the repository.

## Checks

`index.html` is a single-file HTML/CSS/JavaScript game. Its JavaScript passes `node --check`. The audio implementation is free of browser speech synthesis and live fal-CDN playback. A complete iPhone/iPad physical browser test was not possible in this environment.
