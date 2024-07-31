from django.db import models
from accounts.models import User
from multiselectfield import MultiSelectField


class Category(models.Model):
    PTSD = models.CharField(max_length=20)
    인간관계 = models.CharField(max_length=20)
    기타 = models.CharField(max_length=20)

class Advisor(models.Model):
    CATEGORY_CHOICES = [
        ('ptsd', 'PTSD'),('인간관계','인간관계'),('other','기타')
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    age = models.IntegerField()
    work_experience = models.IntegerField()
    workIn = models.TextField()
    openlink = models.URLField(blank=True, null=True)
    giveTalk = models.CharField(max_length=100, blank=True)
    categories = models.CharField(choices=CATEGORY_CHOICES, max_length=50)

class Client(models.Model):
    CATEGORY_CHOICES = [
        ('ptsd', 'PTSD'),('인간관계','인간관계'),('other','기타')
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    age = models.IntegerField()
    work_experience = models.IntegerField()
    purpose = models.CharField(max_length=200, blank=True)
    categories = models.CharField(choices=CATEGORY_CHOICES, max_length=50)
    
    matched_advisor = models.ForeignKey(Advisor, on_delete=models.CASCADE, null=True, related_name='matched_clients')