from django.urls import path, include

from .views import *


advisor_list = AdvisorListViewSet.as_view({
    'get' : 'list',
})

advisor_info = AdvisorViewSet.as_view({
    'get' : 'list', # 모르겠삼
    'post' : 'create'
})

advisor_info_detail = AdvisorViewSet.as_view({
    'get' : 'retrieve',
    'put' : 'update',
    'delete' : 'destroy'
})

client_info = ClientViewSet.as_view({
    'get' : 'list',
    'post' : 'create',
    'delete' : 'destroy'
}) # 이것도 모르겠삼

urlpatterns = [
    path('advisor-list', advisor_list),
    path('advisor/', advisor_info),
    path('advisor/<int:pk>/', advisor_info_detail),
    path('client/', client_info),
    
]
