from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from accounts.models import User

class Adviser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    age = models.IntegerField()
    work_experience = models.IntegerField()
    workln = models.TextField()
    openlink = models.URLField(blank=True, null=True)
    giveTalk = models.CharField(max_length=100, blank=True)

class Client(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    age = models.IntegerField()
    work_experience = models.IntegerField()
    purpose = models.CharField(max_length=200, blank=True)
    
    matched_adviser = models.ForeignKey(Adviser, on_delete=models.CASCADE, null=True, related_name='matched_client')
