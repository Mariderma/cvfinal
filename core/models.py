from django.db import models


class ContactMessage(models.Model):
	name = models.CharField(max_length=200)
	email = models.EmailField()
	subject = models.CharField(max_length=200, blank=True)
	message = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)
	# simple honeypot field (should be hidden in the form)
	hp = models.CharField(max_length=100, blank=True, default='')

	def __str__(self):
		return f"{self.name} <{self.email}> - {self.subject[:30]}"


class Character(models.Model):
	"""A simple model to store characters so they can be managed from the admin.
	We'll store only an external image URL for each character. Templates should use
	get_image_src() which returns the URL.
	"""
	slug = models.SlugField(max_length=100, unique=True)
	title = models.CharField(max_length=200)
	# Use an external image URL (preferred). We don't store uploaded files here.
	image_url = models.URLField(blank=True, help_text='External URL to the image')
	summary = models.CharField(max_length=255, blank=True)
	description = models.TextField(blank=True)
	keywords = models.CharField(max_length=255, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ['title']

	def __str__(self):
		return self.title

	def get_image_src(self):
		"""Return the image URL (if provided) or empty string."""
		return self.image_url or ''
