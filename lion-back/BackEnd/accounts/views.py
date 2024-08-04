from rest_framework.views import APIView
from .serializers import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework import status, viewsets
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from BackEnd.settings import SECRET_KEY, REFRESH_TOKEN_SECRET
from rest_framework.permissions import IsAuthenticated
from .models import User
import jwt
from rest_framework.permissions import AllowAny
from BackEnd import settings 
from datetime import datetime, timezone
from django.contrib.auth import get_user_model
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken

from rest_framework_simplejwt.serializers import TokenRefreshSerializer
utc_now = datetime.now(timezone.utc)

# 리프레시토큰을 이용한 액세스토큰 재발급 - 쿠키를 까서 해주는
# class RefreshTokenView(TokenRefreshView):
#     def get(self, request):
#         refresh_in_cookie = request.COOKIES.get("refresh")
#         if not refresh_in_cookie:
#             return Response({"detail": "Refresh token not provided"}, status=status.HTTP_400_BAD_REQUEST)
        
#         try:
#             refresh = TokenRefreshSerializer.token_class(refresh_in_cookie)
#             new_access_token = {"access": str(refresh.access_token)}
#             return Response(new_access_token, status=status.HTTP_200_OK)
#         except (TokenError, InvalidToken):
#             # Delete the expired refresh token from the cookie
#             response = Response({"detail": "Invalid refresh token"}, status=status.HTTP_401_UNAUTHORIZED)
#             response.delete_cookie("refresh")
#             return response
#로그인 API
class LogInAPIView(APIView):
    permission_classes = [AllowAny] #누구나 접근 가능?

    # 로그인
    def post(self, request):#프론트에서 유저 이메일과 password가 포함된 request를 받음
    	# 유저 인증
        email = request.data.get("email")
        password = request.data.get("password")

        if email is None or password is None:
            return Response({'detail': 'Please provide both email and password'}, status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(
            email=request.data.get("email"), password=request.data.get("password")
        )
        # 이미 회원가입 된 유저일 때
        if user is not None:
            serializer = UserSerializer(user) #데이터를 직렬화하여 데이터베이스가 받을 수 있게 함
            # jwt 토큰 접근
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            res = Response(
                {
                    "user": serializer.data,
                    "message": "login success",
                    "token": {
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                },
                status=status.HTTP_200_OK,
            ) #프론트에 보낼 response (user 시리얼라이저 데이터, 로그인 성공 메시지, 토큰)
            # jwt 토큰 => 쿠키에 저장
            res.set_cookie(key="access", value=access_token, max_age=5*60, httponly=True, secure=settings.SECURE_COOKIE,  samesite='Lax') #쿠키에 토큰 저장
            res.set_cookie(key="refresh", value=refresh_token, max_age=24*60*60, httponly=True, secure=settings.SECURE_COOKIE, samesite='Lax') #쿠키에 토큰 저장
            return res
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST) 

#회원가입 API
class RegisterAPIView(APIView):
    permission_classes = [AllowAny] #누구나 접근 가능!!

    def post(self, request): #프론트에서 유저 데이터가 포함된 request를 받음
        serializer = UserSerializer(data=request.data) #데이터를 직렬화하여 데이터베이스가 받을 수 있게 함
        if serializer.is_valid(): #직렬화한 데이터가 유효하다면
            serializer.save() #데이터베이스에 저장

            res = Response(
                {
                    "user": serializer.data,
                    "message": "register success",
                },
                status=status.HTTP_200_OK,
            ) #프론트에 보낼 응답 작성

            return res
        else: #직렬화한 데이터가 유효하지 않다면
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


#유저 정보 API
class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request): #요청이 들어오면 user의 데이터를 가져옴.
        user = request.user
        serializers = UserSerializer(user)
        return Response(serializers.data) #유저 데이터를 응답으로 보냄

#로그아웃 API
class LogOutView(APIView):

    permission_classes = [AllowAny]

    # 로그아웃
    def post(self, request):
        # 쿠키에 저장된 토큰 삭제 => 로그아웃 처리
        response = Response({
            "message": "Logout success"
            }, status=status.HTTP_202_ACCEPTED)
        # response.delete_cookie("access")
        # response.delete_cookie("refresh")
        return response
    
# jwt 토근 인증 확인용 뷰셋
# Header - Authorization : Bearer <발급받은토큰>
class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

# @method_decorator(csrf_exempt, name='dispatch')
class VerifyTokenView(APIView):
    permission_classes = [IsAuthenticated]
    User = get_user_model()
    
    def get(self, request):
        return Response(status=status.HTTP_200_OK)
#     User = get_user_model()

#     def get(self, request):
#         access_token = request.COOKIES.get('access')
#         if not access_token:
#             return Response({'detail': 'Authentication credentials were sssnot provided.'}, status=status.HTTP_401_UNAUTHORIZED)

#         try:
#             payload = jwt.decode(access_token, settings.SECRET_KEY, algorithms=['HS256'])
#             user_id = payload.get('user_id')
#             if not user_id:
#                 return Response({'detail': 'Invalid payload in access token.'}, status=status.HTTP_401_UNAUTHORIZED)
            
