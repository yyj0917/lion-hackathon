from rest_framework import generics
from .models import Message
from .serializers import MessageSerializer

class MessageCreate(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

class MessageRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
