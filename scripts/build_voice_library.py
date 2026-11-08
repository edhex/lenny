#!/usr/bin/env python3
"""One-time build of original, pre-generated fal voice clips for static GitHub Pages.

The manifest contains URLs from completed fal generation jobs. GitHub Actions
converts their WAV outputs to local, optimized MP3s, then commits the MP3s to
the repository (when GitHub's Actions write permission permits). No fal API
key or paid runtime integration is needed by a child playing the website.
"""
from __future__ import annotations
import concurrent.futures
import json
import shutil
import subprocess
import sys
import tempfile
import time
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
VOICE_DIR = ROOT/'assets'/'voice'
MANIFEST = ROOT/'assets'/'voice-v7-sources.json'
VOICE_DIR.mkdir(parents=True, exist_ok=True)
SOURCES = json.loads(MANIFEST.read_text(encoding='utf-8'))
if not shutil.which('ffmpeg'):
    sys.exit('ffmpeg is required to convert WAV to compact MP3 for iPhone and iPad')

def one(item):
    key, url = item
    dest = VOICE_DIR/f'{key}.mp3'
    if dest.is_file() and dest.stat().st_size > 2000 and (dest.read_bytes()[:3]==b'ID3' or dest.read_bytes()[:2]==b'\xff\xfb'):
        return key, True, 'already present'
    for attempt in range(3):
        try:
            request = Request(url, headers={'User-Agent':'Lenny-Little-Adventure-Static-Voice/7.0'})
            with urlopen(request, timeout=35) as resp:
                data=resp.read(15_000_000)
            if not data.startswith(b'RIFF') or len(data)<3000:
                raise ValueError('Unexpected response; audio was not WAV')
            with tempfile.TemporaryDirectory(prefix='lenny-voice-') as t:
                wav=Path(t)/'source.wav'
                wav.write_bytes(data)
                tmp=Path(t)/'output.mp3'
                subprocess.run(['ffmpeg','-nostdin','-loglevel','error','-y','-i',str(wav),'-ac','1','-ar','24000','-c:a','libmp3lame','-q:a','5',str(tmp)],check=True,timeout=40)
                if tmp.stat().st_size < 2000:raise ValueError('Output MP3 unexpectedly small')
                tmp.replace(dest)
            return key, True, f'{dest.stat().st_size:,} bytes'
        except Exception as exc:
            if attempt==2:return key, False, str(exc)[:180]
            time.sleep(1.5*(attempt+1))

if __name__=='__main__':
    results=[]
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        for key,ok,message in pool.map(one,SOURCES.items()):
            print(('OK  ' if ok else 'FAIL')+' '+key+': '+message,flush=True)
            results.append((key,ok,message))
    failed=[k for k,ok,_ in results if not ok]
    print('Voice clips ready: '+str(len(results)-len(failed))+'/'+str(len(SOURCES)))
    available=sorted(key for key in SOURCES if (VOICE_DIR/f'{key}.mp3').exists() and (VOICE_DIR/f'{key}.mp3').stat().st_size>2000)
    (VOICE_DIR/'local-ready.js').write_text('window.LENNY_LOCAL_CLIPS='+json.dumps(available,separators=(',',':'))+';\n',encoding='utf-8')
    if failed:
        print('WARNING: Some recordings missing; website will try hosted fal links and use one device voice if needed: '+', '.join(failed),file=sys.stderr)
        # Do not block website deployment because some/any fal links expired.

