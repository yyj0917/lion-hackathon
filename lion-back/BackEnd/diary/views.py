# 데이터 처리
from .models import PublicDiary, PrivateDiary#, Reaction
from .serializers import PublicDiarySerializer, PrivateDiarySerializer#, ReactionSerializer
from rest_framework import viewsets

from rest_framework.response import Response
from rest_framework import status
from .sentiment_analysis import sentimentAnalysis

# 감정분석 결과 반환
from rest_framework.views import APIView

# 공감 기능 구현
from rest_framework.decorators import action
from django.db.models import Count
from rest_framework.permissions import IsAuthenticated



# Public Diary의 목록, detail 보여주기, 수정하기, 삭제하기
class PublicDiaryViewSet(viewsets.ModelViewSet):

    queryset = PublicDiary.objects.all()
    serializer_class = PublicDiarySerializer

    # 감정분석 결과 저장 위해서 create 새롭게 정의
    def create(self, request, *args, **kwargs):

        # 시리얼라이저로 데이터 검증 및 저장
        serializer = self.get_serializer(data=self.request.data) # login된 user로 user 정보 저장??
        serializer.is_valid(raise_exception=True)
        
        diary = serializer.save() # diary 저장 / user = request.user??
        diary.save()

        # 감성 분석 수행 및 결과 저장
        sentiment, confidence = sentimentAnalysis(diary.body)

        diary.sentiment = sentiment
        diary.positive = confidence['positive']
        diary.negative = confidence['negative']
        diary.neutral = confidence['neutral']
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
        diary.positive = confidence['positive']
        diary.negative = confidence['negative']
        diary.neutral = confidence['neutral']
        diary.save()
        
        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    # # 공감 생성
    # @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    # def react(self, request, pk=None):
    #     diary = self.get_object()
    #     user = request.user
    #     reaction_type = request.data.get('reaction')

    #     REACTION_CHOICES = (
    #         ('like', 'Like'),
    #         ('congrats', 'Congrats'),
    #         ('excited', 'Excited'),
    #         ('together', 'Together'),
    #     )

    #     if reaction_type not in dict(REACTION_CHOICES):
    #         return Response({"detail": "Invalid reaction."}, status=status.HTTP_400_BAD_REQUEST)

    #     reaction, created = Reaction.objects.update_or_create(
    #         user=user,
    #         diary=diary,
    #         defaults={'reaction': reaction_type},
    #     )

    #     if not created:
    #         return Response({"detail": "Reaction updated."}, status=status.HTTP_200_OK)
    #     return Response({"detail": "Reaction created."}, status=status.HTTP_201_CREATED)
    
# Private Diary의 목록, detail 보여주기, 수정하기, 삭제하기
class PrivateDiaryViewSet(viewsets.ModelViewSet):

    queryset = PrivateDiary.objects.all()
    serializer_class = PrivateDiarySerializer

    # 감정분석 결과 저장 위해서 create 새롭게 정의
    def create(self, request, *args, **kwargs):

        # 시리얼라이저로 데이터 검증 및 저장
        serializer = self.get_serializer(data=self.request.data) # login된 user로 user 정보 저장??
        serializer.is_valid(raise_exception=True)
        
        diary = serializer.save() # diary 저장 
        diary.save()

        # 감성 분석 수행 및 결과 저장
        sentiment, confidence = sentimentAnalysis(diary.body)

        diary.sentiment = sentiment
        diary.positive = confidence['positive']
        diary.negative = confidence['negative']
        diary.neutral = confidence['neutral']
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
        diary.positive = confidence['positive']
        diary.negative = confidence['negative']
        diary.neutral = confidence['neutral']
        diary.save()
        
        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
    

# 감정분석 결과 반환용 view
class DiarySentimentSummaryView(APIView):

    def get(self, request, *args, **kwargs):

        # PublicDiary와 PrivateDiary의 날짜별 감정 분석 결과 집계
        public_diary_sentiment = PublicDiary.objects.all().annotate().values('date', 'sentiment', 'positive', 'negative', 'neutral')
        private_diary_sentiment = PrivateDiary.objects.all().annotate().values('date', 'sentiment', 'positive', 'negative', 'neutral')

        # 감정 분석 결과를 집계하여 반환
        return Response({
            'public_diaries' : list(public_diary_sentiment),
            'private_diaries': list(private_diary_sentiment)
        }, status=status.HTTP_200_OK)


# # Reaction에 관한 정보 확인을 위해 임시로 생성해둔 view
# class ReactionViewSet(viewsets.ModelViewSet):

#     queryset = Reaction.objects.all()
#     serializer_class = ReactionSerializer