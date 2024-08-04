# 데이터 처리
from .models import PublicDiary, PrivateDiary, Reaction, Report
from .serializers import PublicDiarySerializer, PrivateDiarySerializer
from rest_framework import viewsets

from rest_framework.response import Response
from rest_framework import status
from .sentiment_analysis import sentimentAnalysis, collect_negative_sentences, perform_kobert_analysis

# 감정분석 결과 반환
from rest_framework.views import APIView

# 공감 기능 구현
# from rest_framework.decorators import action
# from django.db.models import Count

# 유저 권한에 따른 diary 접근 제어
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import action  # action 데코레이터 임포트

# 감정분석 관련
from django.utils import timezone
from datetime import timedelta
from django.db.models import Avg

# 유저 모델
from django.contrib.auth import get_user_model
import jwt
from django.conf import settings


User = get_user_model()

# Public Diary의 목록, detail 보여주기, 수정하기, 삭제하기
class PublicDiaryViewSet(viewsets.ModelViewSet):

    queryset = PublicDiary.objects.all()
    serializer_class = PublicDiarySerializer
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]
    # public diary 조회의 경우 모든 사용자에게 허용
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):
        
        diary = serializer.save(user=self.request.user)
        
        # 감성 분석 수행 및 결과 저장
        sentiment, confidence, highlights = sentimentAnalysis(diary.body) # negative_contents 추후 감정분석에 활용 예정
        diary.sentiment = sentiment
        diary.positive = confidence['positive']
        diary.negative = confidence['negative']
        diary.neutral = confidence['neutral']
        diary.save()

        return super().perform_create(serializer)

    def perform_update(self, serializer):
        
        diary = self.get_object() # 현재 작성되어 있는 diary 정보를 불러옴

        # diary 작성자 이외의 유저의 글 수정을 제한
        if diary.user != self.request.user:
            raise PermissionDenied("You do not have permission to edit this diary.")
        
        updated_diary = serializer.save()
        
        # 감성 분석 수행 및 결과 저장
        sentiment, confidence, highlights = sentimentAnalysis(diary.body)
        updated_diary.sentiment = sentiment
        updated_diary.positive = confidence['positive']
        updated_diary.negative = confidence['negative']
        updated_diary.neutral = confidence['neutral']
        updated_diary.save()

        return super().perform_update(serializer)


    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise PermissionDenied("You do not have permission to delete this diary.")
        instance.delete()


    @action(detail=False, methods=['get'], permissions_classes=[IsAuthenticated])
    def my_diaries(self, request):
        user = request.user
        diaries = PublicDiary.objects.filter(user=user)
        serializer = self.get_serializer(diaries, many=True)
        return Response(serializer.data)    
    
    @action(detail=True, methods=['post'], permissions_classes=[IsAuthenticated])
    def react(self, request, pk=None):
        diary = self.get_object()
        user = request.user
        reaction_type = request.data.get('reaction')

        # Use REACTION_CHOICES from the model
        if reaction_type not in dict(Reaction.REACTION_CHOICES):
            return Response({"detail": "Invalid reaction."}, status=status.HTTP_400_BAD_REQUEST)

        reaction, created = Reaction.objects.update_or_create(
            user=user,
            diary=diary,
            defaults={'reaction': reaction_type},
        )

        if not created:
            return Response({"detail": "Reaction updated."}, status=status.HTTP_200_OK)
        return Response({"detail": "Reaction created."}, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['delete'], permissions_classes=[IsAuthenticated])
    def unreact(self, request, pk=None):
        diary = self.get_object()
        user = request.user
        try:
            reaction = Reaction.objects.get(user=user, diary=diary)
            reaction.delete()
            return Response({"detail": "Reaction removed."}, status=status.HTTP_204_NO_CONTENT)
        except Reaction.DoesNotExist:
            return Response({"detail": "No reaction found to delete."}, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=True, methods=['post'], permissions_classes=[IsAuthenticated])
    def report(self, request, pk=None):
        diary = self.get_object()
        user = request.user

        # 사용자가 이미 신고했는지 확인
        if Report.objects.filter(user=user, diary=diary).exists():
            return Response({"detail": "You have already reported this diary."}, status=status.HTTP_400_BAD_REQUEST)

        # 신고 기록 생성 및 신고 횟수 증가
        Report.objects.create(user=user, diary=diary)

        reports = Report.objects.filter(diary=diary) 

        # 신고 기록 5회 이상일 경우 게시물을 삭제
        if reports.count() >= 5:
            diary.delete()
            return Response({"detail": "Diary deleted due to multiple reports."}, status=status.HTTP_200_OK)
        
        return Response({"detail": "Diary reported."}, status=status.HTTP_200_OK) 
