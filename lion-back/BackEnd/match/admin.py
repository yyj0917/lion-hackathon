from django.contrib import admin
from .models import Advisor, Client

admin.site.register(Client)
admin.site.register(Advisor)