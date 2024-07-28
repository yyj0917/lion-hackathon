from django.urls import path, include

from .views import AdviserViewSet, ClientViewSet

adviser_list = AdviserViewSet.as_view({
    'get' : 'list',
    'post' : 'create'
})

client_list = ClientViewSet.as_view({
    'get' : 'list',
    'post' : 'create'
})

client_detail = ClientViewSet.as_view({
    'get' : 'retrieve',
    'put' : 'update',
    'delete' : 'destroy'
})

urlpatterns = [
    path('adviser/', adviser_list),
    path('client/', client_list),
]