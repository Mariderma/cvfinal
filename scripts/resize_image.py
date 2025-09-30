from PIL import Image
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
infile = BASE / 'assets' / 'placeholder-project-1.jpg'
outfile = BASE / 'assets' / 'placeholder-project-1-800w.jpg'
target_width = 800

if not infile.exists():
    print('Input file not found:', infile)
    raise SystemExit(1)

img = Image.open(infile)
w, h = img.size
if w <= target_width:
    print('Image already smaller than or equal to target width; copying file instead')
    img.save(outfile, quality=85)
else:
    new_h = int(target_width * h / w)
    resized = img.resize((target_width, new_h), Image.LANCZOS)
    resized.save(outfile, quality=85)
    print('Saved resized image to', outfile)
