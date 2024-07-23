from django.urls import path, include, re_path
from .views import RegisterAPIView, LogInAPIView, LogOutView, ConfirmEmailView, VerifyTokenView


from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter 

from dj_rest_auth.registration.views import VerifyEmailView

router = DefaultRouter()

urlpatterns =[
    path('/register/', RegisterAPIView.as_view()),
    path('auth/login/', LogInAPIView.as_view()),
    path('auth/logout/', LogOutView.as_view()),
    path('auth/refresh/', TokenRefreshView.as_view()),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    # 유효한 이메일이 유저에게 전달
    re_path(r'^account-confirm-email/$', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    # 유저가 클릭한 이메일(=링크) 확인
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', ConfirmEmailView.as_view(), name='account_confirm_email'),
    path('auth/verify/', VerifyTokenView.as_view()),
    path("", include(router.urls))
 ]