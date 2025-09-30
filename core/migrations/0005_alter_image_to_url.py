from django.db import migrations


class Migration(migrations.Migration):
	# This is a merge migration created to resolve conflicting 0005 files.
	dependencies = [
		('core', '0004_character_image_static_alter_character_image'),
		('core', '0005_alter_character_image'),
	]

	operations = []
