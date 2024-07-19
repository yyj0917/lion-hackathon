from django.db import models

class Message(models.Model):
    writer = models.CharField(max_length=20)
    content = models.TextField()

    



