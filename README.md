# Lenny v11 — Install the Real Australian Voice Files

The 213 fal recordings have been generated, but earlier v7-v10 ZIPs shipped **zero audio binaries**. This v11 package has the original source manifest, a no-ffmpeg installer, and a fail-loud GitHub Actions workflow that puts WAV files into the published site.

**Important: THIS DOWNLOAD IS AN INSTALLER KIT, NOT A ZIP CONTAINING ALL 213 VOICE RECORDINGS YET.** The clips must be downloaded once from the original fal-hosted source URLs. This must be done on a computer or GitHub Actions runner with internet access. The code sandbox used to prepare this installer cannot access the fal file host. Once installed, the resulting ZIP contains actual recorded voices and doesn't contact fal during normal play.

## Easiest: GitHub Actions, no manual audio download

1. Unzip this package. Upload **everything inside** to the root of the existing GitHub repository. Don't skip the hidden `.github` folder; GitHub Desktop (or `git`) is easiest to preserve it.
2. Go to **Settings → Pages → Build and deployment**, select **GitHub Actions**.
3. Open **Actions → Publish Lenny with REAL Recorded Voices → Run workflow** (or push to `main`).
4. Wait for **Install and VERIFY all 213 recorded voices** to complete successfully. If this step fails, the deployment will show RED instead of publishing a silent site. Read the error to see which source recording failed. **Do not ignore a red build.**
5. After a green deployment, open `https://YOUR_SITE/voice-test.html` and tap the first, joke, idea and mission voice tests. The status must show **213/213**.

The workflow tries to commit WAV files to GitHub for persistence; if that step lacks permission, they are still in the deployed Pages artifact for this successful run. Enabling **Settings → Actions → General → Workflow permissions → Read and write** lets it persist WAVs as source files where allowed.

## Alternative: make a ZIP that really contains recordings on your Mac

1. Unzip this installer kit on your Mac.
2. Double-click **INSTALL_LENNY_VOICES_MAC.command**. (If macOS blocks it, Control-click → Open. If Python 3 is missing, install Python from python.org and open it again.)
3. The script downloads and verifies all 213 recordings (and eight optional classic lines). It reuses files already downloaded when rerun.
4. After success you'll get **Lenny_READY_FOR_GITHUB_WITH_213_VOICES.zip** in the same folder. This is the actual audio-filled website package.
5. Unzip that READY zip, put its contents into the existing GitHub repository using GitHub Desktop, then commit and push. On the site, open `/voice-test.html` to confirm the audio is present.

Because GitHub's browser upload can have file-count limits, **GitHub Desktop** is recommended for uploading hundreds of WAV files; simply dragging the WAV-filled site folder to the web upload page may not import the complete library in one commit.

## What stays unchanged

- Big Missions: 35, Adventure Ideas: 48, jokes with immediate punchline: 52 and speaking practice.
- Six hidden hearts, rewards, nickname saves, visual worlds and iPhone/iPad mobile fixes.
- The game tries installed WAV and MP3 files first, then remote audio and finally one device voice where needed. No two narrators should talk simultaneously.

## Troubleshooting

- `/voice-test.html` reports 0/213: audio files were NOT uploaded/deployed. Use the workflow or installer above.
- It reports 213/213 but the test button is silent: check media volume, iOS silent/Focus settings, and on-screen error report; share the exact status with ChatGPT.
- Installer says some downloads failed: the source URLs may have expired or your network blocked them. Rerun; it keeps good files. If a source has expired, that recording must be retrieved again from fal or regenerated.
- Use the same website domain as before to keep existing progress on the device.
