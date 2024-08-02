import django_filters
from .models import *

class AdvisorFilter(django_filters.FilterSet):
    categories = django_filters.CharFilter(method='filter_categories')

    class Meta:
        model = Advisor
        fields = []

    def filter_categories(self, queryset, name, value):
        categories = value.split(',')
        return queryset.filter(categories__in=categories).distinct()