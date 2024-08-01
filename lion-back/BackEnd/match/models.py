from django.db import models
from accounts.models import User
from django.conf import settings

class AdvisorCategory(models.Model):
    all = models.CharField(max_length=20)
    ptsd = models.CharField(max_length=20)
    relationship = models.CharField(max_length=20)
    
class ClientCategory(models.Model):
    no_purpose = models.CharField(max_length=20)
    ptsd = models.CharField(max_length=20)
    relationship = models.CharField(max_length=20)
    other = models.CharField(max_length=20)

    def __str__(self):
        return self.no_purpose or self.ptsd or self.relationship or self.other

class Advisor(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    age = models.IntegerField()
    work_experience = models.IntegerField()
    workIn = models.TextField()
    openlink = models.URLField(blank=True, null=True)
    giveTalk = models.CharField(max_length=100, blank=True)
    categories = models.ManyToManyField(AdvisorCategory)

class Client(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    age = models.IntegerField()
    work_experience = models.IntegerField()
    purpose = models.CharField(max_length=200, blank=True)
    categories = models.ManyToManyField(ClientCategory)
    
    matched_advisor = models.ForeignKey(Advisor, on_delete=models.CASCADE, null=True, related_name='matched_clients')
    # 상담 수락 여부
    accepted = models.BooleanField(default=False)