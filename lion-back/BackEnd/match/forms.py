from django import forms
from .models import *

class CategoryForm(forms.ModelForm):
    CATEGORY_CHOICES = [
        ('ptsd', 'PTSD'),('인간관계','인간관계'),('other','기타')
    ]
    categories = forms.MultipleChoiceField(choices=CATEGORY_CHOICES, widget=forms.CheckboxSelectMultiple)

    class Meta:
        model = Advisor, Client