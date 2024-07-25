from django.contrib import admin
from .models import PublicDiary, PrivateDiary

# Register your models here.
admin.site.register(PublicDiary)
admin.site.register(PrivateDiary)