# 데이터 처리
from .models import Diary
from .serializers import DiarySerializer
from rest_framework import viewsets

from rest_framework.response import Response
from rest_framework import status
from .sentiment_analysis import sentimentAnalysis


# Blog의 목록, detail 보여주기, 수정하기, 삭제하기 모두 가능
class DiaryViewSet(viewsets.ModelViewSet):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer

    # 감정분석 결과 저장 위해서 create 새롭게 정의
    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        diary = serializer.save()
        
        # 감성 분석 수행 및 결과 저장
        sentiment, confidence = sentimentAnalysis(diary.body)

        diary.sentiment = sentiment
        diary.confidence = confidence
        diary.save()
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    

    # def update(self, request, *args, **kwargs): # 일기 수정 시에도 감정분석 결과 변동될 수 있도록 구현할 예정

    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     diary = serializer.save()
        
    #     # 감성 분석 수행 및 결과 저장
    #     sentiment, confidence = sentimentAnalysis(diary.body)

    #     diary.sentiment = sentiment
    #     diary.confidence = confidence
    #     diary.save()
        
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        