# Private Diary의 목록, detail 보여주기, 수정하기, 삭제하기
class PrivateDiaryViewSet(viewsets.ModelViewSet):

    queryset = PrivateDiary.objects.all()
    serializer_class = PrivateDiarySerializer
    # permission_classes = [TokenAuthentication]
    # authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return PrivateDiary.objects.filter(user=self.request.user)
    

    def perform_create(self, serializer):

        # 현재 로그인한 사용자를 user로 설정하여 일기 저장
        diary = serializer.save(user=self.request.user)

        # 감성 분석 수행 및 결과 저장
        sentiment, confidence, highlights = sentimentAnalysis(diary.body)
        diary.sentiment = sentiment
        diary.positive = confidence['positive']
        diary.negative = confidence['negative']
        diary.neutral = confidence['neutral']
        diary.highlights = highlights
        diary.save()
    

    def perform_update(self, serializer):
        
        diary = self.get_object() # 현재 작성되어 있는 diary 정보를 불러옴

        # diary 작성자 이외의 유저의 글 수정을 제한
        if diary.user != self.request.user:
            raise PermissionDenied("You do not have permission to edit this diary.")
        
        updated_diary = serializer.save()
        
        # 감성 분석 수행 및 결과 저장
        sentiment, confidence, highlights = sentimentAnalysis(diary.body)
        updated_diary.sentiment = sentiment
        updated_diary.positive = confidence['positive']
        updated_diary.negative = confidence['negative']
        updated_diary.neutral = confidence['neutral']
        updated_diary.highlights = highlights
        updated_diary.save()
        
        return super().perform_update(serializer)

    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise PermissionDenied("You do not have permission to delete this diary.")
        instance.delete()

# # 감정분석 결과 반환용 view
# class DiarySentimentSummaryView(APIView):

#     def get(self, request, *args, **kwargs):

#         # PublicDiary와 PrivateDiary의 날짜별 감정 분석 결과 집계
#         public_diary_sentiment = PublicDiary.objects.all().annotate().values('date', 'sentiment', 'positive', 'negative', 'neutral')
#         private_diary_sentiment = PrivateDiary.objects.all().annotate().values('date', 'sentiment', 'positive', 'negative', 'neutral')

#         # 감정 분석 결과를 집계하여 반환
#         return Response({
#             'public_diaries' : list(public_diary_sentiment),
#             'private_diaries': list(private_diary_sentiment)
#         }, status=status.HTTP_200_OK)


# 30일간 Naver API 감정분석 결과 평균을 계산 -> 부정이 가장 높으면 추가 분석 진행한 것을 포함한 결과값 반환 / 아닐경우 기존 30일간의 분석 결과만 반환
class DiarySentimentSummaryView(APIView):
    # permission_classes = [TokenAuthentication]
    # authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        end_date = timezone.now().date()
        start_date = end_date - timedelta(days=30)
        diaries = PrivateDiary.objects.filter(user=request.user, date__range=[start_date, end_date])
        
        if not diaries.exists():
            return Response({"detail": "No diaries found for the specified period."}, status=status.HTTP_404_NOT_FOUND)
        
        average_sentiment = diaries.aggregate(
            avg_positive=Avg('positive'),
            avg_negative=Avg('negative'),
            avg_neutral=Avg('neutral')
        )

        if average_sentiment['avg_negative'] > average_sentiment['avg_positive'] and average_sentiment['avg_negative'] > average_sentiment['avg_neutral']:
            negative_sentences = collect_negative_sentences(request.user)
            detailed_sentiments = perform_kobert_analysis(negative_sentences)
            return Response({
                "average_sentiment": average_sentiment,
                "detailed_sentiments": detailed_sentiments
            }, status=status.HTTP_200_OK)

        return Response(average_sentiment, status=status.HTTP_200_OK)

