from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.db.models import Count
from django.shortcuts import redirect
import random

from .models import Adviser, Client
from .serializers import AdviserSerializer, ClientSerializer


class AdviserViewSet(viewsets.ModelViewSet):
    queryset = Adviser.objects.all()
    serializer_class = AdviserSerializer

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        client = serializer.save()

        adviser_count = Adviser.objects.count()
        
        if adviser_count > 0:
            matched_adviser = random.choice(Adviser.objects.all())
            client.matched_adviser = matched_adviser
            client.save()

        else:
            matched_adviser = None

        headers = self.get_success_headers(serializer.data)
        response_data = serializer.data
        if matched_adviser:
            response_data['matched_adviser'] = AdviserSerializer(matched_adviser).data

        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)