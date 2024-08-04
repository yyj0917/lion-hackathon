from rest_framework import viewsets, status
from rest_framework.decorators import action
from django.shortcuts import redirect, get_object_or_404
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.conf import settings
from django.urls import reverse

from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

import random
import jwt

from .models import *
from .serializers import *
from .filters import *

class AdvisorHistoryView(viewsets.ModelViewSet):
    queryset = Advisor.objects.all()
    serializer_class = AdvisorSerializer

    def retrieve(self, request, pk=None):
        # user = get_object_or_404(User, pk=pk)
        user = self.request.user
        if Advisor.objects.filter(user=user).exists():
            return redirect(reverse('advisor'))
        else:
            return redirect(reverse('advisor-create'))

class ClientHistoryView(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

    def retrieve(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)
        if Client.objects.filter(user=user).exists():
            return redirect(reverse('clients'))
        else:
            return redirect(reverse('client-create'))

class AdvisorListViewSet(viewsets.ModelViewSet):
    serializer_class = AdvisorSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = AdvisorFilter
    permission_classes = [IsAuthenticated]

    # 자기 자신을 제외한 Advisor 전체 목록
    def get_queryset(self):
        user = self.request.user
        current_client_ids = set(Advisor.objects.filter(user=user).values_list('id', flat=True))
        return Advisor.objects.exclude(id__in=current_client_ids).order_by('-updated_at')

    # filter로 목록 보기
    def list(self, request, *args, **kwargs):

        filterset = self.filterset_class(self.request.GET, queryset=self.get_queryset())

        if not filterset.is_valid():
            return Response({'detail': '잘못된 필터링 조건입니다.'}, status=status.HTTP_400_BAD_REQUEST)

        filtered_queryset = filterset.qs
        if not filtered_queryset.exists():
            return Response({'detail': '조건을 만족하는 Advisor가 없습니다.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(filtered_queryset, many=True)
        return Response(serializer.data)
    
    # advisor 목록에서 상담 신청
    @action(detail=True, methods=['post'])
    def consult(self, request, pk=None):
        try:
            advisor = self.get_object()
        except Advisor.DoesNotExist:
            return Response({'detail': 'Advisor not found.'}, status=status.HTTP_404_NOT_FOUND)

        if not request.user.is_authenticated:
            return Response({'detail': 'Authentication required.'}, status=status.HTTP_403_FORBIDDEN)

        client = Client.objects.filter(user=request.user).first()
        if not client:
            return Response({'detail': 'Client profile not found.'}, status=status.HTTP_404_NOT_FOUND)

        if client.matched_advisor:
            return Response({'detail': 'Client is already matched with an advisor.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if advisor.user == request.user:
            return Response({'detail': 'You cannot consult with yourself.'}, status=status.HTTP_400_BAD_REQUEST)

        advisor.matched_clients.add(client)
        advisor.save()

        client.matched_advisor = advisor
        client.save()

        redirect_url = advisor.openlink if advisor.openlink else 'http://example.com/default'

        return Response({'detail': 'Consultation request successful.', 'redirect_url': redirect_url}, status=status.HTTP_200_OK)

class AdvisorViewSet(viewsets.ModelViewSet):
    queryset = Advisor.objects.all()
    serializer_class = AdvisorSerializer
    permission_classes = [IsAuthenticated]

    # user id로 자신이 쓴 post get 요청
    def get_queryset(self):
        user = self.request.user
        return Advisor.objects.filter(user=user)
    
    # advisor page에 matched_clients 정보도 뜨도록
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset,many=True)
        return Response(serializer.data)
    
    # 수정 및 삭제
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def perform_update(self, serializer):
        advisor = self.get_object()
        if advisor.user != self.request.user:
            raise PermissionDenied("You do not have permission to edit this card.")
        serializer.save()
    
    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise PermissionDenied("You do not have permission to delete this card.")
        instance.delete()

# Advisor post 내역이 없는 경우 첫 create viewset
class AdvisorCreateViewSet(viewsets.ModelViewSet):
    queryset = Advisor.objects.all()
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        access_token = self.request.COOKIES.get('access')
        if not access_token:
            raise PermissionDenied("Authentication credentials were not provided.")
        
        try:
            payload = jwt.decode(access_token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload.get('user_id')
            user = User.objects.get(id=user_id)
            self.request.user = user
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, User.DoesNotExist):
            raise PermissionDenied("Invalid or expired token.")
        
        serializer.save(user=self.request.user)

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

    # 이미 post 해놓은 내역이 있을 경우 추가 post
    def perform_create(self, serializer):
        access_token = self.request.COOKIES.get('access')
        if not access_token:
            raise PermissionDenied("Authentication credentials were not provided.")
        
        try:
            payload = jwt.decode(access_token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload.get('user_id')
            user = User.objects.get(id=user_id)
            self.request.user = user
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, User.DoesNotExist):
            raise PermissionDenied("Invalid or expired token.")
        
        serializer.save(user=self.request.user)

    # user id로 지금까지 자신의 client 활동 볼 수 있음
    def get_queryset(self):
        user = self.request.user
        return Client.objects.filter(user=user)
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    # client post: 상담 신청 with 랜덤매칭
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = self.request.user
        client = serializer.save(user=user)

        selected_categories = set(request.data.get('categories', []))
        current_advisor_ids = set(Advisor.objects.filter(user=user).values_list('id', flat=True))

        if 'other' in selected_categories:
            selected_categories = selected_categories - {'other'}
    
            if selected_categories:
                matching_advisors = Advisor.objects.filter(
                categories__in=selected_categories
                ).exclude(id__in=current_advisor_ids).distinct()
            else:
                matching_advisors = Advisor.objects.all()
        else:
            matching_advisors = Advisor.objects.filter(
                categories__in=selected_categories
            ).exclude(id__in=current_advisor_ids).distinct()

        advisor_with_weights = []
        for advisor in matching_advisors:
            common_categories_count = len(selected_categories.intersection(set(advisor.categories.values_list('id', flat=True))))
            advisor_with_weights.append((advisor, common_categories_count))
        
        weights = [weight for _, weight in advisor_with_weights]

        if advisor_with_weights:
            matched_advisor = random.choices(advisor_with_weights, weights=weights, k=1)[0][0]
            client.matched_advisor = matched_advisor
            client.save()
        else:
            if Advisor.objects.exclude(id__in=current_advisor_ids).exists():
                matched_advisor = random.choice(Advisor.objects.exclude(id__in=current_advisor_ids))
                client.matched_advisor = matched_advisor
                client.save()
            else:
                matched_advisor = None

        headers = self.get_success_headers(serializer.data)
        response_data = serializer.data
        if matched_advisor:
            response_data['matched_advisor'] = AdvisorSerializer(matched_advisor).data

        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)
    
    # 상담 수락하기
    @action(detail=True, methods=['post'])
    def accept_match(self, request, pk=None):
        client = self.get_object()
        if client.user != request.user:
            return Response({'detail': 'You do not have permission to perform this action.'},
                            status=status.HTTP_403_FORBIDDEN)

        if client.matched_advisor is None:
            return Response({'detail': 'No advisor matched.'}, status=status.HTTP_400_BAD_REQUEST)

        client.accepted = True
        client.save()

        # matched_clients에 추가
        client.matched_advisor.matched_clients.add(client)
        client.matched_advisor.save()

        redirect_url = client.matched_advisor.openlink if client.matched_advisor.openlink else 'http://example.com/default'

        return Response({'detail': 'Match accepted.', 'redirect_url': redirect_url}, status=status.HTTP_200_OK)
    
        
    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise PermissionDenied("You do not have permission to delete this card.")
        instance.delete()


class ClientCreateViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        access_token = self.request.COOKIES.get('access')
        if not access_token:
            raise PermissionDenied("Authentication credentials were not provided.")
        
        try:
            payload = jwt.decode(access_token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload.get('user_id')
            user = User.objects.get(id=user_id)
            self.request.user = user
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, User.DoesNotExist):
            raise PermissionDenied("Invalid or expired token.")
        
        serializer.save(user=self.request.user)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = self.request.user
        client = serializer.save(user=user)

        selected_categories = set(request.data.get('categories', []))
        current_advisor_ids = set(Advisor.objects.filter(user=user).values_list('id', flat=True))

        if 'other' in selected_categories:
            selected_categories = selected_categories - {'other'}
    
            if selected_categories:
                matching_advisors = Advisor.objects.filter(
                categories__in=selected_categories
                ).exclude(id__in=current_advisor_ids).distinct()
            else:
                matching_advisors = Advisor.objects.all()
        else:
            matching_advisors = Advisor.objects.filter(
                categories__in=selected_categories
            ).exclude(id__in=current_advisor_ids).distinct()

        advisor_with_weights = []
        for advisor in matching_advisors:
            common_categories_count = len(selected_categories.intersection(set(advisor.categories.values_list('id', flat=True))))
            advisor_with_weights.append((advisor, common_categories_count))
        
        weights = [weight for _, weight in advisor_with_weights]

        if advisor_with_weights:
            matched_advisor = random.choices(advisor_with_weights, weights=weights, k=1)[0][0]
            client.matched_advisor = matched_advisor
            client.save()
        else:
            if Advisor.objects.exclude(id__in=current_advisor_ids).exists():
                matched_advisor = random.choice(Advisor.objects.exclude(id__in=current_advisor_ids))
                client.matched_advisor = matched_advisor
                client.save()
            else:
                matched_advisor = None

        headers = self.get_success_headers(serializer.data)
        response_data = serializer.data
        if matched_advisor:
            response_data['matched_advisor'] = AdvisorSerializer(matched_advisor).data

        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)
    
    # 상담 수락하기
    @action(detail=True, methods=['post'])
    def accept_match(self, request, pk=None):
        client = self.get_object()
        if client.user != request.user:
            return Response({'detail': 'You do not have permission to perform this action.'},
                            status=status.HTTP_403_FORBIDDEN)

        if client.matched_advisor is None:
            return Response({'detail': 'No advisor matched.'}, status=status.HTTP_400_BAD_REQUEST)

        client.accepted = True
        client.save()

        # matched_clients에 추가
        client.matched_advisor.matched_clients.add(client)
        client.matched_advisor.save()

        redirect_url = client.matched_advisor.openlink if client.matched_advisor.openlink else 'http://example.com/default'

        return Response({'detail': 'Match accepted.', 'redirect_url': redirect_url}, status=status.HTTP_200_OK)