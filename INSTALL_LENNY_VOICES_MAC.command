#!/bin/bash
set -u
cd "$(dirname "$0")" || exit 1
clear
echo "=============================================="
echo "        LENNY VOICE INSTALLER (v11)"
echo "       213 REAL AUSTRALIAN VOICE CLIPS"
echo "=============================================="
echo ""
if ! command -v python3 >/dev/null 2>&1; then
  echo "Python 3 was not found on this Mac."
  echo "Install Python 3 from https://www.python.org/downloads/macos/ and double-click this file again."
  read -r -p "Press Return to close..." _
  exit 1
fi
python3 scripts/install_voices.py --package
result=$?
echo ""
if [ "$result" -eq 0 ]; then
  echo "SUCCESS! You now have Lenny_READY_FOR_GITHUB_WITH_213_VOICES.zip"
  echo "in the same folder as this installer."
  echo "This file contains actual audio files: no fal runtime connection needed."
else
  echo "Audio setup is incomplete. Some files might be blocked or expired."
  echo "Rerun this script to retry missing audio; it keeps successful downloads."
  echo "If it keeps failing, share the error message in ChatGPT."
fi
echo ""
read -r -p "Press Return to close..." _
exit "$result"
