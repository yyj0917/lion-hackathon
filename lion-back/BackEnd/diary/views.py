# 데이터 처리
from .models import PublicDiary, PrivateDiary, Comment, Like
from .serializers import PublicDiarySerializer, PrivateDiarySerializer, CommentSerializer #,LikeSerializer
from rest_framework import viewsets

from rest_framework.response import Response
from rest_framework import status
from .sentiment_analysis import sentimentAnalysis

# 감정분석 결과 반환
from rest_framework.views import APIView


# Public Diary의 목록, detail 보여주기, 수정하기, 삭제하기
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
    
# Private Diary의 목록, detail 보여주기, 수정하기, 삭제하기
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


import logging
logger = logging.getLogger(__name__)

# Public Diary에 작성되어 있는 댓글 확인
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    # 특정 diary의 댓글 반환
    # http://127.0.0.1:8000/diary/comments/?diary=1 형태의 query로 요청
    def list(self, request, *args, **kwargs):

        diary_id = request.query_params.get('diary', None)
        if diary_id is not None:
            comments = Comment.objects.filter(diary_id=diary_id)
        else:
            comments = Comment.objects.all()
        
        serializer = self.get_serializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



    # def create(self, request, *args, **kwargs):
    #     # 현재 로그인된 사용자 가져오기
    #     request.data['user'] = request.user.id
    #     return super().create(request, *args, **kwargs)


# 좋아요는 user마다 1회씩 누를 수 있게 구현해야하므로 User 로그인 완성 후 개발 예정
# class LikeViewSet(viewsets.ViewSet):

#     def create(self, request, *args, **kwargs):
#         diary_id = request.data.get('diary')
#         # user = request.user
#         if Like.objects.filter(diary_id=diary_id).exists(): # if Like.objects.filter(user=user, diary_id=diary_id).exists()
#             return Response({'detail': 'Already liked'}, status=status.HTTP_400_BAD_REQUEST)
#         like = Like(diary_id=diary_id) # like = Like(user=user, diary_id=diary_id)
#         like.save()
#         return Response({'status': 'liked'}, status=status.HTTP_201_CREATED)

#     def destroy(self, request, *args, **kwargs):
#         diary_id = request.data.get('diary')
#         user = request.user
#         like = Like.objects.filter(user=user, diary_id=diary_id)
#         if like.exists():
#             like.delete()
#             return Response({'status': 'unliked'}, status=status.HTTP_204_NO_CONTENT)
#         return Response({'detail': 'Like not found'}, status=status.HTTP_400_BAD_REQUEST)

#     @action(detail=False, methods=['get'])
#     def list(self, request):
#         user = request.user
#         likes = Like.objects.filter(user=user)
#         serializer = LikeSerializer(likes, many=True)
#         return Response(serializer.data)