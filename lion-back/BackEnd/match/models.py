from django.db import models
from accounts.models import User
from multiselectfield import MultiSelectField

class Advisor(models.Model):
    CATEGORY_CHOICES = [
        ("PTSD", "PTSD"), ("인간 관계", "인간 관계"), 
        ("기타", "기타")
    ]
    id = models.AutoField(primary_key=True,blank=False,null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    age = models.IntegerField()
    work_experience = models.IntegerField()
    workIn = models.TextField()
    openlink = models.URLField(blank=True, null=True)
    giveTalk = models.CharField(max_length=100, blank=True)
    category = MultiSelectField(choices=CATEGORY_CHOICES)

class Client(models.Model):
    CATEGORY_CHOICES = [
        ("PTSD", "PTSD"), ("인간 관계", "인간 관계"), 
        ("기타", "기타")
    ]
    id = models.AutoField(primary_key=True,blank=False,null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    age = models.IntegerField()
    work_experience = models.IntegerField()
    purpose = models.CharField(max_length=200, blank=True)
    category = MultiSelectField(choices=CATEGORY_CHOICES)
    other_category = models.CharField(max_length=100, blank=True, null=True)
    
    matched_advisor = models.ForeignKey(Advisor, on_delete=models.CASCADE, null=True, related_name='matched_clients')