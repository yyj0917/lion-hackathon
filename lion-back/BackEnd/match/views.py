from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.db.models import Count
from rest_framework.permissions import IsAuthenticated

import random

from .models import Advisor, Client
from .serializers import AdvisorSerializer, ClientSerializer


class AdvisorViewSet(viewsets.ModelViewSet):
    queryset = Advisor.objects.all()
    serializer_class = AdvisorSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        return Response(serializer.data)

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):

        # user = request.data.get('user')
        # if not user:
        #     return Response({'error': 'User field is required.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        client = serializer.save()

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
