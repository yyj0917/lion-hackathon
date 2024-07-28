"""
URL configuration for BackEnd project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from accounts.views import RegisterAPIView, LogInAPIView, LogOutView  # 필요한 뷰 임포트
from rest_framework_simplejwt.views import TokenRefreshView

def show_urls(urllist, depth=0):
    for entry in urllist:
        print("  " * depth, entry)
        if hasattr(entry, 'url_patterns'):
            show_urls(entry.url_patterns, depth + 1)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('accounts.urls')),
    path('posts/', include('posts.urls')),
    path('message/', include('message.urls')),
    path('diary/', include('diary.urls')),
    path('matching/', include('match.urls')),
 ]

# show_urls(urlpatterns)

