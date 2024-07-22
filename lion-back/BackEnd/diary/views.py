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
    

    # update 메서드 오버라이드
    def update(self, request, *args, **kwargs):

        partial = kwargs.pop('partial', False) # 부분 업데이트 or 전체업데이트를 결정
        instance = self.get_object() # url에 지정된 인스턴스 가져옴
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        diary = serializer.save()
        
        # 감성 분석 수행 및 결과 저장
        sentiment, confidence = sentimentAnalysis(diary.body)
        diary.sentiment = sentiment
        diary.confidence = confidence
        diary.save()
        
        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)