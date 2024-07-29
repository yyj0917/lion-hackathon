from django import forms
from .models import Client

class ClientForm(forms.ModelForm):
    class Meta:
        model = Client
        fields = ['category', 'other_category']

    def clean(self):
        cleaned_data = super().clean()
        category = cleaned_data.get('category')
        other_category = cleaned_data.get('other_category')

        if category == '기타' and not other_category:
            self.add_error('other_category', 'This field is required when "기타" is selected.')

        return cleaned_data