from django.db import migrations


def create_placeholders(apps, schema_editor):
    Character = apps.get_model('core', 'Character')
    placeholders = [
        {
            'slug': 'shamane',
            'title': 'Shamane',
            'image': 'assets/placeholder-character-1.png',
            'summary': 'DPS tipo bestia para rotaciones de Ultimate y debilitación.',
            'description': 'Shamane es un personaje ágil que domina el espacio aéreo y tiene habilidades para ralentizar enemigos y crear barreras temporales.',
            'keywords': 'DPS, Burst DMG, Debuff'
        },
        {
            'slug': 'raven-strike',
            'title': 'Raven Strike',
            'image': 'assets/placeholder-character-2.png',
            'summary': 'Asesino sigiloso con ataques críticos desde las sombras.',
            'description': 'Raven Strike es un mercenario experto en ataques sorpresa y daño crítico. Ideal para misiones de infiltración.',
            'keywords': 'sigilo, daño, crítico'
        },
        {
            'slug': 'terra-mender',
            'title': 'Terra Mender',
            'image': 'assets/placeholder-character-3.png',
            'summary': 'Soporte/buffer capaz de curar y potenciar aliados.',
            'description': 'Terra Mender usa magia natural para sanar aliados y aplicar buffs de resistencia.',
            'keywords': 'soporte, curación, buff'
        }
    ]
    for p in placeholders:
        Character.objects.update_or_create(slug=p['slug'], defaults=p)


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_character'),
    ]

    operations = [
        migrations.RunPython(create_placeholders, migrations.RunPython.noop),
    ]