#             user = User.objects.get(id=user_id)
#             return Response({'detail': 'Token is valid'}, status=status.HTTP_200_OK)
#         except jwt.ExpiredSignatureError:
#             return Response({'detail': 'Access token expired'}, status=status.HTTP_401_UNAUTHORIZED)
#         except jwt.InvalidTokenError:
#             return Response({'detail': 'Invalid access token'}, status=status.HTTP_401_UNAUTHORIZED)


        # access_token = request.COOKIES.get('access')
        # refresh_token = request.COOKIES.get('refresh')
        
        # # access 토큰 검증
        # try :
        #     payload = jwt.decode(access_token, SECRET_KEY, algorithms=['HS256'])
        #     user_id = payload.get('user_id')
            
        #     user = get_object_or_404(User, pk=user_id)
        #     serializer = UserSerializer(instance=user)
        #     return Response(serializer.data, status=status.HTTP_200_OK)

        # # access token만 만료
        # except jwt.ExpiredSignatureError:
        #     #refresh token 검증
        #     try:
        #         refresh_payload = jwt.decode(refresh_token, REFRESH_TOKEN_SECRET, algorithms=['HS256'])
        #         user_id = refresh_payload.get('user_id')

        #         new_access_token = jwt.encode({'user_id': user_id,  'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, SECRET_KEY, algorithm='HS256')
        #         new_refresh_token = jwt.encode({'user_id': user_id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(days=3)}, REFRESH_TOKEN_SECRET, algorithm='HS256')

        #         user = get_object_or_404(User, pk=user_id)
        #         serializer = UserSerializer(instance=user)

        #         response = Response(serializer.data, status=status.HTTP_200_OK)
        #         response.set_cookie('access', new_access_token, httponly=True, secure=True, samesite='Lax')
        #         response.set_cookie('refresh', new_refresh_token, httponly=True, secure=True, samesite='Lax')
        #         return response
        #     #리프레시도 만료
        #     except jwt.ExpiredSignatureError:
        #         response = Response({'detail': 'Refresh token expired, please log in again'}, status=status.HTTP_401_UNAUTHORIZED)
        #         response.delete_cookie('access')
        #         response.delete_cookie('refresh')
        #         return Response({'detail': 'Refresh token expired, please log in again'}, status=status.HTTP_401_UNAUTHORIZED)
            
        #     except jwt.InvalidTokenError: #유효하지 않은 리프레시
        #         return Response({'detail': 'Invalid refresh token'}, status=status.HTTP_401_UNAUTHORIZED)
        # except jwt.InvalidTokenError: #ㅇ효하지 않은 액세스 토큰
        #     return Response({'detail': 'Invalid access token'}, status=status.HTTP_401_UNAUTHORIZED)


#class VerifyTokenView(APIView):
#    permission_classes = [IsAuthenticated]
#    # 유저 토큰 검증
#    def get(self, request):
#        access_token = request.COOKIES.get('access')
#        refresh_token = request.COOKIES.get('refresh')
#
#        # access 토큰 검증
#        try :
#            payload = jwt.decode(access_token, SECRET_KEY, algorithms=['HS256'])
#            user_id = payload.get('user_id')
#            
#            user = get_object_or_404(User, pk=user_id)
#            serializer = UserSerializer(instance=user)
#            return Response(serializer.data, status=status.HTTP_200_OK)
#
#        # access token만 만료
#        except jwt.ExpiredSignatureError:
#            #refresh token 검증
#            try:
#                refresh_payload = jwt.decode(refresh_token, REFRESH_TOKEN_SECRET, algorithms=['HS256'])
#                user_id = refresh_payload.get('user_id')
#
#                new_access_token = jwt.encode({'user_id': user_id}, SECRET_KEY, algorithm='HS256')
#                new_refresh_token = jwt.encode({'user_id': user_id}, REFRESH_TOKEN_SECRET, algorithm='HS256')
#
#                user = get_object_or_404(User, pk=user_id)
#                serializer = UserSerializer(instance=user)
#
#                response = Response(serializer.data, status=status.HTTP_200_OK)
#                response.set_cookie('access', new_access_token, httponly=True, secure=True, samesite='Lax')
#                response.set_cookie('refresh', new_refresh_token, httponly=True, secure=True, samesite='Lax')
#                return response
#            #리프레시도 만료
#            except jwt.ExpiredSignatureError:
#                response = Response({'detail': 'Refresh token expired, please log in again'}, status=status.HTTP_401_UNAUTHORIZED)
#                response.delete_cookie('access')
#                response.delete_cookie('refresh')
#                return Response({'detail': 'Refresh token expired, please log in again'}, status=status.HTTP_401_UNAUTHORIZED)
#            
#            except jwt.InvalidTokenError: #유효하지 않은 리프레시
#                return Response({'detail': 'Invalid refresh token'}, status=status.HTTP_401_UNAUTHORIZED)
#        except jwt.InvalidTokenError: #ㅇ효하지 않은 액세스 토큰
#            return Response({'detail': 'Invalid access token'}, status=status.HTTP_401_UNAUTHORIZED)
        
       