from django.contrib import admin
from .models import PublicDiary, PrivateDiary, Reaction, Report

# Register your models here.
admin.site.register(PublicDiary)
admin.site.register(PrivateDiary)
admin.site.register(Reaction)
admin.site.register(Report)