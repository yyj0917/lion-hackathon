# from rest_framework.permissions import BasePermission
# from rest_framework_simplejwt.tokens import AccessToken
# from django.contrib.auth import get_user_model

# User = get_user_model()

# class TokenAuthentication(BasePermission):
#     def has_permission(self, request, view):
#         access_token = request.COOKIES.get('access')
#         if not access_token:
#             return False
        
#         try:
#             # 토큰 디코딩 및 사용자 추출
#             token = AccessToken(access_token)
#             user_id = token['user_id']
#             user = User.objects.get(id=user_id)
#             request.user = user
#             # request.user.is_authenticated = True
#             return True
#         except Exception as e:
#             # 토큰이 유효하지 않거나, 사용자 조회에 실패한 경우
#             return False
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework import status
from rest_framework.response import Response
from django.http import JsonResponse



User = get_user_model()



class TokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get('access')
        if not access_token:
            return None
        
        try:
            # 토큰 디코딩 및 사용자 추출
            token = AccessToken(access_token)
            user_id = token['user_id']
            user = User.objects.get(id=user_id)
        # except TokenError as e:
        #     # SimpleJWT의 TokenError를 잡아 세부적인 예외 처리
        #     response = JsonResponse({'detail': f'Token error: {str(e)}'}, status=401)
        #     response.delete_cookie('access')
        #     return response
        # except User.DoesNotExist:
        #     # 사용자 조회 실패 시
        #     raise AuthenticationFailed('No such user', code=401)
        # except Exception as e:
        #     # 그 외 예외 처리
        #     raise AuthenticationFailed('Invalid token', code=401)
        # except TokenError as e:
        # # SimpleJWT의 TokenError를 잡아 세부적인 예외 처리
        #     response = JsonResponse({'detail': f'Token error: {str(e)}'}, status=401)
        #     response.delete_cookie('access')
        #     return response
        # except User.DoesNotExist:
        #     # 사용자 조회 실패 시
        #     response = JsonResponse({'detail': 'No such user'}, status=401)
        #     response.delete_cookie('access')
        #     return response
        # except Exception as e:
        #     # 그 외 예외 처리
        #     response = JsonResponse({'detail': 'Invalid token'}, status=401)
        #     response.delete_cookie('access')
        #     return response
        # except User.DoesNotExist:
        #     raise AuthenticationFailed('No such user')
        # except ExpiredSignatureError:
        #     # 토큰이 만료된 경우 쿠키에서 삭제하고 응답 반환
        #     response = JsonResponse({'detail': 'Access token expired'}, status=401)
        #     response.delete_cookie('access')
        #     return response
        # except TokenError as e:
        #     # 토큰이 만료된 경우 쿠키에서 삭제
        #     raise AuthenticationFailed('Access tokenss expired', code=401)
        # except InvalidToken:
        #     raise AuthenticationFailed('Invalid token')
        except User.DoesNotExist:
            raise AuthenticationFailed('No such user')
        except TokenError as e:
            # 토큰이 만료되거나 유효하지 않은 경우 쿠키에서 삭제하고 예외 발생
            response = JsonResponse({'detail': str(e)}, status=401)
            response.delete_cookie('access')
            request._auth_response = response
            return None
        except Exception as e:
            raise AuthenticationFailed(f'Invalid token: {str(e)}')



        return (user, None)  # 사용자와 None을 반환
        


# User = get_user_model()

# class TokenAuthentication(BaseAuthentication):
#     def authenticate(self, request):
#         access_token = request.COOKIES.get('access')
#         refresh_token = request.COOKIES.get('refresh')

#         if not access_token and not refresh_token:
#             raise AuthenticationFailed('No authentication sssscredentials provided.')

#         if access_token:
#             try:
#                 token = AccessToken(access_token)
#                 user_id = token['user_id']
#                 user = User.objects.get(id=user_id)
#                 return (user, None)
#             except TokenError:
#                 if not refresh_token:
#                     raise AuthenticationFailed('Access token expired and no refresh token provided.')
        
#         if refresh_token:
#             try:
#                 refresh = RefreshToken(refresh_token)
#                 user_id = refresh['user_id']
#                 user = User.objects.get(id=user_id)
#                 new_access_token = str(refresh.access_token)

#                 response = Response({'detail': 'Token refreshed'}, status=status.HTTP_200_OK)
#                 response.set_cookie('access', new_access_token, httponly=True, secure=True, samesite='Lax')
#                 request._jwt_refresh_response = response

#                 return (user, None)
#             except TokenError:
#                 raise AuthenticationFailed('Refresh token is invalid.')
#             except User.DoesNotExist:
#                 raise AuthenticationFailed('No such user')
        
#         raise AuthenticationFailed('Invalid authentication credentials.')
    
#     def process_response(self, request, response):
#         if hasattr(request, '_jwt_refresh_response'):
#             return request._jwt_refresh_response
#         return response