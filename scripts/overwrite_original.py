from PIL import Image
from pathlib import Path

base = Path(__file__).resolve().parent.parent
resized = base / 'assets' / 'placeholder-project-1-800w.jpg'
orig = base / 'assets' / 'placeholder-project-1.jpg'

if not resized.exists():
    print('Resized file not found:', resized)
    raise SystemExit(1)

img = Image.open(resized)
img.save(orig, quality=85)
print('Overwrote', orig)
