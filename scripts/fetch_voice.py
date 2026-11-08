#!/usr/bin/env python3
"""Cache Lenny's eight AI-voiced Australian-style moments for static hosting.
Run once from repo root (or let the GitHub Actions workflow run it).
Generated clips were created for this game in the connected fal account.
"""
from pathlib import Path
import json
import time
from urllib.request import Request, urlopen
from urllib.error import URLError

root = Path(__file__).resolve().parents[1]
sources = json.loads((root / 'assets/voice-sources.json').read_text(encoding='utf-8'))
output_dir = root / 'assets/voice'
output_dir.mkdir(parents=True, exist_ok=True)
failed = []
for name,url in sources.items():
    dest = output_dir / f'{name}.wav'
    if dest.exists() and dest.stat().st_size > 1000 and dest.read_bytes()[:4] == b'RIFF':
        print('Already cached:', dest)
        continue
    for attempt in range(1,4):
        try:
            req = Request(url, headers={'User-Agent': 'Lenny-Fun-Pass-v2/1.0'})
            with urlopen(req, timeout=45) as resp:
                audio = resp.read(25_000_000)
            if len(audio) < 1000 or audio[:4] != b'RIFF':
                raise ValueError('Unexpected/invalid WAV response')
            dest.write_bytes(audio)
            print('Cached:', dest.name, len(audio), 'bytes')
            break
        except (OSError, ValueError, URLError) as exc:
            print(f'Attempt {attempt} for {name}: {exc}')
            if attempt < 3:time.sleep(2*attempt)
            else:failed.append(name)
print(f'Available voice clips: {len(sources)-len(failed)}/{len(sources)}')
if failed:
    print('Could not fetch:', ', '.join(failed))
    print('Website can still try the hosted clips, then fall back to browser speech.')
    raise SystemExit(1)
