from django.urls import path

from .views import *

urlpatterns = [
    path('<str:pk>/advisor/', AdvisorViewSet.as_view({'get' : 'retrieve', 'put' : 'update', 'delete' : 'destroy'}), name='advisor'),
    path('advisor/list/',AdvisorListViewSet.as_view({'get':'list'}), name='advisor-list'),
    path('advisor/create/',AdvisorCreateViewSet.as_view({'post':'create'}),name='advisor-create'),
    # advisor post history
    path('<str:pk>/advisor-history/', AdvisorHistoryView.as_view({'get':'retrieve'}), name='advisor_history'),
    
    path('<str:pk>/client/', ClientViewSet.as_view({'get' : 'list', 'post':'create', 'delete' : 'destroy'}), name='client'),
    # client first post
    path('client/create/',ClientCreateViewSet.as_view({'post':'create'}),name='client-create'),
    # client post history
    path('<str:pk>/client-history/', ClientHistoryView.as_view({'get':'retrieve'}), name='client_history'),
]
