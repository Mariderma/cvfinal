from django import forms
from .models import ContactMessage


class ContactMessageForm(forms.ModelForm):
    # honeypot field - will be hidden in the template
    hp = forms.CharField(required=False, widget=forms.HiddenInput)

    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message', 'hp']

    def clean_hp(self):
        data = self.cleaned_data.get('hp')
        if data:
            raise forms.ValidationError('Invalid submission')
        return data
