#!/usr/bin/env python3
"""Generate small self-contained, storybook vector mission backdrops."""
from pathlib import Path
from html import escape
root=Path(__file__).resolve().parents[1]/'assets/worlds'
# slug, large illustrated prop, two smaller props, headline, palette
worlds=[
 ('home','🏰','🌈','⭐','Lenny’s floating island','#4dc4c2','#ffe5a0','#9adab6','#f6a8d0'),
 ('pirate','🏴‍☠️','🗺️','🧭','The secret island','#4ab8d5','#ffe4a3','#a8dfb2','#e9b06b'),
 ('builder','🧱','🛠️','📐','The secret workshop','#99d9eb','#ffe6cb','#d5baff','#ffb880'),
 ('river','🛟','🛶','🌊','Rescue river','#6ccddd','#d6fcf5','#8dd5c6','#96a5d8'),
 ('theatre','🎭','📚','✨','Storybook stage','#9f8bde','#ffe5e2','#edb9ee','#ffd27a'),
 ('mystery','🕵️','🔎','🎩','Mystery studio','#78b9cf','#fae8b0','#e4bbec','#e995a1'),
 ('news','🎙️','📺','🛸','Lenny’s newsroom','#7b9fda','#f9e0be','#bde6f4','#f2b7c4'),
 ('shop','🛍️','🪙','🧸','Five coin toy shop','#feb99a','#ffebbc','#beeab4','#cfb2f3'),
 ('lab','💡','⚙️','🚀','The invention lab','#6dc7be','#fff1bb','#b9acee','#f9cb80'),
 ('party','🎈','🎂','🎁','The party planet','#ec9ecd','#fff0b2','#9bdbea','#c5edac'),
 ('puzzle','🖍️','🧩','🫶','Fair play park','#88d8ad','#ffdfad','#b5c8f5','#ffb3b3'),
 ('welcome','🧩','🤝','🪁','Welcome world','#78cbb5','#f8e0ba','#eab9da','#b8dbe9'),
 ('kindness','💛','🏡','🌷','Kindness street','#f4b1c6','#fff0b8','#b7e4d4','#a8bdea'),
 ('bridge','🌉','📄','💧','Bridge bay','#70b8de','#fff2b7','#b5e8ea','#d0b8e9'),
 ('tower','🏗️','🧱','🏁','Builder valley','#76cbd9','#ffecc6','#a7e6b4','#f9b5a0'),
 ('maze','🌀','🗝️','🏆','Maze land','#8bb6eb','#fce3be','#b7a5e6','#f6aab8')]
for slug,hero,sm1,sm2,title,sky,sun,field,accent in worlds:
 esc=escape
 s=f'''<svg xmlns="http://www.w3.org/2000/svg" width="1086" height="1448" viewBox="0 0 1086 1448" role="img" aria-label="{esc(title)} storybook landscape">
 <defs>
  <linearGradient id="sky" x1="0" x2=".25" y1="0" y2="1"><stop stop-color="{sky}"/><stop offset="1" stop-color="{sun}"/></linearGradient>
  <linearGradient id="land" x1="0" x2="0" y1="0" y2="1"><stop stop-color="{field}"/><stop offset="1" stop-color="{sky}"/></linearGradient>
  <filter id="shadow"><feDropShadow dx="3" dy="9" stdDeviation="9" flood-color="#27355e" flood-opacity=".16"/></filter>
  <pattern id="dots" width="49" height="49" patternUnits="userSpaceOnUse"><circle cx="4" cy="7" r="3.8" fill="#ffffff" opacity=".26"/></pattern>
 </defs>
 <rect width="1086" height="1448" fill="url(#sky)"/>
 <rect width="1086" height="1448" fill="url(#dots)" opacity=".5"/>
 <circle cx="894" cy="184" r="139" fill="{sun}" opacity=".85"/>
 <path d="M0 720 C172 557 243 768 420 668 C606 562 695 768 1086 569 L1086 1448 H0Z" fill="{field}" opacity=".62"/>
 <path d="M0 933 C220 783 303 1000 516 873 C712 761 907 995 1086 864 L1086 1448 H0Z" fill="url(#land)"/>
 <path d="M0 1255 C183 1166 366 1284 550 1221 S868 1131 1086 1228 L1086 1448 H0Z" fill="{accent}" opacity=".48"/>
 <g opacity=".81" fill="#fff9ed"><ellipse cx="180" cy="290" rx="127" ry="36"/><circle cx="115" cy="257" r="48"/><circle cx="193" cy="243" r="70"/><ellipse cx="725" cy="406" rx="116" ry="34"/><circle cx="661" cy="377" r="47"/><circle cx="735" cy="357" r="68"/></g>
 <g fill="none" stroke="#fffdf7" stroke-opacity=".64" stroke-linecap="round" stroke-width="9">
  <path d="M123 492 q36 -37 75 2"/><path d="M172 444 l0 -16"/><path d="M212 464 l14 -14"/>
  <path d="M842 835 q22 -25 53 0"/><path d="M911 873 q21 -32 56 -11"/>
  <path d="M90 930 l32 0 m-16 -16 l0 32"/><path d="M934 1190 l24 0 m-12 -12 l0 24"/>
 </g>
 <g filter="url(#shadow)" transform="translate(758 565) rotate(8)">
  <rect x="-185" y="-173" width="353" height="326" rx="58" fill="#fffdf2" opacity=".9" stroke="#ffffff" stroke-width="15"/>
  <circle cx="-5" cy="-3" r="142" fill="{accent}" opacity=".48"/>
  <text x="-4" y="73" text-anchor="middle" font-family="Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,sans-serif" font-size="221">{hero}</text>
 </g>
 <g filter="url(#shadow)" transform="translate(210 905) rotate(-12)">
  <circle r="118" fill="#fffdf3" opacity=".91" stroke="#fff" stroke-width="12"/>
  <text x="0" y="54" text-anchor="middle" font-family="Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,sans-serif" font-size="147">{sm1}</text>
 </g>
 <g filter="url(#shadow)" transform="translate(870 1069) rotate(7)">
  <rect x="-116" y="-116" width="236" height="228" rx="68" fill="#fffdf3" opacity=".88" stroke="#fff" stroke-width="12"/>
  <text x="0" y="59" text-anchor="middle" font-family="Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,sans-serif" font-size="141">{sm2}</text>
 </g>
 <g fill="{sun}" opacity=".84"><circle cx="150" cy="131" r="9"/><circle cx="184" cy="157" r="15"/><circle cx="948" cy="700" r="9"/><circle cx="1000" cy="676" r="15"/><circle cx="570" cy="1210" r="10"/></g>
 <path d="M38 1410 Q543 1314 1048 1410" fill="none" stroke="#fff6d9" stroke-width="10" stroke-dasharray="22 30" opacity=".56"/>
 </svg>'''
 (root/f'{slug}.svg').write_text(s)
print('Created',len(worlds),'storybook vector worlds')
