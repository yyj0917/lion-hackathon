from django.urls import path, include
from .views import RegisterAPIView, LogInAPIView, LogOutView, VerifyTokenView, UserDetailView


from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter 



router = DefaultRouter()

urlpatterns =[
    path('auth/register/', RegisterAPIView.as_view()), #회원가입
    path('auth/login/', LogInAPIView.as_view()), #로그인
    path('auth/logout/', LogOutView.as_view()), #로그아웃
    path("auth/refresh", TokenRefreshView.as_view()), #토큰 리프레쉬
    path('auth/verify/', VerifyTokenView.as_view()), #토큰 검증
    path('auth/user/', UserDetailView.as_view()), #유저 정보 가져오기
    path("", include(router.urls))
 ]
