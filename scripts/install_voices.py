#!/usr/bin/env python3
"""Install the ORIGINAL fal-generated Lenny recordings as physical WAV files.

Network access is needed only for this installation step. No fal login/API key or
ffmpeg is needed. The completed website works as a static GitHub Pages site.

`python3 scripts/install_voices.py --package` produces an upload-ready ZIP.
`python3 scripts/install_voices.py` is used by GitHub Actions.

Source filenames and destination paths are from the fixed manifests in assets/.
"""
from __future__ import annotations
import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
import json
import os
from pathlib import Path
import sys
import time
import wave
import zipfile
from urllib.request import Request,urlopen

ROOT=Path(__file__).resolve().parents[1]
DEST=ROOT/'assets'/'voice'
MANIFEST=ROOT/'assets'/'voice-v7-sources.json'
EXTRA=ROOT/'assets'/'voice-sources.json'
EXPECTED_NEW=213
DEST.mkdir(parents=True,exist_ok=True)

def is_wave(path:Path)->bool:
    try:
        if not path.is_file() or path.stat().st_size < 2000:return False
        with wave.open(str(path),'rb') as wf:
            return wf.getnframes()>500 and wf.getframerate()>6000 and wf.getnchannels()>=1
    except Exception:return False

def download(job):
    key,url=job
    if not key.replace('-','').replace('_','').isalnum():raise RuntimeError('Unexpected voice key '+key)
    filename=DEST/(key+'.wav')
    if is_wave(filename):return key,True,'existing'
    err=''
    for attempt in range(3):
        part=filename.with_suffix('.wav.part')
        try:
            req=Request(url,headers={'User-Agent':'Lenny-Audio-Installer/11'})
            with urlopen(req,timeout=55) as resp:
                if resp.status!=200:raise RuntimeError('HTTP '+str(resp.status))
                with part.open('wb') as out:
                    while True:
                        chunk=resp.read(65536)
                        if not chunk:break
                        out.write(chunk)
                        if out.tell()>15_000_000:raise RuntimeError('Unexpectedly large audio')
            if not is_wave(part):raise RuntimeError('Not a valid WAV audio file')
            part.replace(filename)
            return key,True,'downloaded'
        except Exception as e:
            err=str(e)
            try:part.unlink(missing_ok=True)
            except Exception:pass
            if attempt<2:time.sleep(1+attempt)
    return key,False,err[:125]

def main():
    parser=argparse.ArgumentParser(description='Download and permanently bundle the 213 Australian Lenny voice recordings.')
    parser.add_argument('--package',action='store_true',help='Create a ZIP ready for GitHub Desktop / upload')
    parser.add_argument('--verify',action='store_true',help='Report existing WAV files without fetching')
    opts=parser.parse_args()
    all_new=json.loads(MANIFEST.read_text())
    extras=json.loads(EXTRA.read_text()) if EXTRA.is_file() else {}
    if len(all_new)!=EXPECTED_NEW:sys.exit(f'Voice manifest mismatch: {len(all_new)} instead of {EXPECTED_NEW}')
    duplicate=set(all_new)&set(extras)
    if duplicate:sys.exit('Duplicate keys: '+repr(duplicate))
    jobs=list(all_new.items())+list(extras.items())
    if not opts.verify:
        print(f'Downloading {len(all_new)} new recordings + {len(extras)} classic recordings.',flush=True)
        with ThreadPoolExecutor(max_workers=7) as pool:
            pending={pool.submit(download,item):item[0] for item in jobs}
            completed=0
            for future in as_completed(pending):
                k,ok,note=future.result()
                completed+=1
                print(f'{completed}/{len(jobs)} {"OK" if ok else "FAILED"} {k} {note}',flush=True)
    installed=[k for k in [*all_new,*extras] if is_wave(DEST/(k+'.wav'))]
    missing=[k for k in all_new if k not in installed]
    optional_missing=[k for k in extras if k not in installed]
    (DEST/'local-ready.js').write_text('window.LENNY_LOCAL_CLIPS='+json.dumps(installed,ensure_ascii=False,separators=(',',':'))+';\n')
    print(f'New recorded voice files: {len(all_new)-len(missing)}/{len(all_new)}',flush=True)
    print(f'Classic recorded voice files: {len(extras)-len(optional_missing)}/{len(extras)}',flush=True)
    if missing:
        print('MISSING NEW RECORDINGS: '+', '.join(missing),file=sys.stderr)
        print('Do not publish until every new voice is installed. You can rerun to retry only missing files.',file=sys.stderr)
        return 2
    if opts.package:
        final=ROOT.parent/'Lenny_READY_FOR_GITHUB_WITH_213_VOICES.zip'
        if final.exists():final.unlink()
        with zipfile.ZipFile(final,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=6) as z:
            for p in sorted(ROOT.rglob('*')):
                if not p.is_file():continue
                rel=p.relative_to(ROOT)
                if '__pycache__' in rel.parts or p.name.endswith('.part') or p.name.endswith('.pyc'):continue
                if p.name.startswith('.DS_Store'):continue
                z.write(p,rel.as_posix())
        with zipfile.ZipFile(final) as z:
            bad=z.testzip()
            if bad:raise RuntimeError('ZIP corruption: '+bad)
            voices=[n for n in z.namelist() if n.startswith('assets/voice/') and n.endswith('.wav')]
            if len(voices)<EXPECTED_NEW:raise RuntimeError('ZIP missing audio: '+str(len(voices)))
        print('READY: '+str(final),flush=True)
        print('This output ZIP CONTAINS '+str(len(voices))+' real WAV audio files.',flush=True)
    return 0

if __name__=='__main__':sys.exit(main())
