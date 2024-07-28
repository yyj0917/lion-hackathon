from django.urls import path, include, re_path
from .views import RegisterAPIView, LogInAPIView, LogOutView, VerifyTokenView


from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter 

from dj_rest_auth.registration.views import VerifyEmailView

router = DefaultRouter()

urlpatterns =[
    path('auth/register/', RegisterAPIView.as_view()),
    path('auth/login/', LogInAPIView.as_view()),
    path('auth/logout/', LogOutView.as_view()),
    path('auth/refresh/', TokenRefreshView.as_view()),
    path('auth/verify/', VerifyTokenView.as_view()),
    path("", include(router.urls))
 ]