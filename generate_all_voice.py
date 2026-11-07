#!/usr/bin/env python3
"""Record all prewritten Lenny lines with fal. No secrets are stored in the website.

Run: pip install fal-client requests
     export FAL_KEY=your_key   # GitHub Action uses an encrypted secret
     python generate_all_voice.py

The fal account must have credits. Each utterance is paid and there are hundreds.
"""
from __future__ import annotations
import concurrent.futures, json, os, re, subprocess, sys, tempfile, time
from pathlib import Path
import requests
try:
 import fal_client
except ImportError:
 raise SystemExit('Install dependencies: pip install fal-client requests')
ROOT=Path(__file__).resolve().parent
MANIFEST=json.loads((ROOT/'assets/voice/manifest.json').read_text())
STYLE="Speak with a friendly, distinctly Australian female accent (Melbourne Australian English), not American or British. You are Lenny, a warm, playful, slightly cheeky, funny lion friend reading to children aged five or six. Use natural native Australian vowels, clear enunciation, gentle theatrical energy and comic timing. Avoid harsh shouting or robotic delivery. Read the supplied transcript exactly. Banksia is pronounced BANK-see-ah, a common Australian flower and a girl's name. When reading a joke question, sound curious with a playful pause at the end; when reading the answer, smile and enjoy the silly punchline."
MAX_WORKERS=max(1,min(4,int(os.getenv('LENNY_WORKERS','3'))))
# Generate only files that have not been made before; the job is safe to rerun.
def generate(row):
 output=ROOT/row['file']
 if output.exists() and output.stat().st_size>1000:return ('cached',row['id'])
 data=fal_client.subscribe('google/gemini-3.8-flash-tts',arguments={'prompt':row['text'],'voice':'Aoede','style_instructions':STYLE},with_logs=False)
 audio=data.get('audio') or {}
 url=audio.get('url')
 if not url: raise RuntimeError('No audio URL for '+row['id'])
 resp=requests.get(url,timeout=75)
 resp.raise_for_status()
 output.parent.mkdir(parents=True,exist_ok=True)
 # Convert the generated WAV to a small, broadly compatible MP3 for iOS and iPadOS.
 with tempfile.NamedTemporaryFile(suffix='.wav',delete=False) as tmp:
  tmp.write(resp.content); temp=Path(tmp.name)
 try:
  subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(temp),'-ac','1','-ar','24000','-b:a','96k',str(output)],check=True)
 finally:temp.unlink(missing_ok=True)
 if output.stat().st_size<1000:raise RuntimeError('Audio too small for '+row['id'])
 return ('generated',row['id'])

items=MANIFEST['speech']
if '--dry-run' in sys.argv:
 from collections import Counter
 missing=[r for r in items if not (ROOT/r['file']).exists()]
 print('Audio lines:',len(items),'missing:',len(missing),'kinds:',Counter(r['group'] for r in items))
 print('Approx characters to voice:',sum(len(r['text']) for r in missing))
 raise SystemExit(0)

if not os.getenv('FAL_KEY'):raise SystemExit('Missing FAL_KEY environment variable. Do NOT commit a key into GitHub.')
existing=[r for r in items if not (ROOT/r['file']).exists()]
print('Recording',len(existing),'missing of',len(items),'with max workers',MAX_WORKERS,flush=True)
errors=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_WORKERS) as pool:
 futs={pool.submit(generate,r):r for r in existing}
 for i,fut in enumerate(concurrent.futures.as_completed(futs),1):
  row=futs[fut]
  try:
   status,key=fut.result()
   print(f'[{i}/{len(futs)}] {status}: {row["group"]} {key}',flush=True)
  except Exception as e:
   errors.append((row['id'],str(e)))
   print('ERROR',row['id'],str(e),flush=True)
   if 'balance_exhausted' in str(e).lower() or 'out of credits' in str(e).lower():
    print('fal needs credits. Existing completed files are preserved.',flush=True)
    break

available=[r['id'] for r in items if (ROOT/r['file']).exists() and (ROOT/r['file']).stat().st_size>1000]
(ROOT/'assets/voice/available.json').write_text(json.dumps({'available':available},indent=2))
index=ROOT/'index.html';html=index.read_text()
html,n=re.subn(r'(/\* VOICE_PRESENT_START \*/ )\[[^\]]*\]( /\* VOICE_PRESENT_END \*/)',lambda m:m.group(1)+json.dumps(available)+m.group(2),html,count=1)
if n!=1:raise RuntimeError('Cannot update voice clip availability in index.html')
index.write_text(html)
print('Available clips:',len(available),'of',len(items),' errors:',len(errors))
if errors:raise SystemExit(1)
