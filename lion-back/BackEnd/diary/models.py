from django.db import models
# from ..accounts.models import User
from django.conf import settings

class Diary(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField()
    # user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE) # User 완성된 후 구현할 예정
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sentiment = models.TextField(blank=True) # 감정분석 결과
    confidence = models.FloatField(blank=True, default=-1) # 감정에 대한 신뢰도
