from django.urls import path, include
from .views import RefreshTokenView, RegisterAPIView, LogInAPIView, LogOutView, VerifyTokenView, UserDetailView


from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter 



router = DefaultRouter()

urlpatterns =[
    path('auth/register/', RegisterAPIView.as_view()),
    path('auth/login/', LogInAPIView.as_view()),
    path('auth/logout/', LogOutView.as_view()),
    path("auth/refresh", RefreshTokenView.as_view(), name="refresh"),
    path('auth/verify/', VerifyTokenView.as_view()),
    path('auth/user/', UserDetailView.as_view()),
    path("", include(router.urls))
 ]