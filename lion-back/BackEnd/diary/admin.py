from django.contrib import admin
from .models import PublicDiary, PrivateDiary, Comment, Like

# Register your models here.
admin.site.register(PublicDiary)
admin.site.register(PrivateDiary)
admin.site.register(Comment)
admin.site.register(Like)