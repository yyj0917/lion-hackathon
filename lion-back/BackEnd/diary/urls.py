from django.urls import path, include
from .views import *

# viewset 활용 -> url과 view간의 mapping 관계 추가 필요

# 전체 diary 조회, diary 생성에 관여
diary_list = DiaryViewSet.as_view({
    'get' : 'list',
    'post' : 'create'
})

# 개별 diary 조회, 수정, 삭제
diary_detail = DiaryViewSet.as_view(
    {
        'get' : 'retrieve',
        'put' : 'update',
        'delete' : 'destroy'
    }
)


urlpatterns =[
    path('', diary_list),
    path('<int:pk>/', diary_detail),
]