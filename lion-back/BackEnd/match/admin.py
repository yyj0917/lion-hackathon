from django.contrib import admin
from .models import Advisor, Client
from django.db import models

admin.site.register(Client)
admin.site.register(Advisor)
