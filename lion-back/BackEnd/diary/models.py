from django.db import models
from django.conf import settings

class Diary(models.Model):
    title = models.CharField(max_length=100)
    # writer = models.CharField(max_length=30) # 추후 로그인된 User와 연동해서 기록 예정
    body = models.TextField()
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # sentiment = models.FloatField() # 추후 감정분석 결과값 저장할 예정
