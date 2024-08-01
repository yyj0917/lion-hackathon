from django.shortcuts import render, redirect
from rest_framework import viewsets, status
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied
from django_filters.rest_framework import DjangoFilterBackend
import random

from .models import *
from .serializers import *
from .filters import *

class AdvisorListViewSet(viewsets.ModelViewSet):
    queryset = Advisor.objects.all().order_by('-created_at')
    serializer_class = AdvisorSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = AdvisorFilter

    def list(self, request, *args, **kwargs):

        filterset = self.filterset_class(self.request.GET, queryset=self.get_queryset())

        if not filterset.is_valid():
            return Response({'detail': '잘못된 필터링 조건입니다.'}, status=status.HTTP_400_BAD_REQUEST)

        filtered_queryset = filterset.qs
        if not filtered_queryset.exists():
            return Response({'detail': '조건을 만족하는 Advisor가 없습니다.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(filtered_queryset, many=True)
        return Response(serializer.data)

class AdvisorViewSet(viewsets.ModelViewSet):
    queryset = Advisor.objects.all()
    serializer_class = AdvisorSerializer
    permission_classes = [permissions.IsAuthenticated]

    # def get_permissions(self):
    #     if self.action in ['list', 'retrieve']:
    #         return [AllowAny()]
    #     return [IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        return Response(serializer.data)
    
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def perform_update(self, serializer):
    
        advisor = self.get_object()

        if advisor.user != self.request.user:
            raise PermissionDenied("You do not have permission to edit this card.")
        
        updated_advisor_card = serializer.save()
    
    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise PermissionDenied("You do not have permission to delete this card.")
        instance.delete()

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = User.objects.get(username=request.user.username)
        
        client = serializer.save(user=user)

        advisor_count = Advisor.objects.count()
        
        if advisor_count > 0:
            matched_advisor = random.choice(Advisor.objects.all())
            client.matched_advisor = matched_advisor
            client.save()

        else:
            matched_advisor = None

        headers = self.get_success_headers(serializer.data)
        response_data = serializer.data
        if matched_advisor:
            response_data['matched_advisor'] = AdvisorSerializer(matched_advisor).data

        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)
    
    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise PermissionDenied("You do not have permission to delete this card.")
        instance.delete()
