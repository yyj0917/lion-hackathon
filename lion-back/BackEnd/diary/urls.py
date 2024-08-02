from django.urls import path, include
from .views import *

# viewset 활용 -> url과 view간의 mapping 관계 추가 필요

# 전체 public diary 조회, diary 생성에 관여
public_diary_list = PublicDiaryViewSet.as_view({
    'get' : 'list',
    'post' : 'create'
})

# 개별 public diary 조회, 수정, 삭제
public_diary_detail = PublicDiaryViewSet.as_view(
    {
        'get' : 'retrieve',
        'put' : 'update',
        'delete' : 'destroy'
    }
)

# 자신이 작성한 public diary 조회
public_diary_my_list = PublicDiaryViewSet.as_view({
    'get': 'my_diaries'
})

# 전체 private diary 조회, diary 생성에 관여
private_diary_list = PrivateDiaryViewSet.as_view({
    'get' : 'list',
    'post' : 'create'
})

# 개별 Private diary 조회, 수정, 삭제
private_diary_detail = PrivateDiaryViewSet.as_view(
    {
        'get' : 'retrieve',
        'put' : 'update',
        'delete' : 'destroy'
    }
)

# Reaction 생성
public_diary_react = PublicDiaryViewSet.as_view({
    'post': 'react'
})

# Reaction 삭제
public_diary_unreact = PublicDiaryViewSet.as_view({
    'delete': 'unreact'
})


urlpatterns = [
    path('', public_diary_list),
    path('<int:pk>/', public_diary_detail),
    path('my/', public_diary_my_list),
    path('<int:pk>/react/', public_diary_react, name='publicdiary-react'),
    path('<int:pk>/unreact/', public_diary_unreact, name='publicdiary-unreact'),
    path('private/', private_diary_list),
    path('private/<int:pk>/', private_diary_detail),
    path('sentiment-summary/', DiarySentimentSummaryView.as_view(), name='diary-sentiment-summary'),
]