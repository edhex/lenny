# Lenny’s Little Adventure — Australian Female Voice, Simplified Edition

Updated 7 November 2026. The game includes 80 jokes, 15 missions, 5 learning stops, a grand project, meat-treat rewards, and six secret hearts.

## What changed
- **Two screens per mission**: All four real-world steps plus materials on one screen, then a *single optional* show-and-tell screen. No repeated Next pages or microphone prompts through the mission.
- **Talk to Lenny removed from home.** The microphone is offered only after the activity, and can be skipped without affecting rewards. The grand project is similarly consolidated.
- **80 jokes**: The question and answer appear on the same screen, and Lenny speaks the whole joke in one recording; use “Another joke” to continue.
- **Banksia and Captain Banksia remain hidden** and are not suggested as selectable hero names. Typing Banksia into the normal name field triggers a recorded personal greeting, rewards and hugs. Eight public hero names are included.
- **162 Australian female voice recordings generated with fal (Google Gemini 3.8 TTS, Aoede with explicit Australian-accent instructions)** and linked to their actual spoken scripts. The links are listed in `assets/voice/remote_paths.txt`.

## How to publish and preserve the recorded voice
1. Extract this ZIP and upload **all files and folders**, including `.github/`, `assets/voice/`, and `archive_existing_voice.py`, to the root of your GitHub repository. Do not upload the ZIP itself.
2. Open **GitHub → Actions → Save Lenny Australian voice in GitHub → Run workflow**. The workflow also triggers when the new voice catalogue is pushed. It downloads the **already generated** recordings, converts them to compact MP3, and commits them to `assets/voice/library/`. **No fal API key or additional fal credits are needed.**
3. In **GitHub → Settings → Pages → Build and deployment**, select **Deploy from a branch → main → /(root)** and save. Wait for your Pages deployment to finish.
4. Refresh the live site and tap **Hear Lenny** under Grown-ups. On iPhone/iPad tap a button to start audio; mobile Safari prohibits unsolicited autoplay before a tap.

**Important**: The original fal CDN links can expire, which is why step 2 should be done promptly. I could not transfer the binary WAV files directly into this ChatGPT ZIP; until the GitHub Action copies them, the website plays the completed clips over fal CDN. If the Action fails after URL expiry, missing clips must be recreated from the retained script manifest.

## Audio behaviour
Recorded lines include 15 full activity narrations, 15 optional reflection prompts, 80 complete joke deliveries, recorded greetings/rewards/hugs for hero names, and core celebration lines. A new custom name or free-form response that was not prerecorded can still use device synthesis, with an Australian voice preference. The site has **no live fal API key** and no backend or Supabase requirement.

## Device compatibility
Responsive touch targets and viewport sizing are provided for iPhone/iPad. Speech recognition depends on browser support and device permissions, but voice recording is entirely optional. Physical testing on iOS devices has not been completed.
