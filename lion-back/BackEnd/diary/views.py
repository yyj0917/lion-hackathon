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
# from rest_framework.decorators import action
# from django.db.models import Count

# 유저 권한에 따른 diary 접근 제어
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied


# Public Diary의 목록, detail 보여주기, 수정하기, 삭제하기
class PublicDiaryViewSet(viewsets.ModelViewSet):

    queryset = PublicDiary.objects.all()
    serializer_class = PublicDiarySerializer

    # public diary 조회의 경우 모든 사용자에게 허용
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):

        # 현재 로그인한 사용자를 user로 설정하여 일기 저장
        diary = serializer.save(user=self.request.user)
        
        # 감성 분석 수행 및 결과 저장
        sentiment, confidence, negative_contents = sentimentAnalysis(diary.body) # negative_contents 추후 감정분석에 활용 예정
        diary.sentiment = sentiment
        diary.positive = confidence['positive']
        diary.negative = confidence['negative']
        diary.neutral = confidence['neutral']
        diary.save()

        return super().perform_create(serializer)

    def perform_update(self, serializer):

        diary = serializer.save()
        if diary.user != self.request.user:
            raise PermissionDenied("You do not have permission to edit this diary.")

        # 감성 분석 수행 및 결과 저장
        sentiment, confidence, negative_contents = sentimentAnalysis(diary.body)
        diary.sentiment = sentiment
        diary.positive = confidence['positive']
        diary.negative = confidence['negative']
        diary.neutral = confidence['neutral']
        diary.save()


    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise PermissionDenied("You do not have permission to delete this diary.")
        instance.delete()
    
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
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return PrivateDiary.objects.filter(user=self.request.user)
    

    def perform_create(self, serializer):

        # 현재 로그인한 사용자를 user로 설정하여 일기 저장
        diary = serializer.save(user=self.request.user)

        # 감성 분석 수행 및 결과 저장
        sentiment, confidence, negative_contents = sentimentAnalysis(diary.body)
        diary.sentiment = sentiment
        diary.positive = confidence['positive']
        diary.negative = confidence['negative']
        diary.neutral = confidence['neutral']
        diary.save()
    

    def perform_update(self, serializer):
    
        diary = self.get_object()

        if diary.user != self.request.user:
            raise PermissionDenied("You do not have permission to edit this diary.")
    
        # 감성 분석 수행 및 결과 저장
        updated_diary = serializer.save()
        sentiment, confidence, negative_contents = sentimentAnalysis(updated_diary.body)
        updated_diary.sentiment = sentiment
        updated_diary.positive = confidence['positive']
        updated_diary.negative = confidence['negative']
        updated_diary.neutral = confidence['neutral']
        updated_diary.save()

    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise PermissionDenied("You do not have permission to delete this diary.")
        instance.delete()

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