from django.urls import path, include

from .views import *

advisor_info = AdvisorViewSet.as_view({
    'get' : 'list',
    'post' : 'create'
})

client_info = ClientViewSet.as_view({
    'get' : 'list',
    'post' : 'create'
})


urlpatterns = [
    path('advisor/', advisor_info),
    path('client/', client_info),
]
