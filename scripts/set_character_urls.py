import os
import sys
from pathlib import Path
# ensure project root is on sys.path so 'mysite' package can be imported
PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')
import django
django.setup()
from core.models import Character
mapping = {
    'raven-strike': '/static/assets/placeholder-character-1.png',
    'shamane': '/static/assets/placeholder-profile.jpg',
    'terra-mender': '/static/assets/placeholder-project-1-800w.jpg'
}
for slug, url in mapping.items():
    try:
        c = Character.objects.get(slug=slug)
        c.image_url = url
        c.save()
        print('Updated', slug)
    except Character.DoesNotExist:
        print('Missing', slug)
