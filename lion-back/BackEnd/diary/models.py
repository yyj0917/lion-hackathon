from django.db import models
from django.conf import settings

class PublicDiary(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField()
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sentiment = models.TextField(blank=True) # 감정분석 결과
    positive = models.FloatField(blank=True, default=-1) # positive confidence
    negative = models.FloatField(blank=True, default=-1) # negative confidence
    neutral = models.FloatField(blank=True, default=-1) # neutral confidence

    # user 정보 저장 
    # related_name은 user정보 기반으로 diary를 불러오기 위한 역참조 기능을 수행할 수 있도록 함  ex) user.public_diaries
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='public_diaries')

    def __str__(self):
        return self.title


class PrivateDiary(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField()
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sentiment = models.TextField(blank=True) # 감정분석 결과
    positive = models.FloatField(blank=True, default=-1) # positive confidence
    negative = models.FloatField(blank=True, default=-1) # negative confidence
    neutral = models.FloatField(blank=True, default=-1) # neutral confidence
    highlights = models.TextField(blank=True, null=True) # 문장별 감정 수치 정보

    # user 정보 저장 
    # related_name은 user정보 기반으로 diary를 불러오기 위한 역참조 기능을 수행할 수 있도록 함  ex) user.public_diaries
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='private_diaries')

    def __str__(self):
        return self.title
    

class Reaction(models.Model):

    REACTION_CHOICES = (
        ('like', 'Like'),
        ('congrats', 'Congrats'),
        ('excited', 'Excited'),
        ('together', 'Together'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    diary = models.ForeignKey(PublicDiary, on_delete=models.CASCADE, related_name='reactions')
    reaction = models.CharField(max_length=10, choices=REACTION_CHOICES)

    class Meta:
        unique_together = ('user', 'diary')  # 한 사용자가 한 일기에 하나의 공감만 누를 수 있도록 설정


class Report(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    diary = models.ForeignKey(PublicDiary, on_delete=models.CASCADE, related_name='reports')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'diary')  # 한 사용자가 한 일기에 한 번만 신고할 수 있도록 설정

    def __str__(self):
        return f'{self.user.username} - {self.diary.title}'