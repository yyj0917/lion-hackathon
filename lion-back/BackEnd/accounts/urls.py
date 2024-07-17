from django.urls import path, include
from .views import RegisterAPIVIew, AuthAPIView
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter 

router = DefaultRouter()

urlpatterns =[
    path('register/', RegisterAPIVIew.as_view()),
    path('auth/', AuthAPIView.as_view()),
    path('auth/refresh/', TokenRefreshView.as_view()),
    path("", include(router.urls))
 ]