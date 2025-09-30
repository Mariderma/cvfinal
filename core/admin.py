from django.contrib import admin
# Register your models here.
from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
	list_display = ('name', 'email', 'subject', 'created_at')
	readonly_fields = ('created_at',)

# Register your models here.

from .models import Character


@admin.register(Character)
class CharacterAdmin(admin.ModelAdmin):
	list_display = ('title', 'slug', 'created_at')
	prepopulated_fields = {'slug': ('title',)}
	search_fields = ('title', 'summary', 'keywords')
	list_filter = ('created_at',)

	def image_preview(self, obj):
		src = ''
		if hasattr(obj, 'get_image_src'):
			src = obj.get_image_src()
		if src:
			from django.utils.html import format_html
			return format_html("<img src='{}' style='max-height:60px'/>", src)
		return ''
	image_preview.allow_tags = True
	image_preview.short_description = 'Preview'
	readonly_fields = ('image_preview',)
	fieldsets = (
		(None, {
			'fields': ('title', 'slug', 'image_url', 'image_preview', 'summary', 'description', 'keywords')
		}),
	)
	# No save_model override: we keep only the external image URL on the model
