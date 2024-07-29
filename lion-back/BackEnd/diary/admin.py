from django.contrib import admin
from .models import PublicDiary, PrivateDiary#, Reaction

# Register your models here.
admin.site.register(PublicDiary)
admin.site.register(PrivateDiary)
# admin.site.register(Reaction)