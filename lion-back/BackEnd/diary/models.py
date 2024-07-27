from django.db import models
from django.conf import settings

class PublicDiary(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField()
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.CASCADE) # 작성자를 로그인 된 User로 기록
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sentiment = models.TextField(blank=True) # 감정분석 결과
    positive = models.FloatField(blank=True, default=-1) # positive confidence
    negative = models.FloatField(blank=True, default=-1) # negative confidence
    neutral = models.FloatField(blank=True, default=-1) # neutral confidence


class PrivateDiary(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField()
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.CASCADE) # 작성자를 로그인 된 User로 기록
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sentiment = models.TextField(blank=True) # 감정분석 결과
    positive = models.FloatField(blank=True, default=-1) # positive confidence
    negative = models.FloatField(blank=True, default=-1) # negative confidence
    neutral = models.FloatField(blank=True, default=-1) # neutral confidence


class Comment(models.Model) :
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.CASCADE) # 작성자를 로그인 된 User로 기록
    diary = models.ForeignKey(PublicDiary, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

class Like(models.Model):
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.CASCADE) # 작성자를 로그인 된 User로 기록
    diary = models.ForeignKey(PublicDiary, on_delete=models.CASCADE)  # or PrivateDiary depending on your requirement