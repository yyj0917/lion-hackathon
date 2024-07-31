from django.shortcuts import render, redirect
from rest_framework import viewsets, status
from rest_framework import generics, permissions
from rest_framework.response import Response
from django.db.models import Count
from rest_framework.permissions import IsAuthenticated

import random

from .models import *
from .serializers import *


class AdvisorCreateView(generics.CreateAPIView):
    queryset = Advisor.objects.all()
    serializer_class = AdvisorSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class AdvisorViewSet(viewsets.ModelViewSet):
    queryset = Advisor.objects.all()
    serializer_class = AdvisorSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        return Response(serializer.data)

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

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
