from django.contrib import admin
from .models import Adviser, Client

admin.site.register(Client)
admin.site.register(Adviser)