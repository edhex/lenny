#!/usr/bin/env python3
"""Save previously generated fal Australian female voice clips to GitHub Pages.
No fal API key and NO NEW FAL GENERATION. Run quickly while source links exist.
Requires ffmpeg. The WAV source URLs may expire; run the Action after uploading.
"""
from __future__ import annotations
import concurrent.futures,json,re,subprocess,tempfile,time,urllib.request
from pathlib import Path
ROOT=Path(__file__).resolve().parent
URLS={}
for line in (ROOT/'assets/voice/remote_paths.txt').read_text().splitlines():
    if '=' not in line:continue
    k,v=line.strip().split('=',1)
    if not re.fullmatch(r'[0-9a-f]{16}',k) or not re.fullmatch(r'[0-9a-z]+/[A-Za-z0-9_-]+',v):
        raise RuntimeError('Bad URL in manifest')
    URLS[k]='https://v3b.fal.media/files/b/'+v+'_gemini_tts_output.wav'
TARGET=ROOT/'assets/voice/library'
TARGET.mkdir(parents=True,exist_ok=True)
def one(item):
    ident,url=item
    destination=TARGET/(ident+'.mp3')
    if destination.is_file() and destination.stat().st_size>1000:return ident,'cached'
    err=None
    for retry in range(3):
        try:
            req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 LennyVoiceArchive/1.0'})
            with urllib.request.urlopen(req, timeout=65) as response: raw=response.read()
            if len(raw)<1000:raise ValueError('Empty audio')
            with tempfile.TemporaryDirectory() as d:
                src=Path(d)/'input.wav';dst=Path(d)/'output.mp3'
                src.write_bytes(raw)
                subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(src),'-vn','-ac','1','-ar','24000','-b:a','64k',str(dst)],check=True)
                if dst.stat().st_size<1000:raise ValueError('MP3 empty')
                destination.write_bytes(dst.read_bytes())
            return ident,'downloaded'
        except Exception as e:
            err=e;time.sleep(1+retry)
    return ident,'ERROR '+str(err)
if __name__=='__main__':
    import sys
    if '--dry-run' in sys.argv:
        print('Recordings:',len(URLS),'cached:',sum((TARGET/(k+'.mp3')).exists() for k in URLS))
        sys.exit()
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        results=list(pool.map(one,URLS.items()))
    errors=[x for x in results if x[1].startswith('ERROR')]
    available=[k for k in URLS if (TARGET/(k+'.mp3')).exists() and (TARGET/(k+'.mp3')).stat().st_size>1000]
    (ROOT/'assets/voice/available.json').write_text(json.dumps({'available':available},indent=2))
    index=ROOT/'index.html';html=index.read_text()
    prefix='/* VOICE_PRESENT_START */';suffix='/* VOICE_PRESENT_END */'
    start=html.index(prefix)+len(prefix);end=html.index(suffix,start)
    html=html[:start]+' '+json.dumps(available,separators=(',',':'))+' '+html[end:]
    index.write_text(html)
    print('Recorded:',len(available),'of',len(URLS),'errors',len(errors))
    for row in errors[:8]:print(row[0],row[1])
    if errors:raise SystemExit('Some source URLs expired or downloads failed. Existing files were saved; re-run the workflow or regenerate individual missing lines.')
