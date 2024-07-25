# 데이터 처리
from .models import PublicDiary, PrivateDiary
from .serializers import PublicDiarySerializer, PrivateDiarySerializer
from rest_framework import viewsets

from rest_framework.response import Response
from rest_framework import status
from .sentiment_analysis import sentimentAnalysis

# 감정분석 결과 반환
from rest_framework.views import APIView
from django.db.models import Avg
from django.utils.dateparse import parse_date
from django.db.models.functions import TruncDate


# Blog의 목록, detail 보여주기, 수정하기, 삭제하기 모두 가능
class PublicDiaryViewSet(viewsets.ModelViewSet):

    queryset = PublicDiary.objects.all()
    serializer_class = PublicDiarySerializer

    # 감정분석 결과 저장 위해서 create 새롭게 정의
    def create(self, request, *args, **kwargs):

        # 현재 로그인된 사용자 가져오기
        # user = request.user

        # 시리얼라이저로 데이터 검증 및 저장
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        diary = serializer.save() # diary 저장 
        # diary.user = user # 사용자 정보 설정
        diary.save()

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
        
        # 기존 데이터와 새로운 데이터 결합
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
    

class PrivateDiaryViewSet(viewsets.ModelViewSet):

    queryset = PrivateDiary.objects.all()
    serializer_class = PrivateDiarySerializer

    # 감정분석 결과 저장 위해서 create 새롭게 정의
    def create(self, request, *args, **kwargs):

        # 현재 로그인된 사용자 가져오기
        # user = request.user

        # 시리얼라이저로 데이터 검증 및 저장
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        diary = serializer.save() # diary 저장 
        # diary.user = user # 사용자 정보 설정
        diary.save()

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
        
        # 기존 데이터와 새로운 데이터 결합
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
    

# 감정분석 결과 반환용 view
class DiarySentimentSummaryView(APIView):

    def get(self, request, *args, **kwargs):


        # PublicDiary와 PrivateDiary의 날짜별 감정 분석 결과 집계
        public_diary_sentiment = PublicDiary.objects.all().annotate().values('date', 'sentiment', 'confidence')

        private_diary_sentiment = PrivateDiary.objects.all().annotate().values('date', 'sentiment', 'confidence')

        # 감정 분석 결과를 집계하여 반환
        return Response({
            'public_diaries': list(public_diary_sentiment),
            'private_diaries': list(private_diary_sentiment)
        }, status=status.HTTP_200_OK)
