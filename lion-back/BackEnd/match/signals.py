from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .models import AdvisorCategory, ClientCategory

@receiver(post_migrate)
def create_default_categories(sender, **kwargs):
    if sender.name == 'match':
        AdvisorCategory.objects.get_or_create(name="mental")
        AdvisorCategory.objects.get_or_create(name="stress")
        AdvisorCategory.objects.get_or_create(name="physical")
        AdvisorCategory.objects.get_or_create(name="relationship")

        ClientCategory.objects.get_or_create(name="mental")
        ClientCategory.objects.get_or_create(name="stress")
        ClientCategory.objects.get_or_create(name="physical")
        ClientCategory.objects.get_or_create(name="relationship")
        ClientCategory.objects.get_or_create(name="other")