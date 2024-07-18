from django.urls import path, include
from .views import RegisterAPIView, LogInAPIView, LogOutView

from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter 

router = DefaultRouter()

urlpatterns =[
    path('register/', RegisterAPIView.as_view()),
    path('auth/LogIn', LogInAPIView.as_view()),
    path('auth/LogOut', LogOutView.as_view()),
    path('auth/refresh/', TokenRefreshView.as_view()),
    path("", include(router.urls))
 ]