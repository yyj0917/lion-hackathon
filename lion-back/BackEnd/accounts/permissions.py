from rest_framework.permissions import BasePermission
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model

User = get_user_model()

class TokenAuthentication(BasePermission):
    def has_permission(self, request, view):
        access_token = request.COOKIES.get('access')
        if not access_token:
            return False
        
        try:
            # 토큰 디코딩 및 사용자 추출
            token = AccessToken(access_token)
            user_id = token['user_id']
            user = User.objects.get(id=user_id)
            request.user = user
            return True
        except Exception as e:
            # 토큰이 유효하지 않거나, 사용자 조회에 실패한 경우
            return False
