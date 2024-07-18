from django.urls import path
from .views import MessageCreate, MessageRetrieveUpdateDestroy

urlpatterns = [
    path('', MessageCreate.as_view(), name='message-list'),
    path('<int:pk>/', MessageRetrieveUpdateDestroy.as_view(), name='Message-detail'),
]