from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .models import AdvisorCategory

@receiver(post_migrate)
def create_default_categories(sender, **kwargs):
    if sender.name == 'match':
        AdvisorCategory.objects.get_or_create(name="mental")
        AdvisorCategory.objects.get_or_create(name="stress")
        AdvisorCategory.objects.get_or_create(name="physical")
        AdvisorCategory.objects.get_or_create(name="relationship")