from django.contrib import admin
from .models import PublicDiary, PrivateDiary


admin.site.register(PublicDiary)
admin.site.register(PrivateDiary